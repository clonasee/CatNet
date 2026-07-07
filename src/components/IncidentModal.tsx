// Modal that appears when a player clicks a device with an active incident
// Shows incident details and fix options for the player to choose from

import type { Device, Incident } from "../types";
import { INCIDENT_DEFINITIONS } from "../data/incidents";

interface IncidentModalProps {
  device: Device;
  incident: Incident;
  onResolve: (incidentId: string, correct: boolean) => void;
  onClose: () => void;
}

export function IncidentModal({
  device,
  incident,
  onResolve,
  onClose,
}: IncidentModalProps) {
  const def = INCIDENT_DEFINITIONS.find((d) => d.type === incident.type);
  if (!def) return null;

  const severityColor = {
    low: "#00ff88",
    medium: "#ffd700",
    high: "#ff4444",
  }[incident.severity];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{def.label}</div>
            <div className="modal-subtitle">
              Device: {def.label} on {device.name}
            </div>
          </div>
          <span className="modal-severity" style={{ color: severityColor }}>
            {incident.severity.toUpperCase()}
          </span>
        </div>

        <p className="modal-description">{def.description}</p>

        <div className="modal-options">
          <div className="modal-options-label">Select the correct fix:</div>
          {def.fixOptions.map((option, i) => (
            <button
              key={i}
              className="fix-option"
              onClick={() => onResolve(incident.id, option.correct)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button className="modal-close" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
