import { TrainResponse } from "./schemas/train_response.schema";
import TrainResponseEntity from "./train_response.entity";

export default class TrainsResponseEntity {
  constructor(data: TrainResponse[]) {
    this.trains = data.map((train) => new TrainResponseEntity(train));
  }

  public trains: TrainResponseEntity[];
  public lastUpdated = new Date();
}
