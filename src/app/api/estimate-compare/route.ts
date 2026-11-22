import { Anthropic, ModelDeclinedError, ModelOutputError, extractEstimate, matchLineItems } from "@/lib/claude";
import { buildComparison } from "@/lib/estimate";
import { ESTIMATE_READY } from "@/lib/site";
import { logRun, overDailyLimit, visitorHash } from "@/lib/usage";

export const maxDuration = 300;

// Two files must fit inside the host's 4.5 MB request limit.
const MAX_BYTES = 2 * 1024 * 1024;

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

async function readPdf(value: FormDataEntryValue | null): Promise<string | null> {
  if (!(value instanceof File) || value.size === 0 || value.size > MAX_BYTES) return null;
  const bytes = Buffer.from(await value.arrayBuffer());
  // Check the file signature rather than trusting the reported type.
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return null;
  return bytes.toString("base64");
}

export async function POST(request: Request) {
  if (!ESTIMATE_READY) {
    return fail(503, "The service is not configured yet.");
  }
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Send two PDF files as form data.");
  }
  const [a, b] = await Promise.all([readPdf(form.get("a")), readPdf(form.get("b"))]);
  if (!a || !b) return fail(400, "Upload two PDF estimates, each under 2 MB.");

  const visitor = visitorHash(request);
  try {
    if (await overDailyLimit(visitor)) {
      return fail(429, "You've reached today's free limit. Try again tomorrow.");
    }

    const [ea, eb] = await Promise.all([extractEstimate(a), extractEstimate(b)]);
    const matched = await matchLineItems(ea.data, eb.data);
    const comparison = buildComparison(ea.data, eb.data, matched.data);

    await logRun("estimate-compare", visitor, [ea.usage, eb.usage, matched.usage]);

    return Response.json({
      a: { prepared_by: ea.data.prepared_by, totals: ea.data.totals, notes: ea.data.notes },
      b: { prepared_by: eb.data.prepared_by, totals: eb.data.totals, notes: eb.data.notes },
      comparison,
    });
  } catch (error) {
    if (error instanceof ModelDeclinedError || error instanceof ModelOutputError) {
      return fail(422, error.message);
    }
    if (error instanceof Anthropic.RateLimitError) {
      return fail(503, "The service is busy. Try again in a minute.");
    }
    if (error instanceof Anthropic.BadRequestError) {
      return fail(422, "One of the PDFs could not be read. Check that it isn't password protected.");
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic credentials are missing or invalid.");
      return fail(500, "The service is not configured yet.");
    }
    console.error("estimate-compare failed:", error);
    return fail(500, "Something went wrong comparing the estimates.");
  }
}
