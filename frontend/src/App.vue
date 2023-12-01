<script setup lang="ts">
import { Close } from "@wails/go/app/App";
import { useRuntime } from "@/composables/runtime";
import { RuntimeEvent } from "@/constants/constants";
import BootView from "@/components/BootView.vue";
import DraggableDiv from "@/components/DraggableDiv.vue";

const { eventOn } = useRuntime();

const started = ref(false);

eventOn(RuntimeEvent.started, () => (started.value = true));

const onClose = (e: KeyboardEvent) => {
  if (e.key === "q") {
    Close();
  }
};

onMounted(() => {
  document.addEventListener("keyup", onClose);
});

onUnmounted(() => {
  document.removeEventListener("keyup", onClose);
});
</script>

<template>
  <main class="h-screen overflow-x-hidden overflow-y-hidden bg-black">
    <DraggableDiv />
    <BootView v-if="!started" />
    <router-view v-else />
  </main>
</template>

<style scoped>
main {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
}
</style>
