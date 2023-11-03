<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

const emit = defineEmits<{ (e: "onSeeIncidents"): void }>();

const seeIncidents = () => {
  emit("onSeeIncidents");
};
</script>

<template>
  <BaseButton primary class="mb-0 !py-0 px-1" @clicked="seeIncidents">
    <Icon name="tabler:alert-triangle" size="1em" class="pb-[0.1rem]" />
  </BaseButton>
</template>
