"use client";

export function PrintButton({ label = "Print checklist", className = "" }: { label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print shrink-0 self-start rounded-xs px-4 py-2.5 text-sm font-semibold ${className}`}
    >
      {label}
    </button>
  );
}
