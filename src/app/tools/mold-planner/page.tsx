import type { Metadata } from "next";
import { NextSteps } from "../../next-steps";
import { NEXT } from "@/lib/links";
import { MoldPlanner } from "./planner";

export const metadata: Metadata = {
  title: "Mold job planner",
  description: "PPE and containment level for a mold remediation job, from the affected area, based on EPA guidance.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Mold job planner</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Enter the area of visible mold. Get the PPE and containment level from EPA&apos;s size tiers, plus the notes
        that change the plan.
      </p>
      <MoldPlanner />
      <p className="mt-8 max-w-2xl text-xs text-ink-muted">
        Based on EPA&apos;s voluntary guide, Mold Remediation in Schools and Commercial Buildings. The ANSI/IICRC S520
        standard does not set levels by square footage alone, and some states license mold work. Follow your state
        rules, the standard and any hygienist&apos;s protocol where they differ.{" "}
        <a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.epa.gov/sites/default/files/2014-08/documents/moldremediation.pdf">
          EPA guide (PDF)
        </a>
      </p>
      <NextSteps steps={NEXT["/tools/mold-planner"]} />
    </div>
  );
}
