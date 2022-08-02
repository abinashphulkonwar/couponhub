import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), lit()],
});
