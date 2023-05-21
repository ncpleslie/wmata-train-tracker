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

<template>
  <div class="h-screen w-screen" @click="handleClick">
    <slot></slot>
  </div>
</template>
