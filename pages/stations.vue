<script setup lang="ts">
import { useGetStations } from "~/composables/use_train.composable";

const { data, error, refresh, pending } = useGetStations();
const router = useRouter();
</script>

<template>
  <div>
    <ScrollableStationList
      v-if="data"
      :stations="data.stations"
      @station-clicked="router.push('/')"
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
