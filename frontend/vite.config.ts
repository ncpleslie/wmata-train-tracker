import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath } from "url";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unfonts({
      google: {
        families: ["VT323", "Raleway Dots", "Roboto"],
      },
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      vueTemplate: true,
      // global imports to register
      imports: [
        // presets
        "vue",
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
