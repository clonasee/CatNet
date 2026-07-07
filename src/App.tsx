// Root application component
// Manages the core game loop — device building, incident spawning, and resolution

import { useState, useEffect, useCallback } from "react";
import { useGameState } from "./hooks/useGameState";
import { NetworkMap } from "./components/NetworkMap";
import { DeviceBuilder } from "./components/DeviceBuilder";
import { IncidentModal } from "./components/IncidentModal";
import { FeedbackModal } from "./components/FeedbackModal";
import { createDevice } from "./game/deviceManager";
import { spawnIncident, resolveIncident } from "./game/incidentEngine";
import { INCIDENT_DEFINITIONS } from "./data/incidents";
import type { Device, DeviceType, Incident } from "./types";

interface FeedbackState {
  correct: boolean;
  feedback: string;
  catnipReward: number;
  influenceReward: number;
}

function App() {
  const { gameState, updateGameState } = useGameState();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // Spawn incidents on a timer
  useEffect(() => {
    if (gameState.devices.length === 0) return;
    const interval = setInterval(() => {
      const incident = spawnIncident(
        gameState.devices,
        gameState.tier,
        gameState.incidents,
      );
      if (!incident) return;
      const updatedDevices = gameState.devices.map((d) =>
        d.id === incident.deviceId ? { ...d, incidentId: incident.id } : d,
      );
      updateGameState({
        incidents: [...gameState.incidents, incident],
        devices: updatedDevices,
        networkHealth: Math.max(0, gameState.networkHealth - 5),
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [
    gameState.devices,
    gameState.incidents,
    gameState.tier,
    gameState.networkHealth,
  ]);

  // Passive catnip income
  useEffect(() => {
    const interval = setInterval(() => {
      updateGameState({ catnip: gameState.catnip + 10 });
    }, 10000);
    return () => clearInterval(interval);
  }, [gameState.catnip]);

  // Tier progression
  useEffect(() => {
    const thresholds: Record<number, number> = { 1: 100, 2: 300, 3: 600 };
    const nextTier = (gameState.tier + 1) as 2 | 3 | 4 | 5;
    if (
      nextTier <= 5 &&
      gameState.influence >= (thresholds[gameState.tier] ?? Infinity)
    ) {
      updateGameState({ tier: nextTier });
    }
  }, [gameState.influence, gameState.tier]);

  const handleBuild = useCallback(
    (type: DeviceType) => {
      const def = { baseCost: 50 };
      const costs: Record<string, number> = {
        "purrtocol-router": 50,
        "meowdns-server": 75,
        pawwall: 100,
        "catnip-cloud": 200,
        "cat5-link": 25,
        "laser-cdn": 300,
      };
      const cost = costs[type] ?? 50;
      if (gameState.catnip < cost) return;
      const newDevice = createDevice(type, gameState.devices);
      updateGameState({
        devices: [...gameState.devices, newDevice],
        catnip: gameState.catnip - cost,
      });
    },
    [gameState.devices, gameState.catnip],
  );

  const handleDeviceClick = useCallback(
    (device: Device) => {
      if (!device.incidentId) return;
      const incident = gameState.incidents.find(
        (i) => i.id === device.incidentId && i.status === "active",
      );
      if (!incident) return;
      setSelectedDevice(device);
      setActiveIncident(incident);
    },
    [gameState.incidents],
  );

  const handleResolve = useCallback(
    (incidentId: string, correct: boolean) => {
      const incident = gameState.incidents.find((i) => i.id === incidentId);
      if (!incident) return;
      const def = INCIDENT_DEFINITIONS.find((d) => d.type === incident.type);
      const chosenOption = def?.fixOptions.find((o) => o.correct === correct);

      const { updatedDevices, updatedHealth, catnipReward, influenceReward } =
        resolveIncident(
          incident,
          correct,
          gameState.devices,
          gameState.networkHealth,
        );

      const updatedIncidents = gameState.incidents.map((i) =>
        i.id === incidentId
          ? { ...i, status: "resolved" as const, resolvedAt: Date.now() }
          : i,
      );

      updateGameState({
        devices: updatedDevices,
        incidents: updatedIncidents,
        networkHealth: updatedHealth,
        catnip: gameState.catnip + catnipReward,
        influence: gameState.influence + influenceReward,
        resolvedCount: gameState.resolvedCount + (correct ? 1 : 0),
      });

      setSelectedDevice(null);
      setActiveIncident(null);
      setFeedback({
        correct,
        feedback: chosenOption?.feedback ?? "",
        catnipReward,
        influenceReward,
      });
    },
    [gameState],
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>CatNet</h1>
        <div className="app-resources">
          <span>Catnip: {gameState.catnip}</span>
          <span>Influence: {gameState.influence}</span>
          <span>Network Health: {gameState.networkHealth}%</span>
          <span>Tier: {gameState.tier}</span>
        </div>
      </header>
      <main className="app-main">
        <NetworkMap
          devices={gameState.devices}
          onDeviceClick={handleDeviceClick}
        />
        <DeviceBuilder
          catnip={gameState.catnip}
          tier={gameState.tier}
          onBuild={handleBuild}
        />
      </main>

      {selectedDevice && activeIncident && (
        <IncidentModal
          device={selectedDevice}
          incident={activeIncident}
          onResolve={handleResolve}
          onClose={() => {
            setSelectedDevice(null);
            setActiveIncident(null);
          }}
        />
      )}

      {feedback && (
        <FeedbackModal
          correct={feedback.correct}
          feedback={feedback.feedback}
          catnipReward={feedback.catnipReward}
          influenceReward={feedback.influenceReward}
          onClose={() => setFeedback(null)}
        />
      )}
    </div>
  );
}

export default App;
