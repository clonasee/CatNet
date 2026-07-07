// Game over screen displayed when network health drops to 0%
// Shows final stats and allows the player to start a new game

import type { GameState } from "../types";

interface GameOverScreenProps {
  gameState: GameState;
  onReset: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function GameOverScreen({ gameState, onReset }: GameOverScreenProps) {
  const elapsed = Date.now() - gameState.startedAt;

  return (
    <div className="win-overlay">
      <div className="win-screen game-over-screen">
        <div className="game-over-title">NETWORK OFFLINE</div>
        <div className="win-cat game-over-cat">
          {`
    /\\_/\\  
   ( x.x ) 
    > - <  
   /|   |\\  
  (_|   |_)
  `}
        </div>
        <div className="win-cat-caption">The network has gone dark.</div>
        <div className="win-subtitle">
          The dogs have won. The cat network has fallen.
        </div>

        <div className="win-divider" />

        <div className="win-stats">
          <div className="win-stat">
            <div className="win-stat-label">Time Survived</div>
            <div className="win-stat-value">{formatTime(elapsed)}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Incidents Resolved</div>
            <div className="win-stat-value">{gameState.resolvedCount}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Catnip Remaining</div>
            <div className="win-stat-value">{gameState.catnip}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Tier Reached</div>
            <div className="win-stat-value">{gameState.tier}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Devices Built</div>
            <div className="win-stat-value">{gameState.devices.length}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Network Health</div>
            <div className="win-stat-value game-over-zero">0%</div>
          </div>
        </div>

        <div className="win-divider" />

        <button className="game-over-reset" onClick={onReset}>
          Rebuild the Network
        </button>
      </div>
    </div>
  );
}
