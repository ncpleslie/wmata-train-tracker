import ITrainService from "./interfaces/train-service.interface";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class TrainService implements ITrainService {
  constructor(private baseUrl: string, private apiKey: string) {}

  public async getTrains(stationId: string) {
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

    return new TrainsResponseEntity(data.Trains);
  }
}
