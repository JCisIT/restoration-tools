"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print shrink-0 self-start rounded-xs border border-bone px-4 py-2.5 text-sm font-semibold text-bone hover:bg-bone hover:text-charcoal"
    >
      Print checklist
    </button>
  );
}
