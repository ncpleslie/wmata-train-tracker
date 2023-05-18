import StationsResponseEntity from "~/models/stations_response.entity";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default interface ITrainService {
  getTrains(stationId: string): Promise<TrainsResponseEntity>;
  getStations(): Promise<StationsResponseEntity>;
}
