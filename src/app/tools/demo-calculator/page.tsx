import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";
import { DemoCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Flood cut and demo quantity calculator",
  description: "Drywall square feet, sheets to hang, baseboard, insulation and debris weight from a flood cut.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Flood cut and demo quantities</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Enter the affected wall length and cut height. Get drywall removed, sheets to hang back, baseboard,
        insulation and an approximate debris weight.
      </p>
      <DemoCalculator />
      <NextSteps steps={NEXT["/tools/demo-calculator"]} />
    </div>
  );
}
