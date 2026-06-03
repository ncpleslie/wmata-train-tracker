import TrainService from "./train.service";
import MockTrainService from "./mock/mock-train.service";
import type ITrainService from "./interfaces/train-service.interface";

let instance: ITrainService | undefined;
let cacheKey: string | undefined;

export const getTrainService = (): ITrainService => {
  const { wmataApiKey, baseWmataUrl, useMockTrainService } = useRuntimeConfig();
  const key = `${useMockTrainService}:${baseWmataUrl}:${wmataApiKey}`;

  if (instance && cacheKey === key) {
    return instance;
  }

  cacheKey = key;
  instance = useMockTrainService
    ? new MockTrainService()
    : new TrainService(baseWmataUrl, wmataApiKey);

  return instance;
};
