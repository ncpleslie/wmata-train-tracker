import ITrainService from "./interfaces/train-service.interface";
import IncidentsResponseEntity from "~/models/incidents_response.entity";
import StationsResponseEntity from "~/models/stations_response.entity";
import TrainsResponseEntity from "~/models/trains_response.entity";

export default class TrainService implements ITrainService {
  constructor(private baseUrl: string, private apiKey: string) {}

  public async getIncidents() {
    const response = await this.queryWmata("/Incidents.svc/json/Incidents");
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    return new IncidentsResponseEntity(data.Incidents);
  }

  public async getTrains(stationId: string, max = 5) {
    const response = await this.queryWmata(
      `/StationPrediction.svc/json/GetPrediction/${stationId}`
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    data.Trains = data.Trains.slice(0, max);
    return new TrainsResponseEntity(
      data.Trains.length === 0 ? [] : data.Trains
    );
  }

  public async getStations() {
    const response = await this.queryWmata("/Rail.svc/json/jStations");
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.Message);
    }

    return new StationsResponseEntity(data.Stations);
  }

  /**
   * Queries the WMATA API.
   * @param endpoint - The endpoint to query.
   * @returns - The response from the WMATA API.
   */
  private async queryWmata(endpoint: string) {
    return await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        api_key: this.apiKey,
      },
    });
  }
}
