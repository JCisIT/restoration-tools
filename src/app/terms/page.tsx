import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of use", description: "Terms for using Restoration Tools." };

const h2 = "mt-8 text-xl";

export default function Terms() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl leading-tight">Terms of use</h1>
      <p className="mt-3 text-ink-muted">Last updated November 2026.</p>

      <h2 className={h2}>What this site is</h2>
      <p className="mt-2">
        Free calculators, guides and forms for restoration professionals. They give starting-point estimates and
        plain-language summaries of published guidance.
      </p>

      <h2 className={h2}>What it is not</h2>
      <p className="mt-2">
        It is not insurance, legal, engineering, industrial hygiene or claims-adjusting advice. It does not interpret
        insurance policies or coverage. It does not replace the current ANSI/IICRC standards, your equipment manuals,
        applicable regulations, or the judgment of a qualified professional on site.
      </p>

      <h2 className={h2}>Check the results</h2>
      <p className="mt-2">
        You are responsible for verifying any result before you rely on it, bill from it, or send it to anyone.
        Automated comparisons can miss or mismatch items.
      </p>

      <h2 className={h2}>No warranty</h2>
      <p className="mt-2">
        The site is provided as is, without warranties of any kind. To the extent the law allows, 9 Construction Inc
        is not liable for losses arising from use of the site.
      </p>

      <h2 className={h2}>Names and trademarks</h2>
      <p className="mt-2">
        Product and organization names belong to their owners. This site is not affiliated with or endorsed by IICRC,
        Verisk, or any equipment manufacturer.
      </p>
    </div>
  );
}
