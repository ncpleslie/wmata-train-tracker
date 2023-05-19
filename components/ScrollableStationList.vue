<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import StationResponseEntity from "~/models/station_response.entity";
import { useStationStore } from "~/stores/station.store";

const stationStore = useStationStore();
const { selectedStation, currentPage } = toRefs(stationStore);

const [parent] = useAutoAnimate();

interface ScrollableStationListProps {
  stations: StationResponseEntity[];
  totalPerPage?: number;
}

const props = withDefaults(defineProps<ScrollableStationListProps>(), {
  totalPerPage: 5,
});

const emit = defineEmits<{
  (e: "stationClicked"): void;
}>();

const displayedItems = computed(() => {
  const startIndex = currentPage.value * props.totalPerPage;
  const endIndex = startIndex + props.totalPerPage;
  return props.stations.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(props.stations.length / props.totalPerPage)
);

const nextPage = () => {
  currentPage.value = (currentPage.value + 1) % totalPages.value;
};

const previousPage = () => {
  const newPage = currentPage.value - 1;
  currentPage.value = newPage >= 0 ? newPage : totalPages.value - 1;
};

const onStationClicked = (station: StationResponseEntity) => {
  emit("stationClicked");
  stationStore.setSelectedStation(station);
};
</script>

<template>
  <div class="flex w-screen flex-col gap-2">
    <button
      class="rounded bg-red-600 py-4 text-lg font-bold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      @click="previousPage"
    >
      <Icon name="tabler:arrow-big-up-filled" size="2em" />
    </button>
    <ul
      ref="parent"
      class="flex h-full flex-grow flex-row flex-wrap gap-2 overflow-y-hidden"
    >
      <li v-for="station in displayedItems" :key="station.code" class="flex-1">
        <button
          :key="station.code"
          class="h-24 w-full min-w-[12rem] rounded bg-amber-400 px-4 py-2 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
          :class="{
            'bg-amber-200 text-black': selectedStation?.code === station.code,
          }"
          @click="onStationClicked(station)"
        >
          <Icon
            v-if="selectedStation?.code === station.code"
            name="tabler:circle-check-filled"
            size="2em"
          />
          {{ station.name }}
        </button>
      </li>
    </ul>
    <button
      class="rounded bg-red-600 py-4 text-lg font-bold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      @click="nextPage"
    >
      <Icon name="tabler:arrow-big-down-filled" size="2em" />
    </button>
  </div>
</template>

<style scoped></style>
