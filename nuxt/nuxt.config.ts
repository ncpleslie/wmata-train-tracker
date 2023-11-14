// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
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
    baseWmataUrl: "https://api.wmata.com",
    useMockTrainService: false,
    public: {
      refreshInMs: 60000,
      incidentRefreshInMs: 120000,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "WMATA Train Arrival Times",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "WMATA Train Arrival Times",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  headlessui: {
    prefix: "Headless",
  },
  tailwindcss: {
    config: {
      content: ["../frontend/src/components/**/*.{js,vue,ts}"],
    },
  },
});
