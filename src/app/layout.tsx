import type { Metadata } from "next";
import Link from "next/link";
import { Big_Shoulders_Stencil, Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ESTIMATE_READY, EXPERT_URL } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";
import { SidebarNav } from "./sidebar-nav";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: "600" });
const stencil = Big_Shoulders_Stencil({ variable: "--font-stencil", subsets: ["latin"], weight: "900" });

const DESCRIPTION =
  "Free calculators, equipment guides and job forms for everyone in water, fire and mold restoration.";

export const metadata: Metadata = {
  metadataBase: new URL("https://restorationtools.org"),
  title: { default: "Restoration Tools", template: "%s | Restoration Tools" },
  description: DESCRIPTION,
  openGraph: { siteName: "Restoration Tools", type: "website", description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
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
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${stencil.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col md:flex-row">
        {/* Phone: brand bar with a collapsible menu. */}
        <MobileMenu brand={<Brand />}>
          <SidebarNav expertUrl={EXPERT_URL} estimateReady={ESTIMATE_READY} />
        </MobileMenu>

        {/* Desktop: fixed-width sidebar. */}
        <aside className="on-dark hidden w-72 shrink-0 flex-col gap-7 bg-charcoal px-6 py-7 md:flex">
          <Brand />
          <SidebarNav expertUrl={EXPERT_URL} estimateReady={ESTIMATE_READY} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="w-full max-w-5xl flex-1 px-4 py-8 md:px-12 md:py-12">{children}</main>
          <footer className="px-4 pb-8 md:px-12">
            <div className="max-w-5xl border-t border-olive pt-4 text-xs text-ink-muted">
              <p>
                These tools provide estimates and document summaries for restoration professionals. They are not
                insurance, legal, or claims-adjusting advice, and they do not interpret policy coverage. Verify all
                results before relying on them.
              </p>
              <p className="no-print mt-2 flex gap-4">
                <Link href="/about" className="underline">About</Link>
                <Link href="/privacy" className="underline">Privacy</Link>
                <Link href="/terms" className="underline">Terms</Link>
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
