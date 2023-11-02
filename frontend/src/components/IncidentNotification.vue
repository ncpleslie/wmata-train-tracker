<template>
  <BaseButton primary class="mb-0 !py-0 px-1" @clicked="seeIncidents">
    <Icon name="tabler:alert-triangle" size="1em" class="pb-[0.1rem]" />
  </BaseButton>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: "onSeeIncidents"): void }>();

const seeIncidents = () => {
  emit("onSeeIncidents");
};
</script>
