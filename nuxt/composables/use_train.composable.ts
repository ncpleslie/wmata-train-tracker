import type { TRPCClientError } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/trpc/routers";
import { useTrainStore } from "~/stores/train.store";

type RouterOutput = inferRouterOutputs<AppRouter>;
type getIncidentsOutput = RouterOutput["train"]["getIncidents"];
type GetTrainsOutput = RouterOutput["train"]["getTrains"];
type GetStationOutput = RouterOutput["train"]["getStations"];
type GetStationByIdOutput = RouterOutput["train"]["getStationById"];

type ErrorOutput = TRPCClientError<AppRouter>;

const getCachedData = <T>(
  key: string,
  nuxtApp: ReturnType<typeof useNuxtApp>,
  ctx?: { cause?: string },
): T | undefined => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key] as T | undefined;
  }
  if (ctx?.cause === "refresh:manual" || ctx?.cause === "refresh:hook") {
    return undefined;
  }
  return (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) as
    | T
    | undefined;
};

/**
 * Retrieves incidents using the Nuxt app client and returns the result as asynchronous data.
 *
 * @returns - The asynchronous data containing the incidents.
 */
export function useGetIncidents() {
  const { $client } = useNuxtApp();
  return useAsyncData<getIncidentsOutput, ErrorOutput>(
    "incidents",
    () => $client.train.getIncidents.query(),
    { immediate: false, getCachedData },
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
  const trainStore = useTrainStore();
  const { $client } = useNuxtApp();
  return useAsyncData<GetTrainsOutput, ErrorOutput>(
    "trains",
    () =>
      $client.train.getTrains.query({
        stationId: trainStore.selectedStation?.code,
      }),
    { getCachedData },
  );
}

export function useGetStationById(stationId: string) {
  const { $client } = useNuxtApp();
  return useAsyncData<GetStationByIdOutput, ErrorOutput>(
    `station-${stationId}`,
    () =>
      $client.train.getStationById.query({
        stationId,
      }),
    { immediate: false, getCachedData },
  );
}

/**
 * Retrieves stations using the Nuxt app client and returns the result as asynchronous data.
 *
 * @returns - The asynchronous data containing the stations.
 */
export function useGetStations() {
  const { $client } = useNuxtApp();
  return useAsyncData<GetStationOutput, ErrorOutput>(
    "stations",
    () => $client.train.getStations.query(),
    { getCachedData },
  );
}
