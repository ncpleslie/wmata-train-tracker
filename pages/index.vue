<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { useGetTrains } from "~/composables/use_train.composable";
import { useStationStore } from "~/stores/station.store";
import { route } from "~/types/route.type";

const router = useRouter();
const stationStore = useStationStore();
const [parent] = useAutoAnimate();

setInterval(() => {
  refresh();
}, 1000 * 60 * 2);

const {
  data,
  error,
  refresh,
  pending: isRefreshing,
} = useGetTrains(stationStore.selectedStation?.code);

const routeOnAreaTap = async (route: route) => {
  await router.push(route);
};
</script>

<template>
  <AreaAction
    :on-middle-tap="refresh"
    :on-right-tap="() => routeOnAreaTap('stations')"
  >
    <div v-if="!data">...</div>
    <TrainArrivalBoard v-else :trains="data.trains">
      <ClientOnly>
        <LastUpdated
          class="ml-auto"
          :last-updated="new Date(data.lastUpdated)"
        />
      </ClientOnly>
    </TrainArrivalBoard>
    <p v-if="error" class="text-white">Error: {{ error }}</p>
    <LoadingIndicator v-if="isRefreshing" />
  </AreaAction>
</template>
