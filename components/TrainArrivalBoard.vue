<script setup lang="ts">
import TrainResponseEntity from "~/models/train_response.entity";

interface TrainArrivalBoardProps {
  trains: TrainResponseEntity[];
}

defineProps<TrainArrivalBoardProps>();
</script>

<template>
  <div class="trains flex h-screen flex-col justify-between bg-black text-8xl">
    <div ref="parent">
      <div class="grid grid-cols-8 text-red-600">
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
        <p class="col-span-3">{{ train.destination }}</p>
        <p class="col-span-2 justify-self-end">{{ train.min }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.trains {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
  line-height: 1.7ch;
}

.text-glow-amber-400 {
  @apply text-amber-400;
  text-shadow: 0 0 5px rgb(251, 191, 36), 0 0 10px rgb(251, 191, 36);
}

.text-glow-red-600 {
  @apply text-red-600;
  text-shadow: 0 0 5px rgb(220, 38, 38), 0 0 10px rgb(220, 38, 38);
}

::selection {
  background: transparent;
}
</style>
