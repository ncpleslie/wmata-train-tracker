export const RuntimeEvent = {
  started: "started",
  trains: "trains",
  incidents: "incidents",
} as const;

export const RuntimeErrorEvent = {
  trains: "trains_error",
  incidents: "incidents_error",
} as const;
