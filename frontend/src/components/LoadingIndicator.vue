<script setup lang="ts">
interface LoadingProps {
  show: boolean;
}
const minLoadingTimeInMs = 1000;
const props = defineProps<LoadingProps>();
const show = ref(false);

/**
 * Ensure the loading indicator is always displayed for at least n seconds.
 * Fast loading actions could cause the loading indicator to disappear too quickly.
 */
watch(
  () => props.show,
  () => {
    if (props.show) {
      show.value = true;
      return;
    }
    setTimeout(() => {
      show.value = false;
    }, minLoadingTimeInMs);
  }
);
</script>

<template>
  <div
    v-if="show"
    aria-busy="true"
    role="progressbar"
    class="loading-indicator"
  >
    Loading...
  </div>
</template>

<style scoped>
.loading-indicator {
  @apply absolute bottom-0 mx-auto h-1 w-screen overflow-hidden before:absolute before:-left-2/4 before:h-1 before:w-2/5 before:animate-[loading-animation_1s_linear_infinite] before:bg-amber-400 before:content-[""];
}

@keyframes loading-animation {
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
