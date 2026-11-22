import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";
import { DryingCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Drying equipment calculator",
  description: "Estimate initial dehumidifier and air mover counts for a water damage job.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Drying equipment calculator</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        A starting point for the first day of a water loss. Adjust equipment from your daily moisture and
        psychrometric readings.
      </p>
      <DryingCalculator />
      <NextSteps steps={NEXT["/tools/drying-calculator"]} />
    </div>
  );
}
