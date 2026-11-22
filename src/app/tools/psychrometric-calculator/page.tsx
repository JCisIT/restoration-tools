import type { Metadata } from "next";
import { PsychroCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "GPP and dew point calculator",
  description:
    "Grains per pound (GPP) and dew point from temperature and relative humidity, with dehumidifier grain depression.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">GPP and dew point calculator</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Turn temperature and relative humidity into grains per pound and dew point. Compare the affected area with an
        unaffected area, and check whether each dehumidifier is pulling water.
      </p>
      <PsychroCalculator />
    </div>
  );
}
