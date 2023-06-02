<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import StationEntity from "~/models/station.entity";
import { useStationStore } from "~/stores/station.store";
import AppConstants from "~/constants/app.constants";

interface ScrollableStationListProps {
  stations: StationEntity[];
}

const props = defineProps<ScrollableStationListProps>();

const stationStore = useStationStore();
const { selectedStation, currentPage } = toRefs(stationStore);
const parent = ref<HTMLDivElement | null>(null);

const totalPerPage = ref(0);
const firstObservation = ref(true);
const currentHeight = ref(0);
const currentWidth = ref(0);

const displayedItems = computed(() => {
  const startIndex = currentPage.value * totalPerPage.value;
  const endIndex = startIndex + totalPerPage.value;
  return props.stations.slice(startIndex, endIndex);
});

useResizeObserver(parent, () => {
  const height = parent.value?.offsetHeight ?? 0;
  const width = parent.value?.offsetWidth ?? 0;
  // Prevents re-rendering when the size hasn't changed.
  if (height === currentHeight.value && width === currentWidth.value) {
    return;
  }

  currentHeight.value = height;
  currentWidth.value = width;
  const totalButtonsHeight = Math.floor(
    currentHeight.value / AppConstants.minStationButtonSize.height
  );
  const totalButtonsWidth = Math.floor(
    currentWidth.value / AppConstants.minStationButtonSize.width
  );
  totalPerPage.value = totalButtonsHeight * totalButtonsWidth;

  // Prevents losing page when reloading component.
  if (!firstObservation.value) {
    currentPage.value = 0;
  }
  firstObservation.value = false;
});

const totalPages = computed(() =>
  Math.ceil(props.stations.length / totalPerPage.value)
);

const nextPage = () => {
  currentPage.value = (currentPage.value + 1) % totalPages.value;
};

const previousPage = () => {
  const newPage = currentPage.value - 1;
  currentPage.value = newPage >= 0 ? newPage : totalPages.value - 1;
};

const onStationClicked = (station: StationEntity) => {
  emit("stationClicked");
  stationStore.setSelectedStation(station);
};

const onBackedClicked = () => {
  emit("backClicked");
};

const emit = defineEmits<{
  (e: "stationClicked"): void;
  (e: "backClicked"): void;
}>();
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
      class="flex h-full flex-row flex-wrap items-stretch justify-center gap-1 overflow-hidden"
    >
      <li v-for="station in displayedItems" :key="station.code" class="flex-1">
        <BaseButton
          :style="{
            'min-height': `${AppConstants.minStationButtonSize.height}px`,
            'min-width': `${AppConstants.minStationButtonSize.width}px`,
          }"
          class="h-full w-full"
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
