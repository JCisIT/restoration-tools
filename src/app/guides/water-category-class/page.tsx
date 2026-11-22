import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";

export const metadata: Metadata = {
  title: "Water damage category and class explained",
  description:
    "Plain-English guide to water damage Categories 1, 2 and 3 and Classes 1 to 4: what they mean, examples, and common mistakes.",
};

const categories = [
  {
    n: "1",
    name: "Clean water",
    bg: "bg-bone text-charcoal",
    muted: "text-ink-muted",
    means: "Comes from a sanitary source and poses no substantial risk at the start.",
    examples: ["Broken supply line", "Overflowing sink or tub with no contaminants", "Melting ice or snow inside"],
  },
  {
    n: "2",
    name: "Significantly contaminated",
    bg: "bg-olive text-white",
    muted: "text-white/85",
    means: "Contains enough contamination to cause discomfort or sickness if touched or swallowed.",
    examples: ["Washing machine or dishwasher overflow", "Toilet overflow with urine but no feces", "Sump pump failure"],
  },
  {
    n: "3",
    name: "Grossly contaminated",
    bg: "bg-charcoal text-bone",
    muted: "text-on-dark-muted",
    means: "May carry pathogens, toxins or other harmful agents. Treat with full precautions.",
    examples: ["Sewage backup", "Rising floodwater from rivers or streams", "Toilet overflow with feces"],
  },
];

const classes = [
  { n: "1", load: "Least water", detail: "Wet porous materials make up less than about 5% of the floor, wall and ceiling area in the space." },
  { n: "2", load: "Significant water", detail: "Wet porous materials make up about 5% to 40% of that area. Carpet, pad and lower walls are typical." },
  { n: "3", load: "Greatest water", detail: "Wet porous materials make up more than about 40% of that area. Walls, ceilings and insulation are often wet." },
  { n: "4", load: "Bound water", detail: "Water deep in low-porosity materials such as hardwood, plaster, concrete or masonry. Not defined by area; needs special drying methods and more time." },
];

export default function Page() {
  return (
    <div className="space-y-14">
      <section>
        <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">Guide</p>
        <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Water category and class, in plain English</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Two different questions. <strong className="text-charcoal">Category</strong> is how dirty the water is,
          which drives safety and what has to come out. <strong className="text-charcoal">Class</strong> is how much
          water there is to evaporate, which drives how much drying equipment goes in.
        </p>
      </section>

      <section aria-labelledby="cat">
        <h2 id="cat" className="text-2xl">Category: how contaminated</h2>
        <div className="mt-4 grid gap-px md:grid-cols-3">
          {categories.map((c) => (
            <div key={c.n} className={`${c.bg} flex flex-col gap-3 p-6`}>
              <span className="font-display text-6xl leading-none">{c.n}</span>
              <h3 className="font-head text-xl font-semibold uppercase tracking-wide">{c.name}</h3>
              <p>{c.means}</p>
              <ul className={`mt-auto space-y-1 text-sm ${c.muted}`}>
                {c.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <p className="text-sm"><strong>Category can get worse.</strong> Clean water picks up contamination from materials, soil and time. Warm conditions and foul odor are warning signs. Re-check on every visit.</p>
          <p className="text-sm"><strong>Weather water is not automatically Category 3.</strong> A 2026 IICRC position statement says roof leaks and wind-driven rain need to be assessed, not assumed.</p>
          <p className="text-sm"><strong>Write down why.</strong> Record what you saw that set the category: source, odor, time since loss, what the water touched.</p>
        </div>
      </section>

      <section aria-labelledby="class">
        <h2 id="class" className="text-2xl">Class: how much water to evaporate</h2>
        <ol className="mt-4 divide-y divide-olive border border-olive">
          {classes.map((c) => (
            <li key={c.n} className="grid gap-2 p-5 md:grid-cols-[6rem_12rem_1fr] md:items-baseline md:gap-6">
              <span className="font-display text-5xl leading-none text-olive">{c.n}</span>
              <span className="font-head text-lg font-semibold uppercase tracking-wide">{c.load}</span>
              <span>{c.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-ink-muted">
          Set the class after demo, based on what is still wet. Percentages are approximate, from published summaries
          of the current water damage standard.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="bg-bone p-6 md:p-8">
        <h2 id="mistakes" className="text-2xl">Common mistakes</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Using the \"would you drink it\" test. Category comes from the source and what the water contacted, not how it looks.",
            "Calling every roof leak Category 3, or every supply line Category 1, without looking.",
            "Mixing up category and class. A small sewage backup is Category 3 but may be Class 1.",
            "Setting the class before demo and never revisiting it.",
          ].map((m, i) => (
            <li key={m} className="flex gap-3">
              <span className="font-head text-lg font-semibold text-olive">{String(i + 1).padStart(2, "0")}</span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-olive pt-6 text-sm">
        <h2 className="text-lg">Sources</h2>
        <ul className="mt-2 space-y-1">
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://iicrc.org/wp-content/uploads/2026/04/Weather-Related-Position-Statement_2026.pdf">IICRC: Weather-related water position statement (2026)</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/83600-the-standards-of-our-time-applying-iicrc-categories-of-water-to-a-job-situation">R&amp;R Magazine: Applying IICRC categories of water</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/91769-stop-using-the-drink-test-for-water-loss-classification">R&amp;R Magazine: Stop using the drink test</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.getencircle.com/hubfs/encircle-2023/webinars/whats-new-hydro-6-2023/hydro-webinar-handout-glossary.pdf">Encircle: drying glossary (class percentages)</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://techtips.legendbrands.com/restoration-basics-1-water-damage-categories">Legend Brands: Water damage categories</a></li>
        </ul>
        <p className="mt-3 text-xs text-ink-muted">Plain-language summary. The ANSI/IICRC S500 standard is the authority; it is not quoted here.</p>
      </section>
      <NextSteps steps={NEXT["/guides/water-category-class"]} />
    </div>
  );
}
