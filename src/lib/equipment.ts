// Equipment and care guide content.
// Summarises published manufacturer, EPA, OSHA and trade guidance. Each page
// lists its sources. Wording is paraphrased; no standard is quoted.

export type Cadence = "setup" | "daily" | "between" | "monthly" | "yearly";

export const CADENCES: { key: Cadence; label: string; short: string }[] = [
  { key: "setup", label: "At setup", short: "Setup" },
  { key: "daily", label: "Daily on site", short: "Daily" },
  { key: "between", label: "Between jobs", short: "Between jobs" },
  { key: "monthly", label: "Monthly", short: "Monthly" },
  { key: "yearly", label: "Yearly", short: "Yearly" },
];

export type Group = "Air quality" | "Containment and safety" | "Drying" | "Demo" | "Measurement";

export const GROUPS: Group[] = ["Air quality", "Containment and safety", "Drying", "Demo", "Measurement"];

export interface Source {
  label: string;
  href: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Equipment {
  slug: string;
  name: string;
  group: Group;
  icon: string; // SVG path data, 24x24 viewBox, stroke icon
  summary: string;
  whatItDoes: string;
  specs: Spec[];
  care: Partial<Record<Cadence, string[]>>;
  // One line per cadence for the at-a-glance matrix on the index page.
  glance: Partial<Record<Cadence, string>>;
  mistakes: string[];
  standards: { name: string; note: string }[];
  sources: Source[];
}

export const EQUIPMENT: Equipment[] = [
  {
    slug: "air-scrubbers",
    name: "Air scrubbers and negative air machines",
    group: "Air quality",
    icon: "M4 5h16v14H4zM8 9h8M8 12h8M8 15h8",
    summary: "HEPA-filtered units that clean the air in a room or pull a containment negative.",
    whatItDoes:
      "The same machine does two jobs. Recirculating, it scrubs airborne particles out of a room. Ducted to the outside, it exhausts more air than enters the containment, which keeps it under negative pressure so dust and spores stay inside.",
    specs: [
      { label: "Filter stages", value: "Pre-filter, often a secondary filter, then HEPA. Carbon is an add-on for odor." },
      { label: "HEPA", value: "At least 99.97% efficient at 0.3 micron particles." },
      { label: "Pressure target", value: "Commonly cited for mold work: about -5 Pa (-0.02 in. water column)." },
      { label: "Check with", value: "A manometer. Smoke and bowing poly are rough checks only." },
    ],
    care: {
      setup: [
        "Confirm the HEPA is seated and the gasket is intact before the unit goes into a containment.",
        "Fit a fresh pre-filter. Write the date on its frame.",
        "Record the hour meter if the unit has one.",
      ],
      daily: [
        "Look at the pre-filter. Replace it when it is visibly loaded, not on a fixed day.",
        "Read the manometer and log the pressure.",
        "If the filter-change light comes on, change the pre-filter first. Replace the HEPA only if the light stays on.",
      ],
      between: [
        "Wrap or bag the intake and exhaust before the unit leaves the containment.",
        "Replace the pre-filter after mold or Category 3 work.",
        "Wipe the cabinet with a damp cloth and HEPA-vacuum it. Let it dry before installing new filters.",
      ],
      monthly: ["Inspect the HEPA frame and gasket for damage. Check the cord and plug."],
      yearly: ["Track HEPA hours. Manufacturer ratings run in the tens of thousands of hours, but heavy loading shortens that."],
    },
    glance: {
      setup: "Seat HEPA, fresh pre-filter",
      daily: "Check pre-filter, log pressure",
      between: "Bag ports, swap pre-filter",
      monthly: "Inspect HEPA gasket",
      yearly: "Review HEPA hours",
    },
    mistakes: [
      "Vacuuming or reusing a HEPA filter. Manufacturers say not to.",
      "Running a containment without a manometer and calling it negative because the poly bows in.",
      "Moving a unit from a mold job to the next job without bagging the ports or swapping the pre-filter.",
      "Letting the pre-filter load up. A choked pre-filter cuts airflow and burns through the HEPA faster.",
    ],
    standards: [
      { name: "ANSI/IICRC S520", note: "Mold remediation standard. Covers containment and negative pressure." },
      { name: "OSHA 29 CFR 1910.134", note: "Defines HEPA efficiency for respirator filters (99.97% at 0.3 micron)." },
    ],
    sources: [
      { label: "Carrier OptiClean negative air machine manual", href: "https://www.carrier.com/commercial/en/au/media/OptiClean%20Operation%20Manual_tcm171-106162.pdf" },
      { label: "R&R Magazine: Managing pollutants with containment", href: "https://www.randrmagonline.com/articles/86769-managing-pollutants-with-containment" },
      { label: "Accuserve: When should HEPA filters be replaced and paid for?", href: "https://www.accuserve.com/blog/when-should-hepa-filters-be-replaced-paid-for" },
      { label: "OSHA 29 CFR 1910.134", href: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134" },
    ],
  },
  {
    slug: "filters",
    name: "Filters: pre, secondary, HEPA and carbon",
    group: "Air quality",
    icon: "M4 4h16M6 8h12M8 12h8M10 16h4M11 20h2",
    summary: "What each filter stage catches, when to change it, and which ones you can never clean.",
    whatItDoes:
      "Each stage protects the next one. The pre-filter catches the coarse dust so the HEPA only sees fine particles. Carbon adsorbs odor gases, which HEPA cannot touch. Change the cheap stage often and the expensive one lasts.",
    specs: [
      { label: "Pre-filter", value: "Coarse dust and debris. Cheapest stage. Change most often." },
      { label: "Secondary", value: "Mid-size particles, on units that have it. Extends HEPA life." },
      { label: "HEPA", value: "Fine particles and spores. Never washed or vacuumed." },
      { label: "Carbon", value: "Odor and some gases. Spent when odor passes through." },
    ],
    care: {
      setup: ["Start every job with a fresh pre-filter, dated on the frame.", "Fit carbon only when the job has odor, such as smoke or sewage."],
      daily: ["Replace the pre-filter when loaded.", "Replace carbon as soon as odor comes through the exhaust."],
      between: [
        "Replace pre-filters and carbon used on mold, fire or Category 3 jobs. Do not carry them to the next job.",
        "Bag spent filters inside the work area before carrying them out.",
      ],
      monthly: ["Count stock. Running out of pre-filters is how HEPAs get ruined."],
      yearly: ["Replace HEPAs that are damaged, wet, or past the manufacturer's hour rating."],
    },
    glance: {
      setup: "Fresh, dated pre-filter",
      daily: "Swap when loaded",
      between: "Bag and discard used stages",
      monthly: "Restock",
      yearly: "Retire old HEPAs",
    },
    mistakes: [
      "Washing a HEPA. Only filters the manufacturer calls washable, usually foam pre-filters, can be washed.",
      "Expecting a HEPA to remove smoke odor. That is carbon's job.",
      "Not billing for filters. Pre-filters, HEPAs and carbon used on a job are documented line items.",
      "Storing spare HEPAs where they get crushed or wet. A dented frame can leak around the seal.",
    ],
    standards: [{ name: "OSHA 29 CFR 1910.134", note: "HEPA definition: 99.97% at 0.3 micron." }],
    sources: [
      { label: "Carrier OptiClean manual (pre-filter and HEPA intervals)", href: "https://www.carrier.com/commercial/en/au/media/OptiClean%20Operation%20Manual_tcm171-106162.pdf" },
      { label: "Accuserve: When should HEPA filters be replaced and paid for?", href: "https://www.accuserve.com/blog/when-should-hepa-filters-be-replaced-paid-for" },
      { label: "Montana DPHHS: HEPA filter guide", href: "https://dphhs.mt.gov/assets/publichealth/Asthma/wildfirehepafiltersguide.pdf" },
    ],
  },
  {
    slug: "containment",
    name: "Containment",
    group: "Containment and safety",
    icon: "M3 21V5l9-3 9 3v16M9 21v-7h6v7",
    summary: "Poly, poles, zipper doors and a manometer: keeping the mess in the work area.",
    whatItDoes:
      "Containment isolates the work area from the rest of the building so dust, spores and debris do not spread. Paired with an air scrubber exhausting outside, it stays under negative pressure.",
    specs: [
      { label: "Types", value: "Source, local (mini) and full-scale containment, scaled to the size of the job." },
      { label: "Sheeting", value: "6-mil polyethylene is common. Larger mold jobs often call for a double layer." },
      { label: "Entry", value: "Zipper door or flap, with a clean decon area for PPE removal on bigger jobs." },
      { label: "Verify", value: "Manometer reading logged at setup and daily." },
    ],
    care: {
      setup: [
        "Pick the containment type for the job size, and write down why.",
        "Seal seams and edges with tape that holds on the surface. Check corners and penetrations.",
        "Start the air scrubber and confirm negative pressure on the manometer before demo starts.",
      ],
      daily: [
        "Walk the containment. Re-tape anything lifted, torn or pulled loose.",
        "Log the manometer reading.",
        "Keep the zipper door closed except when passing through.",
      ],
      between: [
        "HEPA-vacuum and wipe the poly before teardown, then fold it inward and bag it.",
        "Clean spring poles and zipper doors before they go back on the truck.",
      ],
      monthly: ["Check poles for bent shafts and worn pads. Restock poly, tape and zipper doors."],
    },
    glance: {
      setup: "Seal and verify negative",
      daily: "Walk it, log pressure",
      between: "Vacuum, fold in, bag",
      monthly: "Check poles, restock",
    },
    mistakes: [
      "Starting demo before the containment is under negative pressure.",
      "Tearing down dirty poly and shaking dust into the clean side.",
      "Leaving the zipper door open for convenience.",
      "No pressure log. If a carrier or customer questions the job, the log is your proof.",
    ],
    standards: [
      { name: "ANSI/IICRC S520", note: "Describes source, local and full-scale containment for mold work." },
      { name: "EPA mold remediation guide", note: "Voluntary guidance on containment and PPE by job size." },
    ],
    sources: [
      { label: "R&R Magazine: Managing pollutants with containment", href: "https://www.randrmagonline.com/articles/86769-managing-pollutants-with-containment" },
      { label: "US Army Public Health Center: mold remediation and clearance", href: "https://ph.health.mil/PHC%20Resource%20Library/TIP_No_55-116-1020_MoldRemandClearance.pdf" },
      { label: "R&R Magazine: Containment strategies", href: "https://www.randrmagonline.com/articles/89917-containment-strategies-what-does-your-containment-say-about-your-company" },
      { label: "EPA: Mold remediation in schools and commercial buildings", href: "https://www.epa.gov/sites/default/files/2014-08/documents/moldremediation.pdf" },
    ],
  },
  {
    slug: "ppe",
    name: "PPE and respirators",
    group: "Containment and safety",
    icon: "M12 3c4 0 7 2 7 6v3c0 4-3 7-7 9-4-2-7-5-7-9V9c0-4 3-6 7-6z",
    summary: "Matching respirators, suits, gloves and eye protection to the job, and keeping the program legal.",
    whatItDoes:
      "PPE protects the crew from spores, sewage, dust and lead. EPA's mold guidance steps up from minimum to limited to full PPE as the affected area grows. Any tight-fitting respirator brings OSHA's respiratory protection rules with it.",
    specs: [
      { label: "Minimum", value: "N95 respirator, gloves and goggles." },
      { label: "Limited", value: "N95 or half-face respirator with HEPA filters, disposable coveralls, gloves, goggles." },
      { label: "Full", value: "Full-face respirator or PAPR with HEPA filters, full-body suit, head and foot covers, gloves." },
      { label: "Goggles", value: "Sealed against dust. Goggles with open vent holes do not count." },
    ],
    care: {
      setup: [
        "Choose the PPE level for the job, and write it on the job sheet.",
        "Seal-check every tight-fitting respirator each time it goes on.",
      ],
      daily: [
        "Replace disposable suits, gloves and filters that are torn, wet or loaded.",
        "Take PPE off in the decon area, not in the clean part of the house.",
      ],
      between: [
        "Clean and disinfect reusable respirators, then store them sealed and away from dust.",
        "Discard disposable PPE from mold and Category 3 work as job waste.",
      ],
      monthly: ["Inspect respirator straps, valves and facepieces. Check stock of filters and suits in every size."],
      yearly: ["Fit test every respirator wearer at least once a year, after a medical evaluation, under a written program."],
    },
    glance: {
      setup: "Pick level, seal-check",
      daily: "Replace torn or wet gear",
      between: "Clean reusable masks",
      monthly: "Inspect, restock sizes",
      yearly: "Fit test every wearer",
    },
    mistakes: [
      "Handing out respirators without a written program, medical evaluation or fit test.",
      "Beards under tight-fitting respirators. They break the seal.",
      "Vented safety glasses on mold or sewage jobs.",
      "Walking through the house in a dirty suit.",
    ],
    standards: [
      { name: "OSHA 29 CFR 1910.134", note: "Respiratory protection: written program, medical evaluation, fit testing." },
      { name: "EPA mold remediation guide", note: "Minimum, limited and full PPE tiers by job size." },
    ],
    sources: [
      { label: "OSHA 29 CFR 1910.134", href: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134" },
      { label: "EPA: Mold remediation guide, chapter 3", href: "https://www.epa.gov/node/255257" },
      { label: "3M: Summary of EPA mold remediation guidance", href: "https://multimedia.3m.com/mws/media/107992O/u-s-epa-guidelines-for-mold-remediation-technical-data.pdf" },
      { label: "NJ PEOSH model respiratory protection program", href: "https://nj.gov/health/workplacehealthandsafety/documents/peosh/emsrespro.pdf" },
    ],
  },
  {
    slug: "vacuum-saws",
    name: "Dust-collecting drywall saws",
    group: "Demo",
    icon: "M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    summary: "Vacuum saws (the Kett style) for clean flood cuts and lead-safe demo.",
    whatItDoes:
      "A small abrasive or carbide blade under a shroud, hooked to a HEPA vacuum. The dust is pulled off at the blade, so a flood cut does not fill the room. Useful anywhere dust control matters, and especially in pre-1978 homes.",
    specs: [
      { label: "Typical blade", value: "About 2-1/2 in., cutting drywall and plaster up to about 5/8 in. deep." },
      { label: "Hook up to", value: "A HEPA-filtered vacuum, not a plain shop vac." },
      { label: "Best for", value: "Flood cuts, inspection holes, grid cuts for controlled removal." },
    ],
    care: {
      setup: ["Check the blade for wear and the shroud for cracks.", "Confirm the vacuum hose seals at the saw and the vac has a HEPA filter fitted."],
      daily: ["Clear dust from the shroud and hose connection.", "Stop and check the hose if dust starts escaping at the cut."],
      between: ["HEPA-vacuum and wipe the saw and hose before they leave the work area.", "Replace worn blades. A dull blade makes more dust."],
      monthly: ["Inspect the cord, switch and brushes."],
    },
    glance: {
      setup: "Check blade, seal hose",
      daily: "Clear shroud",
      between: "Wipe down, swap dull blade",
      monthly: "Inspect cord and brushes",
    },
    mistakes: [
      "Running it on a shop vac without a HEPA filter, which just blows fine dust back into the room.",
      "Cutting deeper than the wall cavity allows and hitting wiring or plumbing.",
      "Assuming dust control covers lead work. The lead rule has its own certification and work practices.",
    ],
    standards: [
      { name: "EPA RRP rule (40 CFR 745)", note: "Paid work disturbing paint in pre-1978 homes needs a certified firm and lead-safe practices." },
    ],
    sources: [
      { label: "JLC: Tools up close, Kett dust-collecting saw", href: "https://www.jlconline.com/tools/fastening-tools/power-tools/tools-up-close-kett-dust-collecting-saw_o/" },
      { label: "Pro Tool Reviews: Kett KSV-432 for lead-safe use", href: "https://www.protoolreviews.com/kett-ksv-432-vacuum-saw/" },
      { label: "EPA: RRP rule frequent questions", href: "https://www.epa.gov/lead/frequent-questions-general-information-about-rrp-rule" },
    ],
  },
  {
    slug: "hepa-vacuums",
    name: "HEPA vacuums",
    group: "Demo",
    icon: "M6 20h12M8 20V9a4 4 0 0 1 8 0v11M12 5V3",
    summary: "The cleanup tool for mold, lead and post-demo dust, and the one most often abused.",
    whatItDoes:
      "A vacuum with a sealed HEPA filter, so fine dust and spores stay in the machine. Used for final cleaning, cleaning containment before teardown, and as the extraction source for dust-collecting tools.",
    specs: [
      { label: "Filter", value: "True HEPA in a sealed housing. A HEPA filter in a leaky body still leaks." },
      { label: "Bags", value: "Use the manufacturer's bags so the filter stays clean longer." },
    ],
    care: {
      setup: ["Check that the filter is seated and the housing latches seal.", "Fit a fresh bag."],
      daily: ["Change full bags inside the work area, wearing PPE."],
      between: ["Wipe the body and hose. Cap the hose ends before the vac leaves the job.", "Replace the pre-filter or bag after mold or lead work."],
      monthly: ["Inspect the HEPA, gasket and hose for damage."],
    },
    glance: {
      setup: "Seat filter, fresh bag",
      daily: "Bag changes inside containment",
      between: "Wipe, cap hose ends",
      monthly: "Inspect filter and gasket",
    },
    mistakes: [
      "Emptying or changing bags outside, in the driveway or truck.",
      "Using a regular shop vac for mold or lead cleanup.",
      "Carrying the hose out uncapped and dragging dust through the house.",
    ],
    standards: [
      { name: "EPA RRP rule", note: "Lead-safe cleanup relies on HEPA vacuums." },
      { name: "ANSI/IICRC S520", note: "HEPA vacuuming is part of mold remediation cleaning." },
    ],
    sources: [
      { label: "EPA: Renovation, repair and painting program", href: "https://www.epa.gov/lead/renovation-repair-and-painting-program" },
      { label: "EPA: Mold remediation guide", href: "https://www.epa.gov/sites/default/files/2014-08/documents/moldremediation.pdf" },
    ],
  },
  {
    slug: "dehumidifiers",
    name: "Dehumidifiers (LGR and desiccant)",
    group: "Drying",
    icon: "M12 3s6 6.3 6 10.5a6 6 0 0 1-12 0C6 9.3 12 3 12 3z",
    summary: "Pulling the water out of the air. Dirty coils and filters cost you drying days.",
    whatItDoes:
      "LGR units cool air over a coil to condense water out of it. Desiccant units pull moisture into a rotating wheel and do better in cold or very dry conditions. Both slow down badly when filters and coils are dirty.",
    specs: [
      { label: "LGR", value: "Refrigerant coil. Most common for structural drying." },
      { label: "Desiccant", value: "Adsorbent wheel. Better in cold spaces and for low humidity targets." },
      { label: "Filter", value: "Protects the coil or wheel. Replace when loaded." },
    ],
    care: {
      setup: ["Fit a clean filter.", "Check the pump and drain hose, and confirm the hose runs downhill to a drain."],
      daily: ["Look at the filter and replace it when loaded.", "Log inlet and outlet readings so you can see the unit is pulling water."],
      between: [
        "Replace the filter after mold or Category 3 jobs.",
        "Wipe the housing, clean and disinfect anything exposed to contaminated water, and drain the unit fully.",
      ],
      monthly: [
        "Inspect the coils. Vacuum dust off, or clean with an alkaline (non-acidic) coil cleaner if heavily soiled.",
        "Never hose out the coils. Wear a respirator and gloves while cleaning.",
      ],
    },
    glance: {
      setup: "Clean filter, check drain",
      daily: "Check filter, log readings",
      between: "Swap filter, drain, disinfect",
      monthly: "Inspect and clean coils",
    },
    mistakes: [
      "Washing or vacuuming filters that the manufacturer says to replace.",
      "Hosing out coils, which can damage fins and electrical parts.",
      "Acid coil cleaners on units that call for alkaline cleaners.",
      "Storing a unit with water in the reservoir or pump.",
    ],
    standards: [{ name: "ANSI/IICRC S500", note: "Water damage restoration standard. Covers drying and equipment use." }],
    sources: [
      { label: "Dri-Eaz LGR 6000Li maintenance schedule", href: "https://legendbrands.com/fileshare/productmanuals/lgr_6000/lgr_6000_de/maintenance-schedule.html" },
      { label: "Dri-Eaz LGR 7000 XLi maintenance schedule", href: "https://www.legendbrands.com/fileshare/productmanuals/lgr_7000/lgr_7000_de/maintenance-schedule.html" },
      { label: "Legend Brands dehumidifier maintenance checklist", href: "https://cmsnew.legendbrands.com/media/pykkt4rf/2019-01_dehumidifiermaintenancechecklist-002.pdf" },
      { label: "R&R Magazine: How to clean and maintain a dehumidifier", href: "https://www.randrmagonline.com/articles/91330-how-to-clean-and-maintain-a-dehumidifier" },
    ],
  },
  {
    slug: "air-movers",
    name: "Air movers",
    group: "Drying",
    icon: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 4v16M4 12h16",
    summary: "Moving air across wet surfaces. Cheap to own, expensive when one fails on a job.",
    whatItDoes:
      "Air movers push dry air across wet surfaces to speed evaporation. They are simple machines, so care is mostly about keeping them clean, keeping cords safe and not loading up circuits.",
    specs: [
      { label: "Types", value: "Centrifugal (carpet-style), axial and low-profile units for under cabinets." },
      { label: "Power", value: "Plan circuits. Too many units on one breaker trips it overnight." },
    ],
    care: {
      setup: ["Check the cord and plug before placing the unit.", "Plan which circuit each unit runs on."],
      daily: ["Clear anything blocking the intake. A blocked intake causes vibration and overheating."],
      between: [
        "Unplug, then wipe the housing with a damp cloth. Do not wash the unit with water.",
        "Clean and disinfect units used on Category 3 jobs before they go back in service.",
      ],
      monthly: ["Clean dust off the blades and intake grill.", "Do not oil sealed motor bearings; most are permanently lubricated."],
    },
    glance: {
      setup: "Check cord, plan circuits",
      daily: "Keep intake clear",
      between: "Wipe down, disinfect if Cat 3",
      monthly: "Clean blades and grill",
    },
    mistakes: [
      "Running units with damaged cords or missing ground pins.",
      "Washing units with a hose.",
      "Sending a sewage-job unit straight to the next job.",
    ],
    standards: [{ name: "ANSI/IICRC S500", note: "Covers airflow and equipment placement for drying." }],
    sources: [
      { label: "Dri-Eaz Sahara Pro X3 manual", href: "https://staff.washington.edu/nelsonr/manuals/SaharaProX3.pdf" },
      { label: "Ridgid AM2500 air mover manual", href: "https://www.manualslib.com/manual/947672/Ridgid-Am2500.html?page=2" },
      { label: "Xpower X-600 air mover manual", href: "https://www.manualslib.com/manual/1181404/Xpower-X-600.html?page=6" },
    ],
  },
  {
    slug: "meters",
    name: "Moisture meters and thermo-hygrometers",
    group: "Measurement",
    icon: "M9 3h6v12a3 3 0 1 1-6 0zM12 8v7",
    summary: "Your drying documentation is only as good as the meter behind it.",
    whatItDoes:
      "Pin and pinless moisture meters read material moisture. Thermo-hygrometers read temperature and relative humidity so you can track drying conditions. If a meter drifts, every reading on the job is wrong.",
    specs: [
      { label: "Pin meters", value: "Check with the manufacturer's reference or calibration device." },
      { label: "Pinless meters", value: "Check on the calibration block made for that model." },
      { label: "RH sensors", value: "A sealed saturated salt test is a common field check." },
    ],
    care: {
      setup: ["Check the meter on its reference before the first readings on a job.", "Confirm batteries and that the right material scale is selected."],
      daily: ["Use the same meter for follow-up readings on the same job where you can."],
      between: ["Clean pins and sensors. Store meters in their case, away from heat."],
      monthly: ["Run a reference check on every meter. One research lab suggests checking against a block about every six weeks."],
      yearly: ["Have reference blocks re-verified every one to two years, or follow the manufacturer's schedule."],
    },
    glance: {
      setup: "Reference check",
      daily: "Same meter, same job",
      between: "Clean, case it",
      monthly: "Check every meter",
      yearly: "Re-verify blocks",
    },
    mistakes: [
      "Never checking a meter until a reading gets challenged.",
      "Using another model's calibration block.",
      "Mixing meters on one job and logging the readings as if they were comparable.",
    ],
    standards: [
      { name: "ANSI/IICRC S500", note: "Drying documentation depends on accurate readings." },
      { name: "Manufacturer instructions", note: "Each meter has its own check procedure and tolerance." },
    ],
    sources: [
      { label: "Delmhorst: Check your moisture meter's calibration", href: "https://www.delmhorst.com/blog/moisture-meters-calibration" },
      { label: "RISE: Calibration block service", href: "https://www.ri.se/en/what-we-do/services/calibration-block" },
      { label: "Wagner Meters: Validating moisture meter calibration", href: "https://www.wagnermeters.com/moisture-meters/wood-info/validating-moisture-meter-calibration/" },
    ],
  },
];

export function getEquipment(slug: string): Equipment | undefined {
  return EQUIPMENT.find((e) => e.slug === slug);
}
