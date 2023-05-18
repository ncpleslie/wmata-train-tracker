<template>
  <div class="list-container">
    <button @click="scrollUp" :disabled="isAtTop" class="bg-white">
      Scroll Up
    </button>
    <ul class="item-list" ref="list" @scroll="handleScroll">
      <li v-for="item in visibleItems" :key="item">{{ item }}</li>
    </ul>
    <button @click="scrollDown" :disabled="isAtBottom" class="bg-white">
      Scroll Down
    </button>
  </div>
</template>

<script setup lang="ts">
interface ScrollableListProps {
  items: unknown[];
}

const props = defineProps<ScrollableListProps>();

const list = ref<string[]>([
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
  "ass",
]); // Replace with your actual list of items
const visibleItemCount = ref(10); // Number of items visible at a time
const scrollStep = ref(5); // Number of items to scroll at a time

const listRef = ref<HTMLElement | null>(null);

const scrollTop = ref(0);
const scrollHeight = ref(0);
const clientHeight = ref(0);

onMounted(() => {
  // Set initial values for scroll-related properties
  scrollTop.value = listRef.value?.scrollTop || 0;
  scrollHeight.value = listRef.value?.scrollHeight || 0;
  clientHeight.value = listRef.value?.clientHeight || 0;

  // Update scroll-related properties on resize
  window.addEventListener("resize", updateScrollProperties);
});

const updateScrollProperties = () => {
  scrollTop.value = listRef.value?.scrollTop || 0;
  scrollHeight.value = listRef.value?.scrollHeight || 0;
  clientHeight.value = listRef.value?.clientHeight || 0;
};

const scrollUp = () => {
  if (listRef.value) {
    listRef.value.scrollTop -= scrollStep.value;
    nextTick(updateScrollProperties);
  }
};

const scrollDown = () => {
  if (listRef.value) {
    listRef.value.scrollTop += scrollStep.value;
    nextTick(updateScrollProperties);
  }
};

const isAtTop = computed(() => scrollTop.value === 0);
const isAtBottom = computed(
  () => scrollTop.value + clientHeight.value >= scrollHeight.value
);

const visibleItems = computed(() => {
  const startIndex = Math.max(0, scrollTop.value - scrollStep.value);
  const endIndex = Math.min(
    list.value.length,
    startIndex + visibleItemCount.value
  );
  return list.value.slice(startIndex, endIndex);
});

const handleScroll = () => {
  scrollTop.value = listRef.value?.scrollTop || 0;
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-list {
  overflow-y: scroll;
  height: 200px; /* Set a fixed height or adjust as per your requirements */
}

button {
  margin: 8px;
}
</style>
