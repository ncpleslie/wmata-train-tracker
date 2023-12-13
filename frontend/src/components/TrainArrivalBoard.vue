<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { TrainEntity } from "@wmata-train-tracker/shared";

const [parent] = useAutoAnimate();

const maxDestinationLength = 8;

interface TrainArrivalBoardProps {
  trains: TrainEntity[];
}

defineProps<TrainArrivalBoardProps>();
</script>

<template>
  <div ref="parent" class="bg-black text-4xl md:text-8xl">
    <div class="mb-2 grid grid-cols-8 text-red-600">
      <p class="col-span-1">LN</p>
      <p class="col-span-2">CAR</p>
      <p class="col-span-3">DEST</p>
      <p class="col-span-2 justify-self-end">MIN</p>
    </div>
    <div v-if="trains.length === 0" class="text-amber-400">No trains</div>
    <div
      v-for="train in trains"
      v-else
      :key="`${train.car}${train.destinationCode}${train.min}`"
      class="grid grid-cols-8 whitespace-nowrap text-amber-400"
    >
      <p class="col-span-1">{{ train.line }}</p>
      <p class="col-span-2">{{ train.car }}</p>
      <p class="col-span-3">
        {{ train.destination.substring(0, maxDestinationLength) }}
      </p>
      <p class="col-span-2 justify-self-end">{{ train.min }}</p>
    </div>
  </div>
</template>

<style scoped>
.text-glow-amber-400 {
  @apply text-amber-400;
  text-shadow: 0 0 5px #fbbf24, 0 0 10px #fbbf24;
}

.text-glow-red-600 {
  @apply text-red-600;
  text-shadow: 0 0 5px #dc2626, 0 0 10px #dc2626;
}

::selection {
  background: transparent;
}
</style>
