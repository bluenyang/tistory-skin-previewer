// @ts-check
import { defineConfig } from "astro/config";
import tistoryPreviewer from "@tistory-skin-previewer/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tistoryPreviewer()],
  build: {
    format: "file",
  },
});
