import { inferAsyncReturnType } from "@trpc/server";
import TrainService from "../services/train.service";
import MockTrainService from "../services/mock/mock-train.service";
import ITrainService from "../services/interfaces/train-service.interface";
const { wmataApiKey, baseWmataUrl, useMockTrainService } = useRuntimeConfig();

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = () => ({
  trainService: useMockTrainService
    ? (new MockTrainService() as ITrainService)
    : (new TrainService(baseWmataUrl, wmataApiKey) as ITrainService),
});

export type Context = inferAsyncReturnType<typeof createContext>;
