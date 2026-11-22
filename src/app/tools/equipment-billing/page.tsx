import type { Metadata } from "next";
import { EquipmentBilling } from "./billing";

export const metadata: Metadata = {
  title: "Equipment days and billing helper",
  description: "Tally equipment days and consumables (filters, carbon) for a restoration job invoice.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">Equipment days and billing</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        List what was on site and when. Get equipment days and consumables ready to copy into your estimate or
        invoice. Add your own rates if you want totals. Nothing is saved or sent anywhere.
      </p>
      <EquipmentBilling />
    </div>
  );
}
