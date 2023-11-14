<script setup lang="ts">
import {
  TrainsResponseEntity,
  AppConstants,
} from "@wmata-train-tracker/shared";
import MinSizeWarning from "@/components/MinSizeWarning.vue";
import AreaAction from "@/components/AreaAction.vue";
import SublineText from "@/components/SublineText.vue";
import TrainArrivalBoard from "@/components/TrainArrivalBoard.vue";
import IncidentNotification from "@/components/IncidentNotification.vue";
import LastUpdated from "@/components/LastUpdated.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

interface HomeViewProps {
  trainData?: TrainsResponseEntity;
  selectedStationName?: string;
  hasIncidents: boolean;
  isRefreshing: boolean;
}

defineProps<HomeViewProps>();

const emit = defineEmits<{
  onLeftTap: [];
  onMiddleTap: [];
  onRightTap: [];
  onSeeIncidents: [];
}>();
</script>

<template>
  <MinSizeWarning :min-width="AppConstants.minScreenSize" class="trains">
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
  </MinSizeWarning>
</template>

<style scoped>
.trains {
  line-height: 1.7ch;
}
</style>
