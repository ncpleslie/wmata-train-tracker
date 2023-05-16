<script setup lang="ts">
interface LastUpdatedProps {
  lastUpdated: Date;
}

const props = defineProps<LastUpdatedProps>();

const lastUpdatedLocale = computed(() =>
  props.lastUpdated.toLocaleTimeString()
);
</script>

<template>
  <p class="text-4xl text-gray-700">Updated: {{ lastUpdatedLocale }}</p>
</template>
