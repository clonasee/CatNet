// Handles creation and placement of devices on the network map
// Generates unique IDs and positions devices in a circular layout

import type { Device, DeviceType } from "../types";

function generateId(): string {
  return `device-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getNextPosition(existingDevices: Device[]): { x: number; y: number } {
  const count = existingDevices.length;
  const centerX = 400;
  const centerY = 220;
  const radius = 120;

  if (count === 0) return { x: centerX, y: centerY };

  const angle = ((count - 1) / 6) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.round(centerX + radius * Math.cos(angle)),
    y: Math.round(centerY + radius * Math.sin(angle)),
  };
}

export function createDevice(
  type: DeviceType,
  existingDevices: Device[],
): Device {
  const position = getNextPosition(existingDevices);
  return {
    id: generateId(),
    type,
    name: type,
    x: position.x,
    y: position.y,
    health: 100,
    upgraded: false,
    incidentId: null,
  };
}
