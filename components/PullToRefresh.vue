<script setup lang="ts">
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
}

const props = defineProps<PullToRefreshProps>();

const isPulling = ref(false);
const isRefreshing = ref(false);
const content = ref<HTMLDivElement | null>(null);
const translateY = ref(0);
const touching = ref(false);

let startY: number | null = null;

const contentHeight = computed(() => {
  if (!content.value) {
    return 0;
  }
  return content.value.getBoundingClientRect().height;
});

const handleTouchStart = (event: TouchEvent | MouseEvent) => {
  if (event instanceof MouseEvent) {
    startY = event.pageY;
  }

  if (window.TouchEvent && event instanceof TouchEvent) {
    startY = event.touches[0].pageY;
  }

  touching.value = true;
};

const handleTouchMove = (event: TouchEvent | MouseEvent) => {
  if (!startY || !touching.value) {
    return;
  }

  let currentY = 0;
  if (event instanceof MouseEvent) {
    currentY = event.pageY;
  }

  if (window.TouchEvent && event instanceof TouchEvent) {
    currentY = event.touches[0].pageY;
  }

  if (contentHeight.value < currentY - startY) {
    return;
  }

  const distance = currentY - startY;
  if (distance > 0) {
    isPulling.value = true;
    translateY.value = distance;
  } else {
    isPulling.value = false;
    translateY.value = 0;
  }
};

const handleTouchEnd = async () => {
  const pullThreshold = 25;
  if (!startY || !isPulling.value || translateY.value < pullThreshold) {
    translateY.value = 0;
    startY = null;
    return;
  }

  isPulling.value = false;
  touching.value = false;
  isRefreshing.value = true;
  await props.onRefresh();

  // Wait for an arbitrary amount of time so the user can see the refresh
  setTimeout(() => {
    isRefreshing.value = false;
    translateY.value = 0;
  }, 2000);
};

onMounted(() => {
  const contentElement = content.value;
  if (!contentElement) {
    return;
  }
  contentElement.addEventListener("touchstart", handleTouchStart, false);
  contentElement.addEventListener("touchmove", handleTouchMove, false);
  contentElement.addEventListener("touchend", handleTouchEnd, false);
  contentElement.addEventListener("mousedown", handleTouchStart, false);
  contentElement.addEventListener("mousemove", handleTouchMove, false);
  contentElement.addEventListener("mouseup", handleTouchEnd, false);
});

onBeforeUnmount(() => {
  const contentElement = content.value;
  if (!contentElement) {
    return;
  }
  contentElement.removeEventListener("touchstart", handleTouchStart, false);
  contentElement.removeEventListener("touchmove", handleTouchMove, false);
  contentElement.removeEventListener("touchend", handleTouchEnd, false);
  contentElement.removeEventListener("mousedown", handleTouchStart, false);
  contentElement.removeEventListener("mousemove", handleTouchMove, false);
  contentElement.removeEventListener("mouseup", handleTouchEnd, false);
});
</script>

<template>
  <div class="overflow-y-hidden">
    <div v-if="isRefreshing" class="refresh-indicator h-0">Refreshing...</div>
    <div
      ref="content"
      class="content"
      :style="{ transform: `translateY(${translateY / 4}px)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style>
.refresh-indicator {
  @apply relative mx-auto h-1 w-screen overflow-hidden before:absolute before:-left-2/4 before:h-1 before:w-2/5 before:animate-[lineAnim_1s_linear_infinite] before:bg-amber-400 before:content-[""];
}

.content {
  transform-origin: top;
  transition: transform 0.2s ease-out;
}

::selection {
  background: transparent;
}

@keyframes lineAnim {
  0% {
    left: -40%;
  }
  50% {
    left: 20%;
    width: 80%;
  }
  100% {
    left: 100%;
    width: 100%;
  }
}
</style>
