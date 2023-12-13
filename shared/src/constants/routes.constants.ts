export const Route = {
  Index: "/",
  Stations: "/stations",
  Incidents: "/incidents",
} as const;

type RouteKeys = keyof typeof Route;
export type RouteValues = (typeof Route)[RouteKeys];
