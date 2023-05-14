import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "~/server/trpc/routers";
import { createContext } from "~/server/trpc/context";

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
});
