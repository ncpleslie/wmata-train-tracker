import IncidentEntity from "./incident.entity";
import IncidentsResponseEntity from "./incidents_response.entity";
import StationAddressEntity from "./station_address.entity";
import StationEntity from "./station.entity";
import StationsResponseEntity from "./stations_response.entity";
import TrainEntity from "./train.entity";
import TrainsResponseEntity from "./trains_response.entity";

import { Incident } from "./schemas/incident.schema";
import { StationAddress } from "./schemas/station_address.schema";
import { Station } from "./schemas/station.schema";
import { Train } from "./schemas/train.schema";

export {
  IncidentEntity,
  IncidentsResponseEntity,
  StationAddressEntity,
  StationEntity,
  StationsResponseEntity,
  TrainEntity,
  TrainsResponseEntity,
};

export type { Incident, StationAddress, Station, Train };
