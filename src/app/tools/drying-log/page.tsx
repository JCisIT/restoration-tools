import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";
import { DryingLogLoader } from "./loader";

export const metadata: Metadata = {
  title: "Daily drying log",
  description: "Track moisture readings by room and visit, see what is dry and what has stalled, and print the record.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Daily drying log</h1>
      <p className="no-print mt-2 max-w-2xl text-sm text-ink-muted">
        Add each spot you are monitoring, then a column for every visit. The log flags what is dry and what has
        stopped dropping. It saves on this device only; nothing is sent anywhere.
      </p>
      <DryingLogLoader />
      <NextSteps steps={NEXT["/tools/drying-log"]} />
    </div>
  );
}
