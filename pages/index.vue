<script setup lang="ts">
import useGetTrains from "~/composables/use_train.composable";

const { data, error, refresh } = useGetTrains();
</script>

<template>
  <PullToRefresh :on-refresh="refresh">
    <div v-if="!data">...</div>
    <div
      v-else
      class="trains flex h-screen flex-col justify-between bg-black text-xl"
    >
      <div>
        <div class="text-glow-red-600 grid grid-cols-4">
          <p>LN</p>
          <p>CAR</p>
          <p>DEST</p>
          <p class="justify-self-end">MIN</p>
        </div>
        <div v-if="data.trains.length === 0" class="text-glow-amber-400">
          No trains
        </div>
        <div
          v-for="train in data.trains"
          v-else
          :key="`${train.car}${train.destinationCode}${train.min}`"
          class="glow-amber-400 text-glow-amber-400 grid grid-cols-4"
        >
          <p>{{ train.line }}</p>
          <p>{{ train.car }}</p>
          <p>{{ train.destination }}</p>
          <p class="justify-self-end">{{ train.min }}</p>
        </div>
      </div>
      <ClientOnly>
        <LastUpdated :last-updated="new Date(data.lastUpdated)" />
      </ClientOnly>
      <p v-if="error" class="text-white">Error: {{ error }}</p>
    </div>
  </PullToRefresh>
</template>

<style scoped>
.trains {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
  line-height: 1.6ch;
}

.text-glow-amber-400 {
  @apply text-amber-400;
  text-shadow: 0 0 1px rgb(251, 191, 36), 0 0 2px rgb(251, 191, 36);
}

.text-glow-red-600 {
  @apply text-red-600;
  text-shadow: 0 0 1px rgb(220, 38, 38), 0 0 2px rgb(220, 38, 38);
}
</style>
