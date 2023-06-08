<script setup lang="ts">
import AppConstants from "~/constants/app.constants";

interface TextCarouselProps {
  slides: string[];
}

const props = defineProps<TextCarouselProps>();

const activeIndex = ref(0);
const enteringIndex = ref(-1);
const leavingIndex = ref(-1);
const timer = ref<NodeJS.Timeout | null>(null);
const slidesCount = ref(0);
const slots = useSlots();

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

const render = () => {
  return slots.default?.().map((slot) => {
    console.log(slot);
    return [
      h(
        slot.type.toString(),
        {
          ...slot.props,
          class: `${slot.props?.class} slide`,
          style: {
            ...slot.el?.props?.style,
            transform: `translateX(-${activeIndex.value * 100}%)`,
            transition: "transform 0.5s",
            flex: "0 0 100%",
          },
          innerHTML: typeof slot.children === "string" ? slot.children : null,
        },
        slot.children ?? (slot.children as unknown as VNode[])
      ),
      props.slides.map((slide) =>
        h(
          "p",
          {
            class:
              "w-screen flex justify-center items-center text-center text-9xl leading-[1.7ch] text-red-600",
            style: {
              transform: `translateX(-${activeIndex.value * 100}%)`,
              transition: "transform 0.5s",
              flex: "0 0 100%",
            },
          },
          slide
        )
      ),
    ];
  });
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
    <render />
  </div>
</template>
