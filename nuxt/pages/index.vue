<script setup lang="ts">
import { ErrorPopup, HomeView } from "@wmata-train-tracker/frontend";
import { Route, RouteValues } from "@wmata-train-tracker/shared";
import { useGetTrains } from "~/composables/use_train.composable";
import { useTrainStore } from "~/stores/train.store";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const nuxtRoute = useRoute();
const trainStore = useTrainStore();

const stationId = ref(nuxtRoute.query.stationId?.toString() || "");

const {
  data: trainData,
  error: trainError,
  refresh: refreshTrains,
  pending: trainIsRefreshing,
} = useGetTrains();
const { data: incidentData, refresh: refreshIncidents } = useGetIncidents();
const { data: station, refresh: refreshStation } = useGetStationById(
  stationId.value
);

useMountedInterval(refreshTrains, runtimeConfig.public.refreshInMs);
useMountedInterval(refreshIncidents, runtimeConfig.public.incidentRefreshInMs);

const hasIncidents = computed(
  () =>
    (incidentData.value?.incidents &&
      incidentData.value?.incidents.length > 0) ||
    false
);

const routeOnAreaTap = async (route: RouteValues) => {
  await router.push(route);
};

const onSeeIncidents = () => {
  if (hasIncidents.value) {
    navigateTo(Route.Incidents);
  }
};

const onMiddleTapped = () => {
  refreshTrains();
  refreshIncidents();
};

onMounted(() => {
  refreshTrains();
  refreshIncidents();
});

watch(incidentData, () =>
  trainStore.setIncidents(incidentData?.value?.incidents)
);

watch(
  () => nuxtRoute.query.stationId,
  () => {
    if (!nuxtRoute.query.stationId) {
      return;
    }
    stationId.value = nuxtRoute.query.stationId.toString();
    if (stationId.value === trainStore.selectedStation?.code) {
      return;
    }

    refreshStation();
  },
  { immediate: true }
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
    <ClientOnly>
      <HomeView
        v-if="trainData"
        :train-data="trainData"
        :selected-station-name="trainStore.selectedStation?.name"
        :has-incidents="hasIncidents"
        :is-refreshing="trainIsRefreshing"
        @on-left-tap="() => routeOnAreaTap(Route.Stations)"
        @on-middle-tap="onMiddleTapped"
        @on-right-tap="() => routeOnAreaTap(Route.Incidents)"
        @on-see-incidents="onSeeIncidents"
      />
    </ClientOnly>
    <ErrorPopup
      :open="(!trainIsRefreshing && !trainData) || Boolean(trainError?.message)"
      @on-close="refreshTrains"
    >
      <template #error-message>
        Something went wrong while attempting to refresh
      </template>
      <template #close-message>Try again?</template>
    </ErrorPopup>
  </div>
</template>
