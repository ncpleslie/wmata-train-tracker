<script setup lang="ts">
import { AppConstants } from "@wmata-train-tracker/shared";

interface TextCarouselProps {
  slides: string[];
}

const props = defineProps<TextCarouselProps>();

const activeIndex = ref(0);
const enteringIndex = ref(-1);
const leavingIndex = ref(-1);
const timer = ref<NodeJS.Timeout | null>(null);
const slidesCount = ref(0);

const startCarousel = () => {
  timer.value = setInterval(() => {
    leavingIndex.value = activeIndex.value;
    enteringIndex.value = activeIndex.value;
    activeIndex.value = (activeIndex.value + 1) % slidesCount.value;

    if (leavingIndex.value === slidesCount.value - 1) {
      emit("slideEnd");
    }
  }, AppConstants.incidentSlideTimeInMs);
};

const stopCarousel = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

onMounted(() => {
  startCarousel();
  slidesCount.value =
    (useSlots().default?.().length || 0) + props.slides.length;
});

onUnmounted(() => {
  stopCarousel();
});

const emit = defineEmits<{
  (e: "slideEnd"): void;
}>();
</script>

<template>
  <div class="flex w-full flex-row overflow-hidden">
    <p
      v-for="(slide, index) of slides"
      :key="index"
      class="slide flex w-screen items-center justify-center text-center text-2xl leading-[1.7ch] text-red-600 md:text-5xl"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
    >
      {{ slide }}
    </p>
  </div>
</template>

<style scoped>
.slide {
  transition: transform 0.5s;
  flex: 0 0 100%;
}
</style>
