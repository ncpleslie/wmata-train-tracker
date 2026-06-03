<script setup lang="ts">
import { IncidentsView } from "@wmata-train-tracker/frontend";
import { Route } from "@wmata-train-tracker/shared";
import { useTrainStore } from "~/stores/train.store";

const trainStore = useTrainStore();
const { data: incidentData, refresh } = useGetIncidents();

const incidents = computed(
  () => incidentData.value?.incidents ?? trainStore.incidents,
);

const onSlideEnd = () => {
  trainStore.clearIncidents();
  navigateTo(Route.Index, { replace: true });
};

onMounted(async () => {
  await refresh();
  if (!incidentData.value?.incidents?.length) {
    navigateTo(Route.Index, { replace: true });
  }
});

watch(incidentData, () =>
  trainStore.setIncidents(incidentData.value?.incidents),
);
</script>

<template>
  <IncidentsView :incidents="incidents" @on-slide-end="onSlideEnd" />
</template>
