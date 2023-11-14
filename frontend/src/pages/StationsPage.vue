<script setup lang="ts">
import {
  StationEntity,
  StationsResponseEntity,
} from "@wmata-train-tracker/shared";
import ScrollableStationList from "@/components/ScrollableStationList.vue";
import { useQuery } from "@/composables/query";
import {
  GetStations,
  GetSelectedStation,
  SetSelectedStation,
  GetCurrentStationPage,
  SetCurrentStationPage,
} from "@wails/go/app/App";
import { useTypedRouter } from "@/composables/typed-router";
import { Route } from "@/constants/constants";

const router = useTypedRouter();

const { data: currentPage } = useQuery<number>(GetCurrentStationPage());

const {
  data: stations,
  error,
  isLoading,
  refetch,
} = useQuery<StationsResponseEntity>(GetStations());

const { data: selectedStation } = useQuery<StationEntity>(GetSelectedStation());

const onStationClicked = async (station: StationEntity) => {
  await SetSelectedStation(station.code);
  router.pushPath(Route.Index);
};

const onSetPage = async (page: number) => {
  currentPage.value = page;
  await SetCurrentStationPage(page);
};
</script>

<template>
  <div class="stations">
    <ScrollableStationList
      v-if="stations"
      :stations="stations.stations"
      :selected-station="selectedStation"
      :current-page="currentPage || 0"
      @on-set-page="onSetPage"
      @station-clicked="onStationClicked"
      @back-clicked="router.pushPath(Route.Index)"
    />
    <ErrorPopup
      :open="(!isLoading && !stations) || Boolean(error?.message)"
      @on-close="refetch"
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
  font-family: unset !important;
}
</style>
