import { defineStore } from "pinia";
import IncidentEntity from "~/models/incident.entity";
import StationEntity from "~/models/station.entity";

/**
 * Store for the app.
 */
export const useTrainStore = defineStore(
  "train",
  () => {
    const selectedStation = ref<StationEntity | null>(null);
    const currentPage = ref(0);
    const incidents = ref<IncidentEntity[]>([]);

    const setSelectedStation = (station: StationEntity) => {
      selectedStation.value = station;
    };

    const setIncidents = (newIncidents: IncidentEntity[]) => {
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
