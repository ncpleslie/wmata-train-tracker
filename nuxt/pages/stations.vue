<script setup lang="ts">
import { StationEntity } from "@wmata-train-tracker/shared";
import { useGetStations } from "~/composables/use_train.composable";
import { useTrainStore } from "~/stores/train.store";
import { ScrollableStationList } from "@wmata-train-tracker/frontend";

const stationStore = useTrainStore();
const { selectedStation, currentPage } = toRefs(stationStore);

const { data, error, refresh, pending } = useGetStations();
const router = useRouter();

const onStationClicked = (station: StationEntity) => {
  stationStore.setSelectedStation(station);
  router.push({
    path: "/",
    query: { stationId: selectedStation.value?.code },
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
      :selected-station="selectedStation"
      :current-page="currentPage"
      @on-set-page="onSetPage"
      @station-clicked="onStationClicked"
      @back-clicked="router.push('/')"
    />
    <ErrorPopup
      :open="(!pending && !data) || Boolean(error?.message)"
      @on-close="refresh"
    >
      <template #error-message>
        Something went wrong while trying to load stations
      </template>
      <template #close-message>Try again?</template>
    </ErrorPopup>
  </div>
</template>

<style scoped>
.stations {
  font-family: unset;
}
</style>
