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
  totalPerPage: 12,
});

const emit = defineEmits<{
  (e: "stationClicked"): void;
  (e: "backClicked"): void;
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

const onBackedClicked = () => {
  emit("backClicked");
};
</script>

<template>
  <div class="flex h-screen w-screen flex-col gap-2">
    <div class="flex flex-row gap-2">
      <BaseButton
        class="w-24"
        @clicked="onBackedClicked"
        @mouseovered="onBackedClicked"
      >
        <Icon name="tabler:arrow-big-left-filled" size="2em" />
      </BaseButton>
      <BaseButton class="w-full" @clicked="previousPage">
        <Icon name="tabler:arrow-big-up-filled" size="2em" />
      </BaseButton>
    </div>
    <ul
      ref="parent"
      class="flex h-full flex-row flex-wrap items-center justify-center gap-1 overflow-y-hidden"
    >
      <li v-for="station in displayedItems" :key="station.code" class="flex-1">
        <BaseButton
          class="h-[6.5rem] w-full min-w-[12rem]"
          primary
          :class="{
            '!bg-amber-200 !text-black': selectedStation?.code === station.code,
          }"
          @clicked="onStationClicked(station)"
        >
          {{ station.name }}
        </BaseButton>
      </li>
    </ul>
    <BaseButton class="w-full" @clicked="nextPage">
      <Icon name="tabler:arrow-big-down-filled" size="2em" />
    </BaseButton>
  </div>
</template>

<style scoped></style>
