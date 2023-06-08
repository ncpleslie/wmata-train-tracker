<script setup lang="ts">
import { useTrainStore } from "~/stores/train.store";
import AppConstants from "~/constants/app.constants";

const trainStore = useTrainStore();
const { incidents } = toRefs(trainStore);

/**
 * This will split the incident text into multiple slides if it is too long.
 */
const incidentDetails = computed(() => {
  return incidents.value.reduce(
    (acc: string[], { description }: { description: string }) => {
      if (description.length > AppConstants.maxIncidentTextLength) {
        // Split the string into multiple slides but only after a word.
        const splitStrings = description.match(
          new RegExp(
            `[\\s\\S]{1,${AppConstants.maxIncidentTextLength}}(?![\\S])`,
            "g"
          )
        );
        if (splitStrings) {
          return [...acc, ...splitStrings];
        }
      } else {
        return [...acc, description];
      }

      return acc;
    },
    []
  );
});

const onSlideEnd = () => {
  trainStore.clearIncidents();
  navigateTo("/", { replace: true });
};

onMounted(() => {
  if (trainStore.incidents.length === 0) {
    navigateTo("/", { replace: true });
  }
});
</script>

<template>
  <div class="h-screen">
    <TextCarousel @slide-end="onSlideEnd" :slides="incidentDetails">
      <div class="flex h-screen flex-col justify-between">
        <div class="checkered-background"></div>
        <p class="text-center text-9xl leading-[1.7ch] text-red-600">
          SERVICE ADVISORY
        </p>
        <div class="checkered-background"></div>
      </div>
    </TextCarousel>
  </div>
</template>

<style scoped>
.checkered-background {
  width: 100%;
  height: 133px;
  background-image: linear-gradient(
      45deg,
      #fbbf24 25%,
      transparent 25%,
      transparent 75%,
      #fbbf24 75%
    ),
    linear-gradient(
      45deg,
      #fbbf24 25%,
      transparent 25%,
      transparent 75%,
      #fbbf24 75%
    );
  background-size: 133.5px 133.5px;
  background-position: 66.5px 133px, 133px 66.5px;
}
</style>
