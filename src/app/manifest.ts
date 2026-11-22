import type { MetadataRoute } from "next";

// Lets techs add the site to a phone home screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Restoration Tools",
    short_name: "Resto Tools",
    description: "Free calculators, equipment guides and job forms for the restoration industry.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0E0E",
    theme_color: "#0E0E0E",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
