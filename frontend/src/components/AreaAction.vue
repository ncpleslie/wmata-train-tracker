<script setup lang="ts">
const emit = defineEmits<{
  onLeftTap: [];
  onMiddleTap: [];
  onRightTap: [];
}>();

const delay = 500;

const handleClick = (event: MouseEvent) => {
  const screenWidth = window.innerWidth;
  const clickPosition = event.clientX;

  if (clickPosition < screenWidth / 4) {
    setTimeout(() => {
      emit("onLeftTap");
    }, delay);
    return;
  }

  if (clickPosition > (3 * screenWidth) / 4) {
    setTimeout(() => {
      emit("onRightTap");
    }, delay);

    return;
  }

  emit("onMiddleTap");
};
</script>

<template>
  <div class="h-screen w-screen" @click="handleClick">
    <slot></slot>
  </div>
</template>
