<script setup lang="ts">
import { GetTrains, GetSelectedStation, GetIncidents } from "@wails/go/app/App";
import {
  IncidentsResponseEntity,
  StationEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import { EventsOn } from "@wails/runtime/runtime";
import HomeView from "@/components/HomeView.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";
import { useQuery } from "@/composables/query";
import { Route, RuntimeEvent } from "@/constants/constants";
import { useTypedRouter } from "@/composables/typed-router";

const router = useTypedRouter();

const data = ref<TrainsResponseEntity>();
const eventIncidents = ref<IncidentsResponseEntity>();

const {
  data: trainsResponse,
  error: trainError,
  isLoading: isTrainsLoading,
  refetch,
} = useQuery<TrainsResponseEntity>(GetTrains());

const { data: selectedStation, isLoading: isSelectedStationLoading } =
  useQuery<StationEntity>(GetSelectedStation());

const { data: queryIncidents } = useQuery<IncidentsResponseEntity>(
  GetIncidents()
);

const hasIncidents = computed(() =>
  Boolean(
    (queryIncidents.value?.incidents ?? []).length > 0 ||
      (eventIncidents.value?.incidents ?? []).length > 0
  )
);

const navigateToIncidents = () => {
  if (hasIncidents.value) {
    router.pushPath(Route.Incidents);
  }
};

EventsOn(RuntimeEvent.trains, (trains: TrainsResponseEntity) => {
  data.value = trains;
});

EventsOn(RuntimeEvent.incidents, (incidents: IncidentsResponseEntity) => {
  eventIncidents.value = incidents;
});

watch(trainsResponse, () => {
  if (trainsResponse.value?.trains.length !== 0) {
    data.value = trainsResponse.value;
  }
});
</script>

<template>
  <HomeView
    :train-data="data"
    :selected-station-name="selectedStation?.name"
    :has-incidents="hasIncidents"
    :is-refreshing="isSelectedStationLoading || isTrainsLoading"
    @on-left-tap="router.push(Route.Stations)"
    @on-middle-tap="refetch"
    @on-right-tap="navigateToIncidents"
    @on-see-incidents="navigateToIncidents"
  />
  <ErrorPopup
    :open="
      (!isTrainsLoading && !trainsResponse) || Boolean(trainError?.message)
    "
    @on-close="refetch"
  >
    <template #error-message>
      Something went wrong while attempting to refresh
    </template>
    <template #close-message>Try again?</template>
  </ErrorPopup>
</template>
