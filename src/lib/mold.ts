// Mold job planning from EPA's size tiers (Mold Remediation in Schools and
// Commercial Buildings). Voluntary guidance; professional judgment applies.

export type Tier = "small" | "medium" | "large";

export interface MoldInput {
  areaSqFt: number;
  heavyOrSpreadRisk: boolean; // heavy growth, or work likely to spread spores through the building
  hvacInvolved: boolean;
}

export interface MoldPlan {
  tier: Tier;
  tierLabel: string;
  ppe: { level: string; items: string[] };
  containment: { level: string; items: string[] };
  bumped: boolean; // moved up a tier because of heavy growth or spread risk
  notes: string[];
}

const PPE = {
  minimum: { level: "Minimum", items: ["N95 respirator", "Gloves", "Goggles sealed against dust (no open vents)"] },
  limited: {
    level: "Limited",
    items: ["N95 or half-face respirator with HEPA filters", "Disposable coveralls", "Gloves", "Sealed goggles"],
  },
  full: {
    level: "Full",
    items: [
      "Full-face respirator or PAPR with HEPA filters",
      "Disposable full-body suit with hood",
      "Foot coverings",
      "Gloves",
    ],
  },
};

const CONTAINMENT = {
  none: {
    level: "None required",
    items: ["Use judgment to keep dust and spores from spreading.", "Mist surfaces lightly before disturbing them."],
  },
  limited: {
    level: "Limited",
    items: [
      "Polyethylene sheeting, floor to ceiling, around the work area",
      "Slit entry with a covering flap",
      "Negative pressure with a HEPA-filtered fan unit",
      "Block supply and return air vents inside the containment",
    ],
  },
  full: {
    level: "Full",
    items: [
      "Two layers of fire-retardant polyethylene sheeting",
      "An airlock or decontamination chamber at the entry",
      "Negative pressure with a HEPA-filtered fan exhausted outside the building",
      "Block supply and return air vents inside the containment",
    ],
  },
};

const LABEL: Record<Tier, string> = {
  small: "Small: under 10 sq ft",
  medium: "Medium: 10 to 100 sq ft",
  large: "Large: over 100 sq ft",
};

export function sizeTier(areaSqFt: number): Tier {
  if (areaSqFt < 10) return "small";
  if (areaSqFt <= 100) return "medium";
  return "large";
}

export function planMoldJob(input: MoldInput): MoldPlan {
  const bySize = sizeTier(Math.max(0, input.areaSqFt));
  // Heavy growth or a real chance of spreading spores calls for the full level
  // regardless of size.
  const tier: Tier = input.heavyOrSpreadRisk ? "large" : bySize;
  const notes: string[] = [];
  if (tier !== "small") notes.push("Assign a remediation manager for medium and large jobs.");
  if (input.hvacInvolved) {
    notes.push("Mold in the HVAC system: shut the system down and bring in a specialist before work starts.");
  }
  notes.push("Fix the moisture source first, or the mold will return.");
  return {
    tier,
    tierLabel: LABEL[bySize],
    ppe: tier === "small" ? PPE.minimum : tier === "medium" ? PPE.limited : PPE.full,
    containment: tier === "small" ? CONTAINMENT.none : tier === "medium" ? CONTAINMENT.limited : CONTAINMENT.full,
    bumped: tier !== bySize,
    notes,
  };
}
