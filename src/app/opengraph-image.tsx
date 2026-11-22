import { ImageResponse } from "next/og";

export const alt = "Restoration Tools: free tools for the restoration industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview shown when the site is shared in texts and social posts.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E0E0E",
          color: "#E6E1D6",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#A9A496" }}>RESTORATIONTOOLS.ORG</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.02 }}>
            Free tools for the restoration industry.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#A9A496" }}>
            Calculators, equipment guides and job forms. No signup.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", width: 96, height: 10, background: "#D88A1A" }} />
          <div style={{ display: "flex", marginLeft: 24, fontSize: 28 }}>by 9 Construction</div>
        </div>
      </div>
    ),
    size,
  );
}
