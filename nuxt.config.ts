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
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: true,
          "Raleway+Dots": true,
          VT323: true,
        },
      },
    ],
  ],
  build: {
    transpile: ["trpc-nuxt"],
  },
  runtimeConfig: {
    wmataApiKey: "",
    baseWmataUrl: "",
    useMockTrainService: "false",
  },
});
