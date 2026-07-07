// Root application component
// Initializes game state and serves as the top level layout container

import { useGameState } from "./hooks/useGameState";

function App() {
  const { gameState, updateGameState } = useGameState();

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
        <p>Network map coming soon...</p>
      </main>
    </div>
  );
}

export default App;
