import StationsResponseEntity from "~/models/stations_response.entity";
import ITrainService from "./interfaces/train-service.interface";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class TrainService implements ITrainService {
  constructor(private baseUrl: string, private apiKey: string) {}

  public async getTrains(stationId: string, max = 5) {
    const response = await this.queryWmata(
      `/StationPrediction.svc/json/GetPrediction/${stationId}`
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    data.Trains = data.Trains.slice(0, max);
    return new TrainsResponseEntity(data.Trains);
  }

  public async getStations() {
    const response = await this.queryWmata("/Rail.svc/json/jStations");
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    return new StationsResponseEntity(data.Stations);
  }

  private async queryWmata(endpoint: string) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        api_key: this.apiKey,
      },
    });
  }
}
