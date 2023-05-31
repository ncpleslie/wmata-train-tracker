import { z } from "zod";

export const trainSchema = z.object({
  Car: z.string().nullish(),
  Destination: z.string(),
  DestinationCode: z.string().nullish(),
  DestinationName: z.string(),
  Group: z.string(),
  Line: z.string(),
  LocationCode: z.string(),
  LocationName: z.string(),
  Min: z.string(),
  Seconds: z.string().nullish(),
  ServiceType: z.string().nullish(),
  TrainId: z.string().nullish(),
});

export type Train = z.infer<typeof trainSchema>;
