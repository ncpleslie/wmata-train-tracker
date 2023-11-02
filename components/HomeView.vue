<script setup lang="ts">
import TrainsResponseEntity from "~/models/trains_response.entity";

interface MainViewProps {
  trainData?: TrainsResponseEntity;
  selectedStationName?: string;
  hasIncidents: boolean;
  isRefreshing: boolean;
}

defineProps<MainViewProps>();

const emit = defineEmits<{
  onLeftTap: [];
  onMiddleTap: [];
  onRightTap: [];
  onSeeIncidents: [];
}>();
</script>

<template>
  <AreaAction
    :on-left-tap="() => emit('onLeftTap')"
    :on-middle-tap="() => emit('onMiddleTap')"
    :on-right-tap="() => emit('onRightTap')"
  >
    <div v-if="trainData" class="flex h-screen flex-col justify-between">
      <TrainArrivalBoard class="trains" :trains="trainData.trains" />
      <div class="mb-2 flex flex-row items-center gap-4">
        <SublineText
          class="trains mr-auto w-1/2 truncate text-4xl text-gray-700"
        >
          {{ selectedStationName }}
        </SublineText>
        <IncidentNotification
          v-if="hasIncidents"
          @on-see-incidents="() => emit('onSeeIncidents')"
        />
        <LastUpdated
          class="trains"
          :last-updated="new Date(trainData.lastUpdated)"
        />
      </div>
    </div>
    <LoadingIndicator v-if="isRefreshing" />
  </AreaAction>
</template>

<style scoped>
.trains {
  line-height: 1.7ch;
}
</style>
