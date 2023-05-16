import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const trainRouter = router({
  getTrains: publicProcedure
    .input(
      z.object({
        stationId: z.string().length(3).default("B03"),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.trainService.getTrains(input.stationId);
    }),
});