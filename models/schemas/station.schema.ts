import { z } from "zod";

export const stationSchema = z.object({
  Code: z.string(),
  Name: z.string(),
  StationTogether1: z.string(),
  StationTogether2: z.string(),
  LineCode1: z.string().nullish(),
  LineCode2: z.string().nullish(),
  LineCode3: z.string().nullish(),
  LineCode4: z.string().nullish(),
  Lat: z.number(),
  Lon: z.number(),
  Address: z.object({
    Street: z.string(),
    City: z.string(),
    State: z.string(),
    Zip: z.string(),
  }),
});

export type Station = z.infer<typeof stationSchema>;
