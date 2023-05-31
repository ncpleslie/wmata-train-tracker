import { TRPCClientError } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/trpc/routers";
import { useStationStore } from "~/stores/station.store";

type RouterOutput = inferRouterOutputs<AppRouter>;
type getIncidentsOutput = RouterOutput["train"]["getIncidents"];
type GetTrainsOutput = RouterOutput["train"]["getTrains"];
type GetStationOutput = RouterOutput["train"]["getStations"];

type ErrorOutput = TRPCClientError<AppRouter>;

/**
 * Retrieves incidents using the Nuxt app client and returns the result as asynchronous data.
 *
 * @returns - The asynchronous data containing the incidents.
 */
export function useGetIncidents() {
  const { $client } = useNuxtApp();
  return useAsyncData<getIncidentsOutput, ErrorOutput>(() =>
    $client.train.getIncidents.query()
  );
}

/**
 * Retrieves trains using the Nuxt app client and returns the result as asynchronous data.
 * The station ID is retrieved from the selected station in the station store.
 * If no station is selected, a default station will be provided.
 *
 * @returns - The asynchronous data containing the trains.
 */
export function useGetTrains() {
  const stationStore = useStationStore();
  const { $client } = useNuxtApp();
  return useAsyncData<GetTrainsOutput, ErrorOutput>(() =>
    $client.train.getTrains.query({
      stationId: stationStore.selectedStation?.code,
    })
  );
}

/**
 * Retrieves stations using the Nuxt app client and returns the result as asynchronous data.
 *
 * @returns - The asynchronous data containing the stations.
 */
export function useGetStations() {
  const { $client } = useNuxtApp();
  return useAsyncData<GetStationOutput, ErrorOutput>(() =>
    $client.train.getStations.query()
  );
}
