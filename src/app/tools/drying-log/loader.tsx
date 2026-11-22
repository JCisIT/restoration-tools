"use client";

import dynamic from "next/dynamic";

// The log reads saved data from this device, so it renders in the browser only.
const DryingLog = dynamic(() => import("./log").then((m) => m.DryingLog), {
  ssr: false,
  loading: () => <p className="mt-8 text-sm text-ink-muted">Loading your log…</p>,
});

export function DryingLogLoader() {
  return <DryingLog />;
}
