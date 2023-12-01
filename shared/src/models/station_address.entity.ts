import {
  StationAddress,
  stationAddressSchema,
} from "./schemas/station_address.schema";

/**
 * Entity for the station address.
 */
export default class StationAddressEntity {
  /**
   * Creates an instance of StationAddressEntity.
   * @param data - The station address.
   * @throws - An error if the station address is invalid.
   */
  constructor(data: StationAddress) {
    const result = stationAddressSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    this.street = data.Street;
    this.city = data.City;
    this.state = data.State;
    this.zip = data.Zip;
  }

  /**
   * The street.
   * @example "607 13th St. NW"
   */
  public street: string;

  /**
   * The city.
   * @example "Washington"
   * @example "Silver Spring"
   */
  public city: string;

  /**
   * The state.
   * @example "DC"
   * @example "MD"
   */
  public state: string;

  /**
   * The zip code.
   * @example "20005"
   */
  public zip: string;
}
