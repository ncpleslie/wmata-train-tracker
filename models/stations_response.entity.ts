import { StationResponse } from "./schemas/station_response.schema";
import StationResponseEntity from "./station_response.entity";

export default class StationsResponseEntity {
  constructor(stations: StationResponse[]) {
    this.stations = stations
      .map((station) => new StationResponseEntity(station))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  public stations: StationResponseEntity[];
}
