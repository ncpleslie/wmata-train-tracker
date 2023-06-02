<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";

interface MinSizeWarningProps {
  minWidth: number;
}

const props = defineProps<MinSizeWarningProps>();

const element = ref<HTMLDivElement | null>(null);
const isTooSmall = ref(false);

useResizeObserver(element, () => {
  const width = element.value?.clientWidth ?? 0;
  if (!width) {
    return;
  }

  isTooSmall.value = width < props.minWidth;
});
</script>

<template>
  <div ref="element">
    <div
      v-if="isTooSmall"
      class="m-8 flex flex-col items-center justify-center text-3xl text-amber-400"
    >
      <p class="text-red-600">This application works best on wider screens</p>
      <p>Try rotating your device or using a larger screen</p>
    </div>
    <slot v-else></slot>
  </div>
</template>
