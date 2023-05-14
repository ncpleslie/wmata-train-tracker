import { router } from "../trpc";
import { trainRouter } from "./train.router";

export const appRouter = router({
  train: trainRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
