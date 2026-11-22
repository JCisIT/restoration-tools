import type { Metadata } from "next";
import { DryingCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Drying equipment calculator",
  description: "Estimate initial dehumidifier and air mover counts for a water damage job.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Drying equipment calculator</h1>
      <p className="mt-2 max-w-2xl text-sm opacity-80">
        A starting point for the first day of a water loss. Adjust equipment from your daily moisture and
        psychrometric readings.
      </p>
      <DryingCalculator />
    </div>
  );
}
