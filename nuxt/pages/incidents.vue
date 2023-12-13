<script setup lang="ts">
import { IncidentsView } from "@wmata-train-tracker/frontend";
import { Route } from "@wmata-train-tracker/shared";
import { useTrainStore } from "~/stores/train.store";

const trainStore = useTrainStore();
const { incidents } = toRefs(trainStore);

const onSlideEnd = () => {
  trainStore.clearIncidents();
  navigateTo(Route.Index, { replace: true });
};

definePageMeta({
  middleware: [
    function () {
      const trainStore = useTrainStore();
      if (trainStore.incidents.length === 0) {
        return navigateTo(Route.Index, { replace: true });
      }
    },
  ],
});
</script>

<template>
  <IncidentsView :incidents="incidents" @on-slide-end="onSlideEnd" />
</template>
