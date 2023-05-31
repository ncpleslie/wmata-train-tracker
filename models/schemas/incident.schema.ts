import { z } from "zod";

export const incidentSchema = z.object({
  DateUpdated: z.string(),
  Description: z.string(),
  IncidentID: z.string(),
  IncidentType: z.string(),
  LinesAffected: z.string(),
});

export type Incident = z.infer<typeof incidentSchema>;
