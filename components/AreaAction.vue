<template>
  <div class="h-screen w-screen" @click="handleClick">
    <div
      class="page"
      :class="{ 'slide-left': slideLeft, 'slide-right': slideRight }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AreaActionProps {
  onLeftTap?: () => Promise<void>;
  onMiddleTap?: () => Promise<void>;
  onRightTap?: () => Promise<void>;
}

const props = defineProps<AreaActionProps>();

const slideLeft = ref(false);
const slideRight = ref(false);
const delay = 500;

const handleClick = (event: MouseEvent) => {
  const screenWidth = window.innerWidth;
  const clickPosition = event.clientX;

  if (clickPosition < screenWidth / 4 && props.onLeftTap) {
    slideLeft.value = true;
    setTimeout(() => {
      props.onLeftTap!();
    }, delay);
    return;
  }

  if (clickPosition > (3 * screenWidth) / 4 && props.onRightTap) {
    slideRight.value = true;
    setTimeout(() => {
      props.onRightTap!();
    }, delay);

    return;
  }

  if (!props.onMiddleTap) {
    return;
  }

  props.onMiddleTap();
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.page {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
}

.slide-left {
  transform: translateX(100%);
}

.slide-right {
  transform: translateX(-100%);
}
</style>
