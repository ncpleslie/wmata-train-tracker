import type { H3Event } from "h3";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { inferAsyncReturnType } from "@trpc/server";
import { getTrainService } from "../services/get-train-service";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (
  _event: H3Event,
  _fetchOpts: FetchCreateContextFnOptions,
) => ({
  trainService: getTrainService(),
});

export type Context = inferAsyncReturnType<typeof createContext>;
