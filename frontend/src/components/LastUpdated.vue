<script setup lang="ts">
import SublineText from "@/components/SublineText.vue";

interface LastUpdatedProps {
  lastUpdated: Date;
}

const props = defineProps<LastUpdatedProps>();

const lastUpdatedLocale = computed(() =>
  props.lastUpdated.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
);
</script>

<template>
  <SublineText class="text-4xl text-gray-700"
    >Updated: {{ lastUpdatedLocale }}</SublineText
  >
</template>
