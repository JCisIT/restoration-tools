"use client";

import { useState } from "react";

// Copies a plain-text summary of a result, for pasting into a text or job note.
export function CopyResult({ lines, onDark = true }: { lines: string[]; onDark?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText([...lines, "restorationtools.org"].join("\n"));
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  }

  const style = onDark
    ? "border-bone text-bone hover:bg-bone hover:text-charcoal"
    : "border-charcoal text-charcoal hover:bg-bone";
  return (
    <button type="button" onClick={copy} className={`no-print mt-5 w-full rounded-xs border px-4 py-2.5 text-sm font-semibold ${style}`}>
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy not available in this browser" : "Copy result"}
      </span>
    </button>
  );
}
