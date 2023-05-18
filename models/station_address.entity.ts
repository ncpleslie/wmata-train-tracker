import {
  StationAddress,
  stationAddressSchema,
} from "./schemas/station_address.schema";

export default class StationAddressEntity {
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

  public street: string;
  public city: string;
  public state: string;
  public zip: string;
}
