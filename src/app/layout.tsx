import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Oswald } from "next/font/google";
import { EXPERT_URL } from "@/lib/site";
import { SidebarNav } from "./sidebar-nav";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  metadataBase: new URL("https://restorationtools.org"),
  title: { default: "Restoration Tools", template: "%s | Restoration Tools" },
  description: "Free calculators and estimate tools for water, fire, and mold restoration contractors.",
};

function Brand() {
  return (
    <Link href="/" className="flex flex-col text-bone">
      <span className="font-head text-xl font-semibold uppercase tracking-wide">Restoration Tools</span>
      <span className="text-[13px] text-on-dark-muted">by 9 Construction</span>
    </Link>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col md:flex-row">
        {/* Phone: brand bar with a collapsible menu. */}
        <details className="on-dark bg-charcoal md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
            <Brand />
            <span className="rounded-xs border border-on-dark-muted px-3 py-2 text-sm text-bone">Menu</span>
          </summary>
          <div className="px-4 pb-6 pt-2">
            <SidebarNav expertUrl={EXPERT_URL} />
          </div>
        </details>

        {/* Desktop: fixed-width sidebar. */}
        <aside className="on-dark hidden w-72 shrink-0 flex-col gap-7 bg-charcoal px-6 py-7 md:flex">
          <Brand />
          <SidebarNav expertUrl={EXPERT_URL} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="w-full max-w-5xl flex-1 px-4 py-8 md:px-12 md:py-12">{children}</main>
          <footer className="px-4 pb-8 md:px-12">
            <p className="max-w-5xl border-t border-olive pt-4 text-xs text-ink-muted">
              These tools provide estimates and document summaries for restoration professionals. They are not
              insurance, legal, or claims-adjusting advice, and they do not interpret policy coverage. Verify all
              results before relying on them.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
