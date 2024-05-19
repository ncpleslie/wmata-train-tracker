import {
  IncidentsResponseEntity,
  StationEntity,
  StationsResponseEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import ITrainService from "../interfaces/train-service.interface";
import trains from "./trains.json";
import incidents from "./incidents.json";

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
    throw new Error(`Method not implemented when querying ${stationId}`);
  }

  public getStations(): Promise<StationsResponseEntity> {
    // TODO: Implement this.
    throw new Error("Method not implemented.");
  }
}
