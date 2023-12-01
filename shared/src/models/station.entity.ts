import { Station, stationSchema } from "./schemas/station.schema";
import StationAddressEntity from "./station_address.entity";

/**
 * Entity for the station response.
 */
export default class StationEntity {
  /**
   * Creates an instance of StationEntity.
   * @param data - The station.
   * @throws - An error if the station is invalid.
   */
  constructor(data: Station) {
    const result = stationSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    this.code = data.Code;
    this.name = data.Name;
    this.stationTogether1 = data.StationTogether1;
    this.stationTogether2 = data.StationTogether2;
    this.lineCode1 = data.LineCode1 ?? undefined;
    this.lineCode2 = data.LineCode2 ?? undefined;
    this.lineCode3 = data.LineCode3 ?? undefined;
    this.lineCode4 = data.LineCode4 ?? undefined;
    this.lat = data.Lat;
    this.lon = data.Lon;
    this.address = new StationAddressEntity(data.Address);
  }

  /**
   * The station code.
   * @example "A01"
   * @example "A02"
   */
  public code: string;

  /**
   * The station name.
   * @example "Metro Center"
   * @example "Farragut North"
   */
  public name: string;

  /**
   * The station code for the first station that shares the same physical location.
   * @example "C01"
   * @example "A01"
   * @example "B01"
   */
  public stationTogether1: string;

  /**
   * The station code for the second station that shares the same physical location.
   * @example "C02"
   * @example "A02"
   * @example "B02"
   */
  public stationTogether2: string;

  /**
   * The line code for the first line at this station.
   * @example "RD"
   * @example "BL"
   * @example "OR"
   */
  public lineCode1?: string;

  /**
   * The line code for the second line at this station.
   * @example "RD"
   */
  public lineCode2?: string;

  /**
   * The line code for the third line at this station.
   * @example "RD"
   */
  public lineCode3?: string;

  /**
   * The line code for the fourth line at this station.
   * @example "RD"
   */
  public lineCode4?: string;

  /**
   * The latitude of the station.
   * @example 38.898303
   */
  public lat: number;

  /**
   * The longitude of the station.
   * @example -77.028099
   */
  public lon: number;

  /**
   * The address of the station.
   * @example { Street: "607 13th St. NW", City: "Washington", State: "DC", Zip: "20005" }
   */
  public address: StationAddressEntity;
}
