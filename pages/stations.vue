<script setup lang="ts">
import { useGetStations } from "~/composables/use_train.composable";

const { data, error, refresh, pending } = useGetStations();
</script>

<template>
  <LoadingIndicator v-if="pending" />
  <div v-if="!data">...</div>
  <div v-else class="flex flex-row flex-wrap items-center justify-center gap-2">
    <button
      v-for="station in data.stations"
      :key="station.code"
      class="rounded bg-amber-400 px-4 py-2 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
    >
      {{ station.name }}
    </button>
  </div>
</template>
