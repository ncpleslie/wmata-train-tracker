<script setup lang="ts">
interface BaseButtonProps {
  primary?: boolean;
}

withDefaults(defineProps<BaseButtonProps>(), {
  primary: false,
});

const emit = defineEmits<{
  (e: "clicked"): void;
  (e: "mouseovered"): void;
}>();
</script>

<template>
  <button
    class="flex items-center justify-center rounded py-4 text-lg font-bold text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
    :class="[
      primary
        ? 'bg-amber-400 hover:bg-amber-500 focus:ring-amber-400'
        : 'bg-red-600 hover:bg-red-500 focus:ring-red-400',
    ]"
    @click="emit('clicked')"
    @mouseover="emit('mouseovered')"
  >
    <slot></slot>
  </button>
</template>
