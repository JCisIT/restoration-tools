import { createHash } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Usage } from "./claude";

const DAILY_LIMIT = Number(process.env.FREE_RUNS_PER_DAY ?? 3);

// Server-only client. Returns null when Supabase isn't configured, in which
// case limits and logging are skipped (local development).
function db(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Visitors are tracked by a salted hash, never by raw IP address.
export function visitorHash(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(salt + ip).digest("hex");
}

export async function overDailyLimit(visitor: string): Promise<boolean> {
  const supabase = db();
  if (!supabase) return false;
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("tool_runs")
    .select("id", { count: "exact", head: true })
    .eq("visitor_hash", visitor)
    .gte("created_at", since);
  if (error) throw new Error(`Usage check failed: ${error.message}`);
  return (count ?? 0) >= DAILY_LIMIT;
}

// Stores run metadata only. Uploaded documents and their contents are never saved.
export async function logRun(tool: string, visitor: string, usage: Usage[]): Promise<void> {
  const supabase = db();
  if (!supabase) return;
  const { error } = await supabase.from("tool_runs").insert({
    tool,
    visitor_hash: visitor,
    model: usage[0]?.model ?? null,
    input_tokens: usage.reduce((s, u) => s + u.input_tokens, 0),
    output_tokens: usage.reduce((s, u) => s + u.output_tokens, 0),
  });
  if (error) console.error("Failed to log tool run:", error.message);
}
