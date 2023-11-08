<script setup lang="ts">
// import { GetTrainsByStationId } from "../wailsjs/go/app/App";
import { TrainsResponseEntity } from "@wmata-train-tracker/shared";
import { EventsOn } from "../wailsjs/runtime/runtime";
import HomeView from "./components/HomeView.vue";
// import { useQuery } from "./composables/query";

const selectedStationName = ref<string>();
const data = ref<TrainsResponseEntity>();

// const { data, error, isLoading } = useQuery<TrainsResponseEntity, Error>(
//   GetTrainsByStationId("B03")
// );

EventsOn("trains", (trains: TrainsResponseEntity) => {
  console.log(trains);
  data.value = trains;
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
      :has-incidents="false"
      :is-refreshing="false"
    />
  </main>
</template>

<style scoped>
main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
