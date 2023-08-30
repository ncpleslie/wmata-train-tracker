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
    (acc: string[], { description, linesAffected }) => {
      const affected =
        linesAffected.length > 0
          ? `Affected Lines: ${linesAffected.join(" ")}`
          : "";
      if (description.length > AppConstants.maxIncidentTextLength) {
        // Split the string into multiple slides but only after a word.
        const splitStrings = description.match(
          new RegExp(
            `[\\s\\S]{1,${AppConstants.maxIncidentTextLength}}(?![\\S])`,
            "g"
          )
        );
        if (splitStrings) {
          splitStrings[splitStrings.length - 1] = `${
            splitStrings[splitStrings.length - 1]
          } ${affected}`;
          return [...acc, ...splitStrings];
        }
      } else {
        return [...acc, `${description} ${affected} `];
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
    <div class="flex h-screen flex-col justify-between gap-8">
      <div class="checkered-background"></div>
      <h1 class="text-center text-7xl leading-[1.7ch] text-red-600">
        SERVICE ADVISORY
      </h1>
      <TextCarousel :slides="incidentDetails" @slide-end="onSlideEnd" />
      <div class="checkered-background"></div>
    </div>
  </div>
</template>

<style scoped>
.checkered-background {
  width: 100%;
  height: 50px;
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
  background-size: 50px 50px;
  background-position: 25px 50px, 50px 25px;
}
</style>
