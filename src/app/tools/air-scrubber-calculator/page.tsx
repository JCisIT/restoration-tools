import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";
import { AirScrubberCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Air scrubber calculator",
  description: "How many air scrubbers or negative air machines a room or containment needs for a target air-change rate.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Air scrubber calculator</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Size air scrubbers and negative air machines for a room or containment by air changes per hour.
      </p>
      <AirScrubberCalculator />
      <NextSteps steps={NEXT["/tools/air-scrubber-calculator"]} />
    </div>
  );
}
