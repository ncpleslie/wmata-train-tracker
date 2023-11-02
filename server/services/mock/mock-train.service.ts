import ITrainService from "../interfaces/train-service.interface";
import trains from "./trains.json";
import incidents from "./incidents.json";
import IncidentsResponseEntity from "~/models/incidents_response.entity";
import StationsResponseEntity from "~/models/stations_response.entity";
import TrainsResponseEntity from "~/models/trains_response.entity";
import StationEntity from "~/models/station.entity";

export default class MockTrainService implements ITrainService {
  public getIncidents(): Promise<IncidentsResponseEntity> {
    return new Promise((resolve) => {
      resolve(new IncidentsResponseEntity(incidents));
    });
  }

  public getTrains(): Promise<TrainsResponseEntity> {
    return new Promise((resolve) => {
      resolve(new TrainsResponseEntity(trains));
    });
  }

  public getStationById(stationId: string): Promise<StationEntity> {
    // TODO: Implement this.
    throw new Error("Method not implemented.");
  }

  public getStations(): Promise<StationsResponseEntity> {
    // TODO: Implement this.
    throw new Error("Method not implemented.");
  }
}
