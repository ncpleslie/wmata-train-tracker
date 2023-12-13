<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import BaseButton from "./BaseButton.vue";

interface ErrorPopupProps {
  open: boolean;
}

const props = defineProps<ErrorPopupProps>();
const emit = defineEmits<{ (e: "onClose"): void }>();

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
  emit("onClose");
};

watch(
  () => props.open,
  () => (isOpen.value = props.open),
  { immediate: true }
);
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>

      <div
        class="fixed inset-6 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center md:inset-28"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded bg-white p-4 text-left align-middle transition-all"
          >
            <DialogTitle
              as="h3"
              class="mb-4 text-center text-lg font-medium leading-6 text-gray-900"
            >
              <slot name="error-message"></slot>
            </DialogTitle>

            <BaseButton class="w-full" @clicked="closeModal">
              <slot name="close-message"></slot>
            </BaseButton>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
