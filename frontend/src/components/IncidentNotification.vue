<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits<{ (e: "onSeeIncidents"): void }>();

const seeIncidents = () => {
  emit("onSeeIncidents");
};
</script>

<template>
  <BaseButton primary class="mb-0 !py-1 px-1" @clicked="seeIncidents">
    <Icon icon="tabler:alert-triangle" height="1em" class="pb-[0.1rem]" />
  </BaseButton>
</template>
