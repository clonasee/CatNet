// this file handles saving and loading the game state to local storage
// all the persistence logic is here

import type { GameState } from "../types";

const SAVE_KEY = "catnet-save";
const CURRENT_VERSION = 1;

export const defaultGameState: GameState = {
  version: CURRENT_VERSION,
  tier: 1,
  catnip: 100,
  influence: 0,
  networkHealth: 100,
  devices: [],
  incidents: [],
  resolvedCount: 0,
  startedAt: Date.now(),
  lastSavedAt: Date.now(),
};

export function saveGame(state: GameState): void {
  try {
    const payload = {
      ...state,
      lastSavedAt: Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error("CatNet: failure to save game", e);
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GameState;

    if (parsed.version !== CURRENT_VERSION) {
      console.warn("CatNet: save version mismatch, starting fresh");
      return null;
    }

    return parsed;
  } catch (e) {
    console.error("CatNet: failed to load save", e);
    return null;
  }
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
}
