import { Station } from "./schemas/station.schema";
import StationEntity from "./station.entity";

/**
 * Entity for the stations response.
 */
export default class StationsResponseEntity {
  /**
   * Creates an instance of StationsResponseEntity.
   * @param stations - The stations.
   * @throws - An error if the stations are invalid.
   */
  constructor(stations: Station[]) {
    this.stations = stations
      .map((station) => new StationEntity(station))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * The stations.
   */
  public stations: StationEntity[];
}
