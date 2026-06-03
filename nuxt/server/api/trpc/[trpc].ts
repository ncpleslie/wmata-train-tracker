import { createTRPCNuxtHandler } from "trpc-nuxt/server";
import { appRouter } from "~/server/trpc/routers";
import { createContext } from "~/server/trpc/context";

export default createTRPCNuxtHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    }
  },
});
