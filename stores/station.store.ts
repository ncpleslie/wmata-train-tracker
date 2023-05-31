import { defineStore } from "pinia";
import StationEntity from "~/models/station.entity";

/**
 * Store for the station.
 */
export const useStationStore = defineStore(
  "station",
  () => {
    const selectedStation = ref<StationEntity | null>(null);
    const currentPage = ref(0);

    const setSelectedStation = (station: StationEntity) => {
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
