<script setup lang="ts">
interface TextCarouselProps {
  slides: string[];
}

const props = defineProps<TextCarouselProps>();

const activeIndex = ref(0);
const enteringIndex = ref(-1);
const leavingIndex = ref(-1);
const timer = ref<NodeJS.Timeout | null>(null);

const startCarousel = () => {
  timer.value = setInterval(() => {
    leavingIndex.value = activeIndex.value;
    enteringIndex.value = activeIndex.value;
    activeIndex.value = (activeIndex.value + 1) % props.slides.length;
    if (leavingIndex.value === props.slides.length - 1) {
      emit("slideEnd");
    }
  }, 5000);
};

const slidesStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * 100}%)`,
}));

const stopCarousel = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  stopCarousel();
});

const emit = defineEmits<{
  (e: "slideEnd"): void;
}>();
</script>

<template>
  <div class="carousel">
    <div class="slides" :style="slidesStyle">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <p class="w-screen text-center text-9xl leading-[1.7ch] text-red-600">
          {{ slide }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s;
}

.slide {
  flex: 0 0 100%;
  width: 100%;
}

.slide.active {
  opacity: 1;
}

.slide-enter-active {
  opacity: 1;
  transform: translateX(-100%);
}

.slide-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
</style>
