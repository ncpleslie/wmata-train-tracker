import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath } from "url";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Unfonts({
      google: {
        families: ["VT323", "Raleway Dots", "Roboto"],
      },
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      vueTemplate: true,
      imports: ["vue"],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@wails",
        replacement: fileURLToPath(new URL("./wailsjs", import.meta.url)),
      },
    ],
  },
});
