import { DryingCalculator } from "./tools/drying-calculator/calculator";

// The homepage is the first tool: nobody has to click to start.
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl leading-tight md:text-4xl">How much drying equipment does this job need?</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Enter the rooms and get an initial dehumidifier and air mover count. Free, no signup.
      </p>
      <DryingCalculator />
    </div>
  );
}
