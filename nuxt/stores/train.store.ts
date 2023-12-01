import { defineStore } from "pinia";
import { IncidentEntity, StationEntity } from "@wmata-train-tracker/shared";

/**
 * Store for the app.
 */
export const useTrainStore = defineStore(
  "train",
  () => {
    const selectedStation = ref<StationEntity>();
    const currentPage = ref(0);
    const incidents = ref<IncidentEntity[]>([]);

    const setSelectedStation = (station: StationEntity) => {
      selectedStation.value = station;
    };

    const setIncidents = (newIncidents?: IncidentEntity[]) => {
      if (!newIncidents || newIncidents.length === 0) {
        incidents.value = [];

        return;
      }

      incidents.value = newIncidents;
    };

    const clearIncidents = () => {
      incidents.value = [];
    };

    return {
      currentPage,
      selectedStation,
      incidents,
      clearIncidents,
      setSelectedStation,
      setIncidents,
    };
  },
  {
    persist: true,
  }
);
