import type { Metadata } from "next";
import { NEXT } from "@/lib/links";
import { NextSteps } from "../../next-steps";

export const metadata: Metadata = {
  title: "Fire and smoke damage guide",
  description:
    "Plain-English guide to fire and smoke restoration: safety first, the four smoke residue types, cleaning order, and ozone versus hydroxyl for odor.",
};

const residues = [
  {
    name: "Dry smoke",
    from: "Fast, hot fires: paper, wood, cotton.",
    looks: "Fine, dry, powdery. Spreads easily.",
    clean: "HEPA vacuum and dry cleaning sponge first. No water until the loose soot is off.",
  },
  {
    name: "Wet smoke",
    from: "Slow, low-heat, smoldering fires: plastics, rubber.",
    looks: "Thick, sticky, smeary. Strong odor.",
    clean: "Dry methods smear it. Needs wet cleaning with the right cleaner, and more labor.",
  },
  {
    name: "Protein residue",
    from: "Kitchen fires: burnt meat, poultry, grease.",
    looks: "Nearly invisible film. Discolors paint. Very strong odor.",
    clean: "Easy to miss. Needs cleaners made for protein residue, on every surface.",
  },
  {
    name: "Fuel oil soot",
    from: "Furnace puff-backs and petroleum fires.",
    looks: "Thick, oily, black. Foul smell.",
    clean: "Specialist cleaning. Find and fix the heating system fault first.",
  },
];

const safety = [
  "Do a job hazard analysis before anyone starts cleaning.",
  "Confirm the structure is safe to enter. Fire and firefighting water weaken floors, stairs and ceilings.",
  "Have electricity and gas checked and made safe.",
  "In older buildings, assume asbestos and lead may be present until tested. Both have their own rules and are beyond an ordinary dust respirator.",
  "Wear a fitted respirator, gloves and eye protection. Soot and ash are more toxic than they look, and extinguisher residue irritates skin and eyes.",
];

const order = [
  { step: "Remove the source", note: "Charred material and unsalvageable contents come out first. Odor control cannot fix what is still there." },
  { step: "Dry clean", note: "HEPA vacuum, then dry sponge, working top to bottom. Test a small area first." },
  { step: "Wet clean", note: "Only after loose soot is gone. Match the cleaner to the residue type and the surface." },
  { step: "Treat odor", note: "Ozone, hydroxyl or thermal fog, after cleaning. Run air scrubbers with carbon during the work." },
  { step: "Seal if needed", note: "Seal surfaces that still hold odor after cleaning, before rebuilding over them." },
];

