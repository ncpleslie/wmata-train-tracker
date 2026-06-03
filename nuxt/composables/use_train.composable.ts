import type { TRPCClientError } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { MaybeRef } from "vue";
import { toValue } from "vue";
import type { AppRouter } from "@/server/trpc/routers";

type RouterOutput = inferRouterOutputs<AppRouter>;
type getIncidentsOutput = RouterOutput["train"]["getIncidents"];
type GetTrainsOutput = RouterOutput["train"]["getTrains"];
type GetStationOutput = RouterOutput["train"]["getStations"];
type GetStationByIdOutput = RouterOutput["train"]["getStationById"];

type ErrorOutput = TRPCClientError<AppRouter>;

const getCachedData = <T>(
  key: string,
  nuxtApp: ReturnType<typeof useNuxtApp>,
): T | undefined => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key] as T | undefined;
  }
  return undefined;
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
 * If no station code is provided, the server default station will be used.
 *
 * @param stationId - Reactive station code from URL or store.
 * @returns - The asynchronous data containing the trains.
 */
export function useGetTrains(stationId: MaybeRef<string | undefined>) {
  const code = computed(() => toValue(stationId));
  const { $client } = useNuxtApp();
  return useAsyncData<GetTrainsOutput, ErrorOutput>(
    () => `trains-${code.value ?? "none"}`,
    () =>
      $client.train.getTrains.query({
        stationId: code.value,
      }),
    { immediate: false, getCachedData, watch: [code] },
  );
}

export function useGetStationById(stationId: MaybeRef<string>) {
  const id = computed(() => toValue(stationId));
  const { $client } = useNuxtApp();
  return useAsyncData<GetStationByIdOutput, ErrorOutput>(
    () => `station-${id.value}`,
    () =>
      $client.train.getStationById.query({
        stationId: id.value,
      }),
    { immediate: false, getCachedData, watch: [id] },
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
