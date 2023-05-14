import TrainsResponseEntity from "~/models/trains_response.entity";

export default interface ITrainService {
  getTrains(stationId: string): Promise<TrainsResponseEntity>;
}
