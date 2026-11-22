import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { EQUIPMENT } from "../src/lib/equipment";
import { FORMS } from "../src/lib/forms";
import { ALL_GUIDES, ALL_TOOLS, EQUIPMENT_NEXT, NEXT, TOOL } from "../src/lib/links";

// A link is valid if a page file exists for it, or it names a real guide or form.
function resolves(href: string): boolean {
  if (existsSync(`src/app${href}/page.tsx`)) return true;
  const eq = href.match(/^\/equipment\/([^/]+)$/);
  if (eq) return EQUIPMENT.some((e) => e.slug === eq[1]);
  const form = href.match(/^\/forms\/([^/]+)$/);
  if (form) return FORMS.some((f) => f.slug === form[1]);
  return false;
}

test("every internal cross-link points at a real page", () => {
  const hrefs = [
    ...ALL_TOOLS.map((t) => t.href),
    ...ALL_GUIDES.map((g) => g.href),
    TOOL.estimate.href,
    ...Object.keys(NEXT),
    ...Object.values(NEXT).flat().map((s) => s.href),
    ...Object.values(EQUIPMENT_NEXT).flat().map((s) => s.href),
  ];
  const broken = [...new Set(hrefs)].filter((h) => !resolves(h));
  assert.deepEqual(broken, []);
});

test("every equipment guide has related tools, and no entry names a missing guide", () => {
  const slugs = EQUIPMENT.map((e) => e.slug);
  assert.deepEqual(Object.keys(EQUIPMENT_NEXT).filter((s) => !slugs.includes(s)), []);
  assert.deepEqual(slugs.filter((s) => !EQUIPMENT_NEXT[s]?.length), []);
});
