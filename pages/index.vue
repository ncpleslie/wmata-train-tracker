<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { useGetTrains } from "~/composables/use_train.composable";
import { useStationStore } from "~/stores/station.store";

const router = useRouter();
const stationStore = useStationStore();
const [parent] = useAutoAnimate();

type route = "stations";

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
    :on-left-tap="() => routeOnAreaTap('stations')"
    :on-middle-tap="refresh"
    :on-right-tap="() => routeOnAreaTap('stations')"
  >
    <div v-if="!data">...</div>
    <div
      v-else
      class="trains flex h-screen flex-col justify-between bg-black text-8xl"
    >
      <div ref="parent">
        <div class="grid grid-cols-8 text-red-600">
          <p class="col-span-1">LN</p>
          <p class="col-span-2">CAR</p>
          <p class="col-span-3">DEST</p>
          <p class="col-span-2 justify-self-end">MIN</p>
        </div>
        <div v-if="data.trains.length === 0">No trains</div>
        <div
          v-for="train in data.trains"
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
      <ClientOnly>
        <LastUpdated
          class="ml-auto"
          :last-updated="new Date(data.lastUpdated)"
        />
      </ClientOnly>
      <p v-if="error" class="text-white">Error: {{ error }}</p>
      <LoadingIndicator v-if="isRefreshing" />
    </div>
  </AreaAction>
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
