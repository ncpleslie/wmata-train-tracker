import IncidentEntity from "./incident.entity";
import { Incident } from "./schemas/incident.schema";

/**
 * Entity for the incidents response.
 */
export default class IncidentsResponseEntity {
  /**
   * Creates an instance of IncidentsResponseEntity.
   * @param data - The incidents.
   */
  constructor(data: Incident[]) {
    this.incidents = data.map((incident) => new IncidentEntity(incident));
  }

  /**
   * The incidents.
   */
  public incidents: IncidentEntity[];
}
