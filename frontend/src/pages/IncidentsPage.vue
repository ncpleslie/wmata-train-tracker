<script setup lang="ts">
import { GetIncidents } from "../../wailsjs/go/app/App";
import { IncidentsResponseEntity } from "../../../shared";
import IncidentsView from "../components/IncidentsView.vue";
import { useQuery } from "../composables/query";
import { useRouter } from "vue-router";

const router = useRouter();

const { data: incidentResponse } = useQuery<IncidentsResponseEntity, Error>(
  GetIncidents()
);

const onSlideEnd = () => {
  router.push("/");
};

watch(incidentResponse, () => {
  if (incidentResponse.value?.incidents.length === 0) {
    router.push("/");
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
