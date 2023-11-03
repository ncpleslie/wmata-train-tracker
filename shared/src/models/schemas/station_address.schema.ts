import { z } from "zod";

export const stationAddressSchema = z.object({
  Street: z.string(),
  City: z.string(),
  State: z.string(),
  Zip: z.string(),
});

export type StationAddress = z.infer<typeof stationAddressSchema>;
