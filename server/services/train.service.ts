import ITrainService from "./interfaces/train-service.interface";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class TrainService implements ITrainService {
  constructor(private baseUrl: string, private apiKey: string) {}

  public async getTrains(stationId: string, max = 5) {
    const response = await fetch(
      `${this.baseUrl}/StationPrediction.svc/json/GetPrediction/${stationId}`,
      {
        headers: {
          api_key: this.apiKey,
        },
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    data.Trains = data.Trains.slice(0, max);
    return new TrainsResponseEntity(data.Trains);
  }
}
