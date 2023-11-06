<script setup lang="ts">
import { GetTrainsByStationId } from "../wailsjs/go/main/App";
import { TrainsResponseEntity } from "@wmata-train-tracker/shared";
import { LogPrint } from "../wailsjs/runtime/runtime";
import HomeView from "./components/HomeView.vue";
import { query } from "./composables/query";

const selectedStationName = ref<string>();

const { data, error, isLoading } = query<TrainsResponseEntity, Error>(
  GetTrainsByStationId("B03")
);

watch(error, () => {
  LogPrint(`Error: ${error}`);
});
</script>

<template>
  <main class="h-screen overflow-x-hidden overflow-y-hidden bg-black">
    <HomeView
      :train-data="data"
      :selected-station-name="selectedStationName"
      :has-incidents="false"
      :is-refreshing="isLoading"
    />
  </main>
</template>

<style scoped>
main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
