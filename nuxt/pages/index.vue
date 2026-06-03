<script setup lang="ts">
import { ErrorPopup, HomeView } from "@wmata-train-tracker/frontend";
import type { RouteValues } from "@wmata-train-tracker/shared";
import { Route } from "@wmata-train-tracker/shared";
import { useTrainStore } from "~/stores/train.store";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const nuxtRoute = useRoute();
const trainStore = useTrainStore();

const stationId = ref(nuxtRoute.query.stationId?.toString() || "");
const hasLoadedOnce = ref(false);

const effectiveStationId = computed(
  () => stationId.value || trainStore.selectedStation?.code,
);

const {
  data: trainData,
  error: trainError,
  refresh: refreshTrains,
  pending: trainIsRefreshing,
} = useGetTrains(effectiveStationId);
const { data: incidentData, refresh: refreshIncidents } = useGetIncidents();
const { data: station, refresh: refreshStation } = useGetStationById(stationId);

useMountedInterval(refreshTrains, runtimeConfig.public.refreshInMs);
useMountedInterval(refreshIncidents, runtimeConfig.public.incidentRefreshInMs);

const hasIncidents = computed(
  () =>
    (incidentData.value?.incidents &&
      incidentData.value?.incidents.length > 0) ||
    false,
);

const routeOnAreaTap = async (route: RouteValues) => {
  await router.push(route);
};

const onSeeIncidents = () => {
  if (hasIncidents.value) {
    trainStore.setIncidents(incidentData.value?.incidents);
    navigateTo(Route.Incidents);
  }
};

const onMiddleTapped = () => {
  refreshTrains({ dedupe: "cancel" });
  refreshIncidents({ dedupe: "cancel" });
};

onMounted(async () => {
  await Promise.all([refreshTrains(), refreshIncidents()]);
  hasLoadedOnce.value = true;
});

watch(incidentData, () =>
  trainStore.setIncidents(incidentData?.value?.incidents),
);

watch(
  () => nuxtRoute.query.stationId,
  () => {
    if (!nuxtRoute.query.stationId) {
      return;
    }
    stationId.value = nuxtRoute.query.stationId.toString();
    refreshStation();
  },
  { immediate: true },
);

watch(station, () => {
  if (!station.value) {
    return;
  }
  trainStore.setSelectedStation(station.value);
});
</script>

<template>
  <div>
    <HomeView
      :train-data="trainData"
      :selected-station-name="trainStore.selectedStation?.name"
      :has-incidents="hasIncidents"
      :is-refreshing="trainIsRefreshing || (!hasLoadedOnce && !trainData)"
      @on-left-tap="() => routeOnAreaTap(Route.Stations)"
      @on-middle-tap="onMiddleTapped"
      @on-right-tap="onSeeIncidents"
      @on-see-incidents="onSeeIncidents"
    />
    <ErrorPopup
      :open="
        hasLoadedOnce &&
        ((!trainIsRefreshing && !trainData) || Boolean(trainError?.message))
      "
      @on-close="refreshTrains"
    >
      <template #error-message>
        Something went wrong while attempting to refresh
      </template>
      <template #close-message>Try again?</template>
    </ErrorPopup>
  </div>
</template>
