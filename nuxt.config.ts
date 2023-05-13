// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/eslint-module",
      {
        lintOnStart: false,
      },
    ],
  ],
  build: {
    transpile: ["trpc-nuxt"],
  },
});
