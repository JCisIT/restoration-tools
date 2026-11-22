"use client";

import { useRef, type ReactNode } from "react";

// Phone menu. Closes itself when a link inside it is tapped, so the page
// you navigated to is not hidden behind the open menu.
export function MobileMenu({ brand, children }: { brand: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className="on-dark bg-charcoal md:hidden"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a") && ref.current) ref.current.open = false;
      }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
        {brand}
        <span className="rounded-xs border border-on-dark-muted px-3 py-2 text-sm text-bone">Menu</span>
      </summary>
      <div className="px-4 pb-6 pt-2">{children}</div>
    </details>
  );
}
