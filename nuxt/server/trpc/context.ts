import type { H3Event } from "h3";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { inferAsyncReturnType } from "@trpc/server";
import TrainService from "../services/train.service";
import MockTrainService from "../services/mock/mock-train.service";
import type ITrainService from "../services/interfaces/train-service.interface";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (
  _event: H3Event,
  _fetchOpts: FetchCreateContextFnOptions,
) => {
  const { wmataApiKey, baseWmataUrl, useMockTrainService } = useRuntimeConfig();

  return {
    trainService: useMockTrainService
      ? (new MockTrainService() as ITrainService)
      : (new TrainService(baseWmataUrl, wmataApiKey) as ITrainService),
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
