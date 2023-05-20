import { defineStore } from "pinia";
import StationResponseEntity from "~/models/station_response.entity";

export const useStationStore = defineStore(
  "station",
  () => {
    const selectedStation = ref<StationResponseEntity | null>(null);
    const currentPage = ref(0);

    const setSelectedStation = (station: StationResponseEntity) => {
      selectedStation.value = station;
    };

    return {
      currentPage,
      selectedStation,
      setSelectedStation,
    };
  },
  {
    persist: true,
  }
);
