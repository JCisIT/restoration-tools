import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "What Restoration Tools collects and what it does not." };

const h2 = "mt-8 text-xl";

export default function Privacy() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl leading-tight">Privacy</h1>
      <p className="mt-3 text-ink-muted">Plain version: we collect as little as possible. Last updated November 2026.</p>

      <h2 className={h2}>No accounts</h2>
      <p className="mt-2">You do not sign up or log in to use this site.</p>

      <h2 className={h2}>Calculators, forms and the drying log</h2>
      <p className="mt-2">
        These run in your browser. The numbers you type are not sent to us. The daily drying log saves your job on
        your own device, in your browser&apos;s storage, so it is still there when you come back. Clearing the log or
        your browser data removes it.
      </p>

      <h2 className={h2}>Visit statistics</h2>
      <p className="mt-2">
        We use Vercel Web Analytics to count page views, so we know which tools are useful. It does not use cookies
        and does not identify you.
      </p>

      <h2 className={h2}>Estimate comparison</h2>
      <p className="mt-2">
        When this tool is switched on, the PDFs you upload are sent to our AI provider, Anthropic, to be read and
        compared. We do not keep the files or their contents. We record that a comparison ran, with a scrambled
        (hashed) version of your IP address, to enforce a daily limit. Remove personal details from estimates before
        uploading where you can.
      </p>

      <h2 className={h2}>Outside links</h2>
      <p className="mt-2">Links to other sites are covered by those sites&apos; own policies.</p>

      <h2 className={h2}>Who runs this site</h2>
      <p className="mt-2">Restoration Tools is run by 9 Construction Inc. Questions can be sent through 9constructioninc.com.</p>
    </div>
  );
}
