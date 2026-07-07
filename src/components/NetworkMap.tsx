// SVG-based interactive network map where devices are placed and visualized
// Handles rendering devices, connections between them, and click interactions

import type { Device } from "../types";
import { DEVICE_DEFINITIONS } from "../data/devices";

interface NetworkMapProps {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
}

const DEVICE_LABELS: Record<string, string> = {
  "purrtocol-router": "RTR",
  "meowdns-server": "DNS",
  pawwall: "FW",
  "catnip-cloud": "CLD",
  "cat5-link": "LNK",
  "laser-cdn": "CDN",
};

function getDeviceColor(device: Device): string {
  if (device.health > 66) return "#00ff88";
  if (device.health > 33) return "#ffd700";
  return "#ff4444";
}

export function NetworkMap({ devices, onDeviceClick }: NetworkMapProps) {
  return (
    <div className="network-map-container">
      <svg
        className="network-map"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#1a1a3a"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#grid)" />

        {/* Connection lines between devices */}
        {devices.map((device, i) =>
          devices
            .slice(i + 1)
            .map((other) => (
              <line
                key={`${device.id}-${other.id}`}
                x1={device.x}
                y1={device.y}
                x2={other.x}
                y2={other.y}
                stroke="#2a2a4a"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
            )),
        )}

        {/* Device nodes */}
        {devices.map((device) => {
          const color = getDeviceColor(device);
          const def = DEVICE_DEFINITIONS.find((d) => d.type === device.type);
          return (
            <g
              key={device.id}
              onClick={() => onDeviceClick(device)}
              style={{ cursor: "pointer" }}
            >
              {/* Glow ring */}
              <circle
                cx={device.x}
                cy={device.y}
                r={32}
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity="0.3"
              />
              {/* Device circle */}
              <circle
                cx={device.x}
                cy={device.y}
                r={26}
                fill="#16213e"
                stroke={color}
                strokeWidth="2"
              />
              {/* Incident indicator dot */}
              {device.incidentId && (
                <circle
                  cx={device.x + 19}
                  cy={device.y - 19}
                  r={7}
                  fill="#ff4444"
                />
              )}
              {/* Device type abbreviation */}
              <text
                x={device.x}
                y={device.y + 6}
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill={color}
                fontFamily="Courier New, monospace"
              >
                {DEVICE_LABELS[device.type] ?? "DEV"}
              </text>
              {/* Device name label */}
              <text
                x={device.x}
                y={device.y + 48}
                textAnchor="middle"
                fontSize="11"
                fill="#888"
                fontFamily="Courier New, monospace"
              >
                {def?.label ?? device.name}
              </text>
            </g>
          );
        })}

        {/* Empty state */}
        {devices.length === 0 && (
          <text
            x="400"
            y="250"
            textAnchor="middle"
            fontSize="14"
            fill="#444"
            fontFamily="Courier New, monospace"
          >
            No devices yet — build your first node below
          </text>
        )}
      </svg>
    </div>
  );
}
