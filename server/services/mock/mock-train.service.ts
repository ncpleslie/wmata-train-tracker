import StationsResponseEntity from "~/models/stations_response.entity";
import ITrainService from "../interfaces/train-service.interface";
import trains from "./trains.json";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class MockTrainService implements ITrainService {
  public getTrains(): Promise<TrainsResponseEntity> {
    return new Promise((resolve) => {
      resolve(new TrainsResponseEntity(trains));
    });
  }

  public getStations(): Promise<StationsResponseEntity> {
    throw new Error("Method not implemented.");
  }
}
