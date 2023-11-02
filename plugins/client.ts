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
    transformer: superjson,
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: "/api/trpc",
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
