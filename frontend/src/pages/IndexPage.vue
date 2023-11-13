<script setup lang="ts">
import { GetTrainsByStationId } from "../../wailsjs/go/app/App";
import {
  IncidentsResponseEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import HomeView from "../components/HomeView.vue";
import { useQuery } from "../composables/query";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedStationName = ref<string>();
const data = ref<TrainsResponseEntity>();
const hasIncidents = ref(false);
const isRefreshing = ref(false);

const {
  data: trainsResponse,
  // error,
  // isLoading,
} = useQuery<TrainsResponseEntity, Error>(GetTrainsByStationId("B03"));

EventsOn("trains", (trains: TrainsResponseEntity) => {
  console.log(trains);
  data.value = trains;
});

EventsOn("incidents", (incidents: IncidentsResponseEntity) => {
  console.log(incidents);
  hasIncidents.value = incidents.incidents.length > 0;
});

const refresh = () => {};

watch(trainsResponse, () => {
  if (trainsResponse.value?.trains.length !== 0) {
    data.value = trainsResponse.value;
  }
});
</script>

<template>
  <HomeView
    :train-data="data"
    :selected-station-name="selectedStationName"
    :has-incidents="hasIncidents"
    :is-refreshing="isRefreshing"
    @on-left-tap="router.push('/stations')"
    @on-middle-tap="refresh"
    @on-right-tap="router.push('/incidents')"
  />
</template>
