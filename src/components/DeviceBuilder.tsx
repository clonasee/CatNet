// Panel for purchasing and placing new devices onto the network map
// Shows available devices, their costs, and handles placement logic

import type { Device, DeviceType } from "../types";
import { DEVICE_DEFINITIONS } from "../data/devices";

interface DeviceBuilderProps {
  catnip: number;
  tier: number;
  onBuild: (type: DeviceType) => void;
}

export function DeviceBuilder({ catnip, tier, onBuild }: DeviceBuilderProps) {
  const available = DEVICE_DEFINITIONS.filter((d) => d.tier <= tier);

  return (
    <div className="device-builder">
      <h2 className="panel-title">Build Devices</h2>
      <div className="device-grid">
        {available.map((def) => {
          const canAfford = catnip >= def.baseCost;
          return (
            <button
              key={def.type}
              className={`device-card ${canAfford ? "" : "disabled"}`}
              onClick={() => canAfford && onBuild(def.type)}
              disabled={!canAfford}
            >
              <div className="device-card-type">{def.label}</div>
              <div className="device-card-desc">{def.description}</div>
              <div className="device-card-cost">
                Cost: {def.baseCost} Catnip
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
