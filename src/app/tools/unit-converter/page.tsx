import type { Metadata } from "next";
import { NextSteps } from "../../next-steps";
import { NEXT } from "@/lib/links";
import { UnitConverter } from "./converter";

export const metadata: Metadata = {
  title: "Restoration unit converter",
  description: "Convert pascals and inches of water, CFM, GPP, pints per day, temperature and area.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Unit converter</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">The conversions that come up on a job. Type in any box.</p>
      <UnitConverter />
      <NextSteps steps={NEXT["/tools/unit-converter"]} />
    </div>
  );
}
