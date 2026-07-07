// Root application component
// Initializes game state and serves as the top level layout container

import { useGameState } from "./hooks/useGameState";
import { NetworkMap } from "./components/NetworkMap";
import type { Device } from "./types";

function App() {
  const { gameState } = useGameState();

  function handleDeviceClick(device: Device) {
    console.log("clicked device:", device);
  }

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
      </main>
    </div>
  );
}

export default App;
