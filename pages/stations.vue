<script setup lang="ts">
import { useGetStations } from "~/composables/use_train.composable";

const { data } = useGetStations();
const router = useRouter();
</script>

<template>
  <div v-if="!data">...</div>
  <ScrollableStationList
    v-else
    :stations="data.stations"
    @station-clicked="router.push('/')"
    @back-clicked="router.push('/')"
  />
</template>
