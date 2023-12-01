<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import { StationEntity } from "@wmata-train-tracker/shared";
import { AppConstants } from "@wmata-train-tracker/shared";
import BaseButton from "./BaseButton.vue";

interface ScrollableStationListProps {
  stations: StationEntity[];
  selectedStation?: StationEntity;
  currentPage: number;
}

const props = defineProps<ScrollableStationListProps>();

const parent = ref<HTMLDivElement | null>(null);

const totalPerPage = ref(0);
const firstObservation = ref(true);
const currentHeight = ref(0);
const currentWidth = ref(0);

const displayedItems = computed(() => {
  const startIndex = props.currentPage * totalPerPage.value;
  const endIndex = startIndex + totalPerPage.value;
  return props.stations.slice(startIndex, endIndex);
});

useResizeObserver(parent, () => {
  const height = parent.value?.offsetHeight || 0;
  const width = parent.value?.offsetWidth || 0;

  if (height === currentHeight.value && width === currentWidth.value) {
    return;
  }

  [currentHeight.value, currentWidth.value] = [height, width];
  const totalButtonsHeight = Math.floor(
    height / AppConstants.minStationButtonSize.height
  );
  const totalButtonsWidth = Math.floor(
    width / AppConstants.minStationButtonSize.width
  );
  totalPerPage.value = totalButtonsHeight * totalButtonsWidth;

  // Prevents losing page when reloading component.
  if (!firstObservation.value) {
    emit("onSetPage", 0);
  }

  firstObservation.value = false;
});

const totalPages = computed(() =>
  Math.ceil(props.stations.length / totalPerPage.value)
);

const nextPage = () => {
  emit("onSetPage", (props.currentPage + 1) % totalPages.value);
};

const previousPage = () => {
  const newPage = props.currentPage - 1;
  emit("onSetPage", newPage >= 0 ? newPage : totalPages.value - 1);
};

const onStationClicked = (station: StationEntity) => {
  emit("stationClicked", station);
};

const onBackedClicked = () => {
  emit("backClicked");
};

const emit = defineEmits<{
  stationClicked: [station: StationEntity];
  backClicked: [];
  onSetPage: [page: number];
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
        <Icon icon="tabler:arrow-big-left-filled" height="2em" />
      </BaseButton>
      <BaseButton class="w-full" @clicked="previousPage">
        <Icon icon="tabler:arrow-big-up-filled" height="2em" />
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
      <Icon icon="tabler:arrow-big-down-filled" height="2em" />
    </BaseButton>
  </div>
</template>
