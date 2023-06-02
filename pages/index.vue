<script setup lang="ts">
import { useGetTrains } from "~/composables/use_train.composable";
import { useStationStore } from "~/stores/station.store";
import { route } from "~/types/route.type";
import AppConstants from "~/constants/app.constants";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const stationStore = useStationStore();
const {
  data: trainData,
  error: trainError,
  refresh: refreshTrains,
  pending: trainIsRefreshing,
} = useGetTrains();
// const { data: incidentData, refresh: refreshIncidents } = useGetIncidents();

useMountedInterval(refreshTrains, runtimeConfig.public.refreshInMs);
// useMountedInterval(refreshIncidents, runtimeConfig.public.incidentRefreshInMs);

const routeOnAreaTap = async (route: route) => {
  await router.push(route);
};
</script>

<template>
  <div>
    <MinSizeWarning :min-width="AppConstants.minScreenSize" class="trains">
      <AreaAction
        :on-middle-tap="refreshTrains"
        :on-right-tap="() => routeOnAreaTap('stations')"
      >
        <div v-if="trainData" class="flex h-screen flex-col justify-between">
          <TrainArrivalBoard class="trains" :trains="trainData.trains" />
          <div class="mb-2 flex flex-row">
            <SublineText
              class="trains mr-auto w-1/2 truncate text-4xl text-gray-700"
            >
              {{ stationStore.selectedStation?.name }}
            </SublineText>
            <ClientOnly>
              <LastUpdated
                class="trains ml-auto"
                :last-updated="new Date(trainData.lastUpdated)"
              />
            </ClientOnly>
          </div>
        </div>
        <LoadingIndicator v-if="trainIsRefreshing" />
      </AreaAction>
    </MinSizeWarning>
    <ErrorPopup
      :open="(!trainIsRefreshing && !trainData) || Boolean(trainError?.message)"
      @on-close="refreshTrains"
    >
      <template #error-message>
        Something went wrong while attempting to refresh
      </template>
      <template #close-message>Try again?</template>
    </ErrorPopup>
  </div>
</template>

<style scoped>
.trains {
  font-family: "VT323", "Raleway Dots", Roboto, monospace;
  line-height: 1.7ch;
}
</style>
