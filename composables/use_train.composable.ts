import { TRPCClientError } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/trpc/routers";

type RouterOutput = inferRouterOutputs<AppRouter>;
type GetTrainsOutput = RouterOutput["train"]["getTrains"];
type GetStationOutput = RouterOutput["train"]["getStations"];

type ErrorOutput = TRPCClientError<AppRouter>;

export function useGetTrains() {
  const { $client } = useNuxtApp();
  return useAsyncData<GetTrainsOutput, ErrorOutput>(() =>
    $client.train.getTrains.query({})
  );
}

export function useGetStations() {
  const { $client } = useNuxtApp();
  return useAsyncData<GetStationOutput, ErrorOutput>(() =>
    $client.train.getStations.query()
  );
}