export default function Page() {
  return (
    <div className="space-y-14">
      <section>
        <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">Guide</p>
        <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Fire and smoke, in plain English</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Smoke goes where the air goes, so the damage is rarely just where the fire was. Get three things right:
          make it safe, read the residue, and clean in the right order.
        </p>
      </section>

      <section aria-labelledby="safety" className="on-dark bg-charcoal p-6 text-bone md:p-8">
        <h2 id="safety" className="text-2xl">Before anyone cleans anything</h2>
        <ol className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {safety.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="font-head text-lg font-semibold text-on-dark-muted">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="residues">
        <h2 id="residues" className="text-2xl">The four smoke residues</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          The residue tells you how to clean. Most fires leave more than one type in different rooms.
        </p>
        <ul className="mt-4 grid gap-px border border-olive bg-olive sm:grid-cols-2">
          {residues.map((r) => (
            <li key={r.name} className="flex flex-col gap-3 bg-white p-5">
              <h3 className="font-head text-xl font-semibold uppercase tracking-wide">{r.name}</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-head text-xs font-semibold uppercase tracking-[0.2em] text-olive">Comes from</dt>
                  <dd>{r.from}</dd>
                </div>
                <div>
                  <dt className="font-head text-xs font-semibold uppercase tracking-[0.2em] text-olive">Looks like</dt>
                  <dd>{r.looks}</dd>
                </div>
                <div>
                  <dt className="font-head text-xs font-semibold uppercase tracking-[0.2em] text-olive">Cleaning</dt>
                  <dd>{r.clean}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="order">
        <h2 id="order" className="text-2xl">The order that works</h2>
        <ol className="mt-4 divide-y divide-olive border border-olive">
          {order.map((o, i) => (
            <li key={o.step} className="grid gap-2 p-5 md:grid-cols-[4rem_14rem_1fr] md:items-baseline md:gap-6">
              <span className="font-display text-5xl leading-none text-olive">{i + 1}</span>
              <span className="font-head text-lg font-semibold uppercase tracking-wide">{o.step}</span>
              <span>{o.note}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="odor">
        <h2 id="odor" className="text-2xl">Ozone or hydroxyl?</h2>
        <div className="mt-4 overflow-x-auto border border-olive">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-forest text-bone">
                <th scope="col" className="p-3 font-head text-xs font-semibold uppercase tracking-[0.2em]"><span className="sr-only">Question</span></th>
                <th scope="col" className="p-3 font-head text-xs font-semibold uppercase tracking-[0.2em]">Ozone</th>
                <th scope="col" className="p-3 font-head text-xs font-semibold uppercase tracking-[0.2em]">Hydroxyl</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Speed", "Faster. Often about a day for a strong treatment.", "Slower. Often several days."],
                ["People in the space", "Never. No people, pets or plants during treatment.", "Marketed for occupied use, but the industry is not settled. Many shops still vacate the area."],
                ["After treatment", "Air the space out and confirm ozone has cleared before anyone goes back in.", "No clearance step, but check the unit is not making ozone. If it smells like ozone, it is."],
                ["Watch for", "Ozone damages rubber, some plastics and fabrics with long exposure.", "Units with ozone-producing lamps. Ask the manufacturer."],
              ].map(([q, a, b], i) => (
                <tr key={q} className={i % 2 ? "bg-bone/50" : "bg-white"}>
                  <th scope="row" className="p-3 align-top font-semibold">{q}</th>
                  <td className="p-3 align-top">{a}</td>
                  <td className="p-3 align-top">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted">
          OSHA&apos;s workplace limit for ozone is 0.1 parts per million averaged over eight hours. EPA warns against
          ozone generators in occupied spaces. Neither method replaces removing the source and cleaning.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="bg-bone p-6 md:p-8">
        <h2 id="mistakes" className="text-2xl">Common mistakes</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Wiping dry soot with a wet rag. It smears into the paint and sets.",
            "Missing protein residue because the walls look clean.",
            "Running ozone with people, pets or plants in the building.",
            "Deodorizing before cleaning, then wondering why the smell comes back.",
            "Leaving the HVAC running. It carries soot through the whole building; ducts and filters need attention too.",
            "Disturbing old materials without testing for asbestos and lead.",
          ].map((m, i) => (
            <li key={m} className="flex gap-3">
              <span className="font-head text-lg font-semibold text-olive">{String(i + 1).padStart(2, "0")}</span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
      </section>

      <NextSteps steps={NEXT["/guides/fire-and-smoke"]} />

      <section className="border-t border-olive pt-6 text-sm">
        <h2 className="text-lg">Sources</h2>
        <ul className="mt-2 space-y-1">
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/89395-types-of-smoke-damage-and-how-to-treat-them">R&amp;R Magazine: Types of smoke damage and how to treat them</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.belfor.com/us/en/?p=6977">Belfor: What is soot?</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/88349-odor-removal-hydroxyl-or-ozone">R&amp;R Magazine: Odor removal, hydroxyl or ozone</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/88292-are-hydroxyl-generators-safe-for-odor-removal">R&amp;R Magazine: Are hydroxyl generators safe?</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.randrmagonline.com/articles/88080-toxic-exposure-stucture-fire-restoration">R&amp;R Magazine: Toxic exposure in structure fire restoration</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.epa.gov/indoor-air-quality-iaq/ozone-generators-are-sold-air-cleaners">EPA: Ozone generators sold as air cleaners</a></li>
          <li><a className="underline" target="_blank" rel="noopener noreferrer" href="https://www.osha.gov/annotated-pels/table-z-1">OSHA: Permissible exposure limits, Table Z-1</a></li>
        </ul>
        <p className="mt-3 text-xs text-ink-muted">
          Plain-language summary. The ANSI/IICRC S700 standard for fire and smoke damage restoration is the authority;
          it is not quoted here.
        </p>
      </section>
    </div>
  );
}
