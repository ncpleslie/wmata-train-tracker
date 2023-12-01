<script setup lang="ts">
import { useTrainStore } from "~/stores/train.store";
import { IncidentsView } from "@wmata-train-tracker/frontend";

const trainStore = useTrainStore();
const { incidents } = toRefs(trainStore);

const onSlideEnd = () => {
  trainStore.clearIncidents();
  navigateTo("/", { replace: true });
};

onMounted(() => {
  if (trainStore.incidents.length === 0) {
    navigateTo("/", { replace: true });
  }
});
</script>

<template>
  <IncidentsView :incidents="incidents" @on-slide-end="onSlideEnd" />
</template>
