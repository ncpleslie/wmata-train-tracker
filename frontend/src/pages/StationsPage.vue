<script setup lang="ts">
import {
  StationEntity,
  StationsResponseEntity,
} from "@wmata-train-tracker/shared";
import ScrollableStationList from "../components/ScrollableStationList.vue";
import { useQuery } from "../composables/query";
import { GetStations } from "../../wailsjs/go/app/App";
import { useRouter } from "vue-router";

const router = useRouter();

const currentPage = ref(0);

const {
  data,
  // error,
  // isLoading,
} = useQuery<StationsResponseEntity, Error>(GetStations());

const onStationClicked = (station: StationEntity) => {
  console.log(station);
  router.push({
    path: "/",
  });
};

const onSetPage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="stations">
    <ScrollableStationList
      v-if="data"
      :stations="data.stations"
      :selected-station="data.stations[0]"
      :current-page="0"
      @on-set-page="onSetPage"
      @station-clicked="onStationClicked"
      @back-clicked="router.push('/')"
    />
  </div>
</template>

<style scoped>
.stations {
  font-family: unset;
}
</style>
