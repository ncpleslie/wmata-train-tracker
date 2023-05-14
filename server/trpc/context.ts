import { inferAsyncReturnType } from "@trpc/server";
import TrainService from "../services/train.service";
import MockTrainService from "../services/mock/mock-train.service";
import { env } from "~/env/env";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = () => ({
  trainService: env.USE_MOCK_TRAIN_SERVICE
    ? new MockTrainService()
    : new TrainService(env.BASE_WMATA_URL, env.WMATA_API_KEY),
});

export type Context = inferAsyncReturnType<typeof createContext>;
