import {
  IncidentsResponseEntity,
  StationEntity,
  StationsResponseEntity,
  TrainsResponseEntity,
} from "@wmata-train-tracker/shared";
import ITrainService from "./interfaces/train-service.interface";

export default class TrainService implements ITrainService {
  constructor(private baseUrl: string, private apiKey: string) {}

  public async getIncidents() {
    const response = await this.queryWmata("/Incidents.svc/json/Incidents");

    return new IncidentsResponseEntity(response.Incidents);
  }

  public async getTrains(stationId: string, max = 5) {
    const response = await this.queryWmata(
      `/StationPrediction.svc/json/GetPrediction/${stationId}`
    );

    response.Trains = response.Trains.slice(0, max);
    return new TrainsResponseEntity(
      response.Trains.length === 0 ? [] : response.Trains
    );
  }

  public async getStationById(stationId: string) {
    const response = await this.queryWmata(
      `/Rail.svc/json/jStationInfo?StationCode=${stationId}`
    );

    return new StationEntity(response);
  }

  public async getStations() {
    const response = await this.queryWmata("/Rail.svc/json/jStations");

    return new StationsResponseEntity(response.Stations);
  }

  /**
   * Queries the WMATA API.
   * @param endpoint - The endpoint to query.
   * @returns - The response from the WMATA API.
   */
  private async queryWmata(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        api_key: this.apiKey,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    return data;
  }
}
