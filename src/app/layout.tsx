import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { EXPERT_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Restoration Tools", template: "%s | Restoration Tools" },
  description: "Free calculators and estimate tools for water, fire, and mold restoration contractors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 dark:border-white/15">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 text-sm">
            <Link href="/" className="font-semibold">
              Restoration Tools
            </Link>
            <Link href="/tools/drying-calculator" className="hover:underline">
              Drying calculator
            </Link>
            <Link href="/tools/estimate-compare" className="hover:underline">
              Estimate comparison
            </Link>
            {EXPERT_URL && (
              <a
                href={EXPERT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto rounded bg-foreground px-3 py-1.5 font-medium text-background"
              >
                Talk to an expert
              </a>
            )}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/15">
          <p className="mx-auto max-w-5xl px-4 py-6 text-xs opacity-70">
            These tools provide estimates and document summaries for restoration professionals. They are not
            insurance, legal, or claims-adjusting advice, and they do not interpret policy coverage. Verify all
            results before relying on them.
          </p>
        </footer>
      </body>
    </html>
  );
}
