import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    WMATA_API_KEY: z.string().min(1),
    BASE_WMATA_URL: z.string().url(),
    USE_MOCK_TRAIN_SERVICE: z.coerce.boolean().default(false),
  },
  client: {},
});
