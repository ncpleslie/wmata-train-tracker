<script setup lang="ts">
import { useGetTrains } from "~/composables/use_train.composable";
import { useStationStore } from "~/stores/station.store";
import { route } from "~/types/route.type";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const stationStore = useStationStore();

const refreshInterval = ref<NodeJS.Timer>();

const { data, error, refresh, pending: isRefreshing } = useGetTrains();

const routeOnAreaTap = async (route: route) => {
  await router.push(route);
};

onMounted(() => {
  refreshInterval.value = setInterval(() => {
    refresh();
  }, runtimeConfig.public.refreshInMs);
});

onUnmounted(() => {
  if (!refreshInterval.value) {
    return;
  }
  clearInterval(refreshInterval.value);
});
</script>

<template>
  <div>
    <AreaAction
      :on-middle-tap="refresh"
      :on-right-tap="() => routeOnAreaTap('stations')"
    >
      <div v-if="data" class="flex h-screen flex-col justify-between">
        <TrainArrivalBoard class="trains" :trains="data.trains" />
        <div class="mb-2 flex flex-row">
          <SublineText
            class="trains mr-auto w-1/2 truncate text-4xl text-gray-700"
          >
            {{ stationStore.selectedStation?.name }}
          </SublineText>
          <ClientOnly>
            <LastUpdated
              class="trains ml-auto"
              :last-updated="new Date(data.lastUpdated)"
            />
          </ClientOnly>
        </div>
      </div>
      <LoadingIndicator v-if="isRefreshing" />
    </AreaAction>
    <ErrorPopup
      :open="(!isRefreshing && !data) || Boolean(error)"
      @on-close="refresh"
    >
      <template #error-message>
        Something went wrong while trying to refresh
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
