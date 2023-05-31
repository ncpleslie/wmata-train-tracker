import { Incident, incidentSchema } from "./schemas/incident.schema";

/**
 * Entity for the incident response.
 */
export default class IncidentEntity {
  /**
   * Creates an instance of IncidentEntity.
   * @param data - The incident.
   * @throws - An error if the incident is invalid.
   */
  constructor(data: Incident) {
    const result = incidentSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    this.dateUpdated = data.DateUpdated;
    this.description = data.Description;
    this.incidentId = data.IncidentID;
    this.incidentType = data.IncidentType;

    // Results are returned as a semi-colon and space separated list of line codes
    // (e.g.: RD; or BL; OR; or BL; OR; RD;).
    // WMATA have noted they may update this in the future.
    this.linesAffected = data.LinesAffected.split(/;[\s]?/).filter(Boolean);
  }

  /**
   * The date updated.
   * @example "2021-07-01T16:00:00"
   */
  public dateUpdated: string;

  /**
   * The description.
   * @example "Red Line: Expect residual delays to Glenmont due to an earlier train malfunction at Silver Spring."
   * @example "Red Line: Expect residual delays to Shady Grove due to an earlier train malfunction at Silver Spring."
   */
  public description: string;

  /**
   * The incident ID.
   * @example "2021-07-01T16:00:00"
   */
  public incidentId: string;

  /**
   * The incident type.
   * TODO: Should this be an enum?
   * @example "Delay"
   * @example "Elevator"
   * @example "Escalator"
   * @example "Service Change"
   * @example "Station Closure"
   * @example "Train Malfunction"
   * @example "Emergency Response"
   * @example "Police Action"
   * @example "Fire Department Activity"
   * @example "Medical Emergency"
   * @example "Disabled Train"
   * @example "Track Problem"
   * @example "Switch Problem"
   */
  public incidentType: string;

  /**
   * The lines affected.
   * @example ["RD"]
   * @example ["RD", "GR"]
   * @example ["RD", "GR", "BL"]
   */
  public linesAffected: string[];
}
