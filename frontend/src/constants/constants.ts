export const RuntimeEvent = {
  trains: "trains",
  incidents: "incidents",
} as const;

export const RuntimeErrorEvent = {
  trains: "trains_error",
  incidents: "incidents_error",
} as const;

export const Route = {
  Index: "/",
  Stations: "/stations",
  Incidents: "/incidents",
} as const;
