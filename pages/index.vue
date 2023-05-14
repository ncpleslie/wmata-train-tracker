<script setup lang="ts">
import useGetTrains from "~/composables/use_train.composable";

const { data, error } = useGetTrains();
</script>

<template>
  <div v-if="!data">...</div>
  <div v-else class="trains bg-black text-xl">
    <div class="grid grid-cols-4 text-red-600">
      <p>LN</p>
      <p>CAR</p>
      <p>DEST</p>
      <p class="justify-self-end">MIN</p>
    </div>
    <div v-if="data.trains.length === 0" class="text-amber-400">No trains</div>
    <div
      v-for="train in data.trains"
      v-else
      :key="`${train.car}${train.destinationCode}${train.min}`"
      class="grid grid-cols-4 text-amber-400"
    >
      <p>{{ train.line }}</p>
      <p>{{ train.car }}</p>
      <p>{{ train.destination }}</p>
      <p class="justify-self-end">{{ train.min }}</p>
    </div>
    <ClientOnly>
      <LastUpdated :last-updated="new Date(data.lastUpdated)" />
    </ClientOnly>
    <p v-if="error" class="text-white">Error: {{ error }}</p>
  </div>
</template>

<style scoped>
.trains {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
  line-height: 1.6ch;
}
</style>
