import { Train, trainSchema } from "./schemas/train.schema";

/**
 * Entity for the train response.
 */
export default class TrainEntity {
  /**
   * Creates an instance of TrainEntity.
   * @param data - The train.
   * @param index - Position in the arrival list, appended to trainId for uniqueness.
   * @throws - An error if the train is invalid.
   */
  constructor(data: Train, index: number) {
    const result = trainSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    this.car = data.Car ?? undefined;
    this.destination = data.Destination;
    this.destinationCode = data.DestinationCode ?? undefined;
    this.destinationName = data.DestinationName;
    this.group = data.Group;
    this.line = data.Line;
    this.locationCode = data.LocationCode;
    this.locationName = data.LocationName;
    this.min = data.Min;
    this.seconds = data.Seconds ?? undefined;
    this.serviceType = data.ServiceType ?? undefined;
    this.trainId = `${
      data.TrainId ??
      `${this.line}-${this.car}-${
        this.locationCode
      }-${this.destination.replaceAll(" ", "_")}-${this.group}`
    }-${index}`;
  }

  /**
   * The car number.
   * @example "B03"
   */
  public car?: string;

  /**
   * The destination.
   * @example "Shady Grove"
   * @example "Glenmont"
   * @example "Silver Spring"
   */
  public destination: string;

  /**
   * The destination code.
   * @example "B11"
   * @example "A15"
   */
  public destinationCode?: string;

  /**
   * The destination name.
   * @example "Shady Grove"
   * @example "Glenmont"
   */
  public destinationName: string;

  /**
   * The group.
   * @example "1"
   */
  public group: string;

  /**
   * The two letter line name.
   * @example "RD"
   * @example "YL"
   */
  public line: string;

  /**
   * The location code.
   * @example "A01"
   * @example "B11"
   */
  public locationCode: string;

  /**
   * The location name.
   * @example "Metro Center"
   * @example "Shady Grove"
   */
  public locationName: string;

  /**
   * The minutes until arrival.
   * @example "BRD"
   * @example "1"
   * @example "ARR"
   * @example "12"
   */
  public min: string;

  /**
   * The seconds until arrival.
   * @example "BRD"
   * @example "1"
   * @example "ARR"
   */
  public seconds?: string;

  /**
   * The service type.
   * TODO: Should this be an enum?
   * @example "Normal"
   * @example "Rush"
   * @example "Unknown"
   * @example "Special"
   */
  public serviceType?: string;

  /**
   * The train ID. Uses TrainId from the API when present, otherwise a generated
   * fallback, with the list index appended to keep each row unique.
   * @example "101-0"
   * @example "RD-6-A01-Glenmont-1-2"
   */
  public trainId?: string;
}
