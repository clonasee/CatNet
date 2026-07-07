// TypeScript interfaces and types for CatNet game
// basically a game state contract where all the data flows through these 'shapes'

export type Tier = 1 | 2 | 3 | 4 | 5;

export type DeviceType =
  | "purrtocol-router"
  | "meowdns-server"
  | "pawwall"
  | "catnip-cloud"
  | "cat5-link"
  | "laser-cdn";

export type IncidentType =
  | "meowdns-failure"
  | "router-overload"
  | "mouseware-infection"
  | "pawwall-misconfiguration"
  | "unauthorized-dog-access"
  | "broken-cat5"
  | "catnit-cloud-crash"
  | "network-congestion"
  | "ddos-attack"
  | "catphishing-campaign";

export type Severity = "low" | "medium" | "high";

export type IncidentStatus = "active" | "resolved" | "escalating";

export interface Device {
  id: String;
  type: DeviceType;
  name: String;
  x: number;
  y: number;
  health: number;
  upgraded: boolean;
  incidentId: String | null;
}

export interface Incident {
  id: String;
  type: IncidentType;
  severity: Severity;
  status: IncidentStatus;
  deviceId: string;
  spawnedAt: number;
  resolvedAt: number | null;
  escalatesTo: IncidentType | null;
}

export interface GameState {
  version: number;
  tier: Tier;
  catnip: number;
  influence: number;
  networkHealth: number;
  devices: Device[];
  incidents: Incident[];
  resolvedCount: number;
  startedAt: number;
  lastSavedAt: number;
}
