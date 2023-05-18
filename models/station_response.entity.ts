import {
  StationResponse,
  stationSchema,
} from "./schemas/station_response.schema";
import StationAddressEntity from "./station_address.entity";

export default class StationResponseEntity {
  constructor(data: StationResponse) {
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

  public code: string;
  public name: string;
  public stationTogether1: string;
  public stationTogether2: string;
  public lineCode1?: string;
  public lineCode2?: string;
  public lineCode3?: string;
  public lineCode4?: string;
  public lat: number;
  public lon: number;
  public address: object;
}
