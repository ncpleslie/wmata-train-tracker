<script setup lang="ts">
import useGetTrains from "~/composables/use_train.composable";

const { data, error, refresh } = useGetTrains();
</script>

<template>
  <PullToRefresh :on-refresh="refresh">
    <div v-if="!data">...</div>
    <div
      v-else
      class="trains flex h-screen flex-col justify-between bg-black text-9xl"
    >
      <div>
        <div class="grid grid-cols-5 text-red-600">
          <p class="col-span-1">LN</p>
          <p class="col-span-1">CAR</p>
          <p class="col-span-2">DEST</p>
          <p class="col-span-1 justify-self-end">MIN</p>
        </div>
        <div v-if="data.trains.length === 0">No trains</div>
        <div
          v-for="train in data.trains"
          v-else
          :key="`${train.car}${train.destinationCode}${train.min}`"
          class="grid grid-cols-5 text-amber-400"
        >
          <p class="col-span-1">{{ train.line }}</p>
          <p class="col-span-1">{{ train.car }}</p>
          <p class="col-span-2">{{ train.destination }}</p>
          <p class="col-span-1 justify-self-end">{{ train.min }}</p>
        </div>
      </div>
      <ClientOnly>
        <LastUpdated
          class="ml-auto"
          :last-updated="new Date(data.lastUpdated)"
        />
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
  text-shadow: 0 0 5px rgb(251, 191, 36), 0 0 10px rgb(251, 191, 36);
}

.text-glow-red-600 {
  @apply text-red-600;
  text-shadow: 0 0 5px rgb(220, 38, 38), 0 0 10px rgb(220, 38, 38);
}
</style>
