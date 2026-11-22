import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Browser tab icon: plain initials on brand charcoal with the orange accent bar.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0E0E0E", color: "#E6E1D6" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>RT</div>
        <div style={{ display: "flex", width: 36, height: 5, marginTop: 2, background: "#D88A1A" }} />
      </div>
    ),
    size,
  );
}
