// React hook that provides GameState to the applicaiton
// Loads from localStorage on mount and auto-saves whenever state is changed

import { useState, useEffect, useCallback } from "react";
import type { GameState } from "../types";
import { saveGame, loadGame, defaultGameState } from "../game/saveSystem";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    return loadGame() ?? defaultGameState;
  });

  useEffect(() => {
    saveGame(gameState);
  }, [gameState]);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  return { gameState, setGameState, updateGameState };
}
