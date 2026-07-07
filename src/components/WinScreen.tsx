// Victory screen displayed when the player reaches the Global Cat Internet tier
// Shows final stats and a reset option to play again

import type { GameState } from "../types";

interface WinScreenProps {
  gameState: GameState;
  onReset: () => void;
}

const TIER_NAMES: Record<number, string> = {
  1: "Neighborhood Cat Colony",
  2: "City Cat Network",
  3: "Regional Cat Authority",
  4: "National CatNet",
  5: "Global Feline Internet",
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function WinScreen({ gameState, onReset }: WinScreenProps) {
  const elapsed = Date.now() - gameState.startedAt;

  return (
    <div className="win-overlay">
      <div className="win-screen">
        <div className="win-title">GLOBAL FELINE INTERNET</div>
        <div className="win-subtitle">
          The cats have won. The internet is theirs now.
        </div>

        <div className="win-divider" />

        <div className="win-stats">
          <div className="win-stat">
            <div className="win-stat-label">Time Elapsed</div>
            <div className="win-stat-value">{formatTime(elapsed)}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Incidents Resolved</div>
            <div className="win-stat-value">{gameState.resolvedCount}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Catnip Earned</div>
            <div className="win-stat-value">{gameState.catnip}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Network Health</div>
            <div className="win-stat-value">{gameState.networkHealth}%</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Devices Built</div>
            <div className="win-stat-value">{gameState.devices.length}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-label">Final Tier</div>
            <div className="win-stat-value">{TIER_NAMES[gameState.tier]}</div>
          </div>
        </div>

        <div className="win-divider" />

        <button className="win-reset" onClick={onReset}>
          Start New Network
        </button>
      </div>
    </div>
  );
}
