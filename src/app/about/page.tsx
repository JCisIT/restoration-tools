import type { Metadata } from "next";
import Link from "next/link";
import { EXPERT_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who makes Restoration Tools, why it is free, and how the content is checked.",
};

const h2 = "mt-10 text-2xl";

export default function About() {
  return (
    <div className="max-w-2xl">
      <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">About</p>
      <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Built by people who do the work</h1>
      <p className="mt-4">
        Restoration Tools is made by 9 Construction, a Northern California general contractor that specializes in
        insurance reconstruction: the rebuild after fire, water and mold losses.
      </p>

      <h2 className={h2}>Why it&apos;s free</h2>
      <p className="mt-3">
        We work alongside restoration and mitigation shops every week. Better-documented, better-run jobs are easier
        for everyone, including us when the rebuild starts. So we built the calculators, guides and forms we wanted
        on our own jobs and opened them to the whole industry. No signup, no ads.
      </p>

      <h2 className={h2}>How we work with shops</h2>
      <p className="mt-3 border-l-4 border-olive pl-4 font-head text-xl font-semibold uppercase tracking-wide">
        Shop keeps the relationship. We own the rebuild.
      </p>
      <p className="mt-3">
        If you run mitigation and need a reconstruction partner who will not go around you, that is what we do.
      </p>

      <h2 className={h2}>How the content is made</h2>
      <ul className="mt-3 space-y-2">
        {[
          "Calculators use published formulas, and every one is tested automatically before the site updates.",
          "Guides summarise manufacturer manuals and EPA, OSHA and trade guidance, and list their sources.",
          "The IICRC standards are the authority for this work. We name them and point you to them; we do not quote them.",
          "Nothing here interprets insurance policies or coverage.",
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-olive" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <h2 className={h2}>Found something wrong?</h2>
      <p className="mt-3">
        Tell us. Field experience beats a summary every time, and we fix errors fast.{" "}
        {EXPERT_URL ? (
          <a href={EXPERT_URL} target="_blank" rel="noopener noreferrer" className="underline">Get in touch</a>
        ) : (
          <>Reach us through 9constructioninc.com.</>
        )}
      </p>

      <p className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="rounded-xs border-2 border-charcoal px-4 py-2.5 text-sm font-semibold hover:bg-bone">See the tools</Link>
        <Link href="/equipment" className="rounded-xs border-2 border-charcoal px-4 py-2.5 text-sm font-semibold hover:bg-bone">Read the guides</Link>
      </p>
    </div>
  );
}
