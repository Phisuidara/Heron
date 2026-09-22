import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Deployed as a GitHub Pages project site: https://phisuidara.github.io/Heron/
// If a custom domain is configured later via public/CNAME, update `site` and drop `base`.
export default defineConfig({
  site: "https://phisuidara.github.io",
  base: "/Heron",
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
