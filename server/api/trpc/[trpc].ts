import { createNuxtApiHandler } from "trpc-nuxt";
import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";

export const appRouter = router({
  hello: publicProcedure
    // This is the input schema of your procedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
