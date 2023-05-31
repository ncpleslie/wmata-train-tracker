import IncidentsResponseEntity from "~/models/incidents_response.entity";
import StationsResponseEntity from "~/models/stations_response.entity";
import TrainsResponseEntity from "~/models/trains_response.entity";

/**
 * Interface for the train service.
 */
export default interface ITrainService {
  /**
   * Retrieves incidents from the train service.
   * @returns - The incidents response entity.
   * @throws - An error if the request fails.
   * @throws - An error if the response is invalid.
   * @see https://developer.wmata.com/docs/services/54763641281d83086473f232/operations/54763641281d830c946a3d77?
   */
  getIncidents(): Promise<IncidentsResponseEntity>;

  /**
   * Retrieves trains from the train service.
   * @param stationId - The station ID to retrieve trains for.
   * @returns - The trains response entity.
   * @throws - An error if the request fails.
   * @throws - An error if the response is invalid.
   * @see https://developer.wmata.com/docs/services/547636a6f9182302184cda78/operations/547636a6f918230da855363f
   */
  getTrains(stationId: string): Promise<TrainsResponseEntity>;

  /**
   * Retrieves stations from the train service.
   * @returns - The stations response entity.
   * @throws - An error if the request fails.
   * @throws - An error if the response is invalid.
   * @see https://developer.wmata.com/docs/services/5476364f031f590f38092507/operations/5476364f031f5909e4fe3311?
   */
  getStations(): Promise<StationsResponseEntity>;
}
