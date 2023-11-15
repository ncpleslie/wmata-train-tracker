<script setup lang="ts">
import { GetTrains, GetSelectedStation, GetIncidents } from "@wails/go/app/App";
import {
  IncidentsResponseEntity,
  StationEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import HomeView from "@/components/HomeView.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";
import BootView from "@/components/BootView.vue";
import { useQuery } from "@/composables/query";
import { Route, RuntimeEvent, RuntimeErrorEvent } from "@/constants/constants";
import { useTypedRouter } from "@/composables/typed-router";
import { useRuntime } from "@/composables/runtime";

const router = useTypedRouter();
const { eventOn } = useRuntime();

const data = ref<TrainsResponseEntity>();
const eventIncidents = ref<IncidentsResponseEntity>();
const isError = ref(false);

const {
  data: trainsResponse,
  error: trainError,
  isLoading: isTrainsLoading,
  refetch,
} = useQuery<TrainsResponseEntity>(GetTrains());

const { data: selectedStation } = useQuery<StationEntity>(GetSelectedStation());

const { data: queryIncidents } = useQuery<IncidentsResponseEntity>(
  GetIncidents()
);

eventOn<TrainsResponseEntity>(RuntimeEvent.trains, (trains) => {
  isError.value = false;
  data.value = trains;
});

eventOn<IncidentsResponseEntity>(RuntimeEvent.incidents, (incidents) => {
  isError.value = false;
  eventIncidents.value = incidents;
});

eventOn<Error>(RuntimeErrorEvent.trains, () => (isError.value = true));

eventOn<Error>(RuntimeErrorEvent.incidents, () => (isError.value = true));

const hasIncidents = computed(
  () =>
    (queryIncidents.value?.incidents ?? []).length > 0 ||
    (eventIncidents.value?.incidents ?? []).length > 0
);

const navigateToIncidents = () => {
  if (hasIncidents.value) {
    router.pushPath(Route.Incidents);
  }
};

const refresh = () => {
  isError.value = false;
  refetch();
};

watch(trainsResponse, () => {
  if (trainsResponse.value?.trains.length !== 0) {
    data.value = trainsResponse.value;
  }
});
</script>

<template>
  <BootView v-if="!data" />
  <HomeView
    v-else
    :train-data="data"
    :selected-station-name="selectedStation?.name"
    :has-incidents="hasIncidents"
    :is-refreshing="isTrainsLoading"
    @on-left-tap="router.push(Route.Stations)"
    @on-middle-tap="refresh"
    @on-right-tap="navigateToIncidents"
    @on-see-incidents="navigateToIncidents"
  />
  <ErrorPopup
    :open="
      (!isTrainsLoading && !trainsResponse) ||
      Boolean(trainError?.message) ||
      isError
    "
    @on-close="refresh"
  >
    <template #error-message>
      Something went wrong while attempting to refresh
    </template>
    <template #close-message>Try again?</template>
  </ErrorPopup>
</template>
