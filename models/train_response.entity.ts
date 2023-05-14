import { TrainResponse, trainSchema } from "./schemas/train_response.schema";

export default class TrainResponseEntity {
  constructor(data: TrainResponse) {
    const result = trainSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    this.car = data.Car;
    this.destination = data.Destination;
    this.destinationCode = data.DestinationCode;
    this.destinationName = data.DestinationName;
    this.group = data.Group;
    this.line = data.Line;
    this.locationCode = data.LocationCode;
    this.locationName = data.LocationName;
    this.min = data.Min;
    this.seconds = data.Seconds ?? undefined;
    this.serviceType = data.ServiceType ?? undefined;
    this.trainId = data.TrainId ?? undefined;
  }

  public car: string;
  public destination: string;
  public destinationCode: string;
  public destinationName: string;
  public group: string;
  public line: string;
  public locationCode: string;
  public locationName: string;
  public min: string;
  public seconds?: string;
  public serviceType?: string;
  public trainId?: string;
}
