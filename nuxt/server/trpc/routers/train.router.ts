import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const trainRouter = router({
  getIncidents: publicProcedure.query(async ({ ctx }) => {
    return await ctx.trainService.getIncidents();
  }),
  getTrains: publicProcedure
    .input(
      z.object({
        stationId: z.string().length(3).default("E03"),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.trainService.getTrains(input.stationId);
    }),
  getStations: publicProcedure.query(async ({ ctx }) => {
    return await ctx.trainService.getStations();
  }),
  getStationById: publicProcedure
    .input(
      z.object({
        stationId: z.string().length(3),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.trainService.getStationById(input.stationId);
    }),
});
