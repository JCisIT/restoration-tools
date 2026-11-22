import type { Metadata } from "next";
import { ESTIMATE_READY } from "@/lib/site";
import { EstimateCompare } from "./compare";

export const metadata: Metadata = {
  title: "Estimate comparison",
  description: "Compare two repair estimates line by line and see what is missing or priced differently.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Estimate comparison</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Upload your estimate and the other estimate for the same loss. You get a line-by-line list of what is
        missing and what is priced differently. PDFs up to 2 MB each. Files are processed and not stored.
      </p>
      {ESTIMATE_READY ? (
        <EstimateCompare />
      ) : (
        <p className="mt-8 border border-olive bg-bone p-5">
          <strong>Coming soon.</strong> This tool is built and waiting to be switched on.
        </p>
      )}
    </div>
  );
}
