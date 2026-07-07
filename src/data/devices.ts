// Static definition data for all device types
// These are placeholders so actual placed devices are in GameState

import type { DeviceType } from "../types";

export interface DeviceDefinition {
  type: DeviceType;
  label: string;
  description: string;
  baseCost: number;
  upgradeCost: number;
  tier: number;
}

export const DEVICE_DEFINITIONS: DeviceDefinition[] = [
  {
    type: "purrtocol-router",
    label: "Purrtocol Router",
    description: "Directs traffic between nodes in the cat network.",
    baseCost: 50,
    upgradeCost: 100,
    tier: 1,
  },
  {
    type: "meowdns-server",
    label: "MeowDNS Server",
    description: "Resolves device names so cats can find each other.",
    baseCost: 75,
    upgradeCost: 150,
    tier: 1,
  },
  {
    type: "pawwall",
    label: "Pawwall",
    description: "Monitors and filters traffic to keep dogs out.",
    baseCost: 100,
    upgradeCost: 200,
    tier: 1,
  },
  {
    type: "catnip-cloud",
    label: "Catnip Cloud Server",
    description: "Hosts applications and generates passive catnip income.",
    baseCost: 200,
    upgradeCost: 400,
    tier: 2,
  },
  {
    type: "cat5-link",
    label: "Cat-5 Link",
    description: "Physical connection between two network nodes.",
    baseCost: 25,
    upgradeCost: 75,
    tier: 2,
  },
  {
    type: "laser-cdn",
    label: "Laser Pointer CDN",
    description: "Distributes content across the network to reduce latency.",
    baseCost: 300,
    upgradeCost: 500,
    tier: 3,
  },
];
