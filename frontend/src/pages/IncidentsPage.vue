<script setup lang="ts">
import { GetIncidents } from "@wails/go/app/App";
import { IncidentsResponseEntity, Route } from "@wmata-train-tracker/shared";
import IncidentsView from "@/components/IncidentsView.vue";
import { useQuery } from "@/composables/query";
import { useTypedRouter } from "@/composables/typed-router";

const router = useTypedRouter();

const { data: incidentResponse } = useQuery<IncidentsResponseEntity>(
  GetIncidents()
);

const onSlideEnd = () => {
  router.pushPath(Route.Index);
};

watch(incidentResponse, () => {
  if (incidentResponse.value?.incidents.length === 0) {
    router.pushPath(Route.Index);
  }
});
</script>

<template>
  <IncidentsView
    v-if="incidentResponse"
    :incidents="incidentResponse?.incidents"
    @on-slide-end="onSlideEnd"
  />
</template>
