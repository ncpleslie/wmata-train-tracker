import { Train } from "./schemas/train.schema";
import TrainEntity from "./train.entity";

/**
 * Entity for the trains response.
 * @property trains - The trains.
 * @see TrainEntity
 * @see Train
 * @see TrainSchema
 * @property lastUpdated - The last time the trains were updated.
 */
export default class TrainsResponseEntity {
  /**
   * Creates an instance of TrainsResponseEntity.
   * @param data - The trains.
   */
  constructor(data: Train[]) {
    this.trains = data.map((train) => new TrainEntity(train));
  }

  /**
   * The trains.
   */
  public trains: TrainEntity[];

  /**
   * The last time the trains were updated.
   */
  public lastUpdated = new Date();
}
