<script setup lang="ts">
import { useGetStations } from "~/composables/use_train.composable";

const { data } = useGetStations();
const router = useRouter();

const onStationClicked = () => {
  router.push("/");
};

const onBackClicked = () => {
  router.back();
};
</script>

<template>
  <div v-if="!data">...</div>
  <ScrollableStationList
    v-else
    :stations="data.stations"
    @station-clicked="onStationClicked"
    @back-clicked="onBackClicked"
  />
</template>
