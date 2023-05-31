import ITrainService from "../interfaces/train-service.interface";
import trains from "./trains.json";
import IncidentsResponseEntity from "~/models/incidents_response.entity";
import StationsResponseEntity from "~/models/stations_response.entity";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class MockTrainService implements ITrainService {
  public getIncidents(): Promise<IncidentsResponseEntity> {
    // TODO: Implement this.
    throw new Error("Method not implemented.");
  }

  public getTrains(): Promise<TrainsResponseEntity> {
    return new Promise((resolve) => {
      resolve(new TrainsResponseEntity(trains));
    });
  }

  public getStations(): Promise<StationsResponseEntity> {
    // TODO: Implement this.
    throw new Error("Method not implemented.");
  }
}
