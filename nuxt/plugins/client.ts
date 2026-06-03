import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import superjson from "superjson";
import { loggerLink } from "@trpc/client";
import type { AppRouter } from "~/server/trpc/routers";

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      loggerLink({
        // SSR results include Fetch Response in context; Nuxt dev logs cannot stringify those.
        enabled: (opts) =>
          import.meta.client &&
          (process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error)),
      }),
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});

export type client = ReturnType<typeof createTRPCNuxtClient<AppRouter>>;
