// Core incident spawning and resolution engine
// Controls when incidents appear, which devices they affect, and escalation logic

import type { Device, Incident, IncidentType } from "../types";
import { INCIDENT_DEFINITIONS } from "../data/incidents";

function generateId(): string {
  return `incident-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const TIER_INCIDENTS: Record<number, IncidentType[]> = {
  1: [
    "meowdns-failure",
    "router-overload",
    "mouseware-infection",
    "pawwall-misconfiguration",
    "unauthorized-dog-access",
  ],
  2: [
    "meowdns-failure",
    "router-overload",
    "mouseware-infection",
    "pawwall-misconfiguration",
    "unauthorized-dog-access",
    "broken-cat5",
    "catnip-cloud-crash",
  ],
  3: [
    "meowdns-failure",
    "router-overload",
    "mouseware-infection",
    "pawwall-misconfiguration",
    "unauthorized-dog-access",
    "broken-cat5",
    "catnip-cloud-crash",
    "network-congestion",
    "ddos-attack",
    "catphishing-campaign",
  ],
};

export function spawnIncident(
  devices: Device[],
  tier: number,
  existingIncidents: Incident[],
): Incident | null {
  const healthyDevices = devices.filter((d) => !d.incidentId);
  if (healthyDevices.length === 0) return null;

  const availableTypes = TIER_INCIDENTS[Math.min(tier, 3) as 1 | 2 | 3];
  const type =
    availableTypes[Math.floor(Math.random() * availableTypes.length)];
  const def = INCIDENT_DEFINITIONS.find((d) => d.type === type);
  if (!def) return null;

  const device =
    healthyDevices[Math.floor(Math.random() * healthyDevices.length)];

  return {
    id: generateId(),
    type,
    severity: def.severity,
    status: "active",
    deviceId: device.id,
    spawnedAt: Date.now(),
    resolvedAt: null,
    escalatesTo: def.escalatesTo,
  };
}

export function resolveIncident(
  incident: Incident,
  correct: boolean,
  devices: Device[],
  networkHealth: number,
): {
  updatedDevices: Device[];
  updatedHealth: number;
  catnipReward: number;
  influenceReward: number;
} {
  const def = INCIDENT_DEFINITIONS.find((d) => d.type === incident.type);
  if (!def)
    return {
      updatedDevices: devices,
      updatedHealth: networkHealth,
      catnipReward: 0,
      influenceReward: 0,
    };

  const updatedDevices = devices.map((d) =>
    d.id === incident.deviceId
      ? {
          ...d,
          incidentId: null,
          health: correct ? Math.min(100, d.health + 20) : d.health,
        }
      : d,
  );

  const updatedHealth = correct
    ? Math.min(100, networkHealth + 5)
    : Math.max(0, networkHealth - def.healthImpact);

  return {
    updatedDevices,
    updatedHealth,
    catnipReward: correct ? def.catnipReward : 0,
    influenceReward: correct ? def.influenceReward : 0,
  };
}
