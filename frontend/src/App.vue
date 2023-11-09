<script setup lang="ts">
// import { GetTrainsByStationId } from "../wailsjs/go/app/App";
import {
  IncidentsResponseEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import { EventsOn } from "../wailsjs/runtime/runtime";
import HomeView from "./components/HomeView.vue";
// import { useQuery } from "./composables/query";

const selectedStationName = ref<string>();
const data = ref<TrainsResponseEntity>();
const hasIncidents = ref(false);
const isRefreshing = ref(false);

// const { data, error, isLoading } = useQuery<TrainsResponseEntity, Error>(
//   GetTrainsByStationId("B03")
// );

EventsOn("trains", (trains: TrainsResponseEntity) => {
  console.log(trains);
  data.value = trains;
});

EventsOn("incidents", (incidents: IncidentsResponseEntity) => {
  console.log(incidents);
  hasIncidents.value = incidents.incidents.length > 0;
});

// watch(error, () => {
//   LogPrint(`Error: ${error}`);
// });
</script>

<template>
  <main class="h-screen overflow-x-hidden overflow-y-hidden bg-black">
    <HomeView
      :train-data="data"
      :selected-station-name="selectedStationName"
      :has-incidents="hasIncidents"
      :is-refreshing="isRefreshing"
    />
  </main>
</template>

<style scoped>
main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
