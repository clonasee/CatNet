# CatNet Architecture Notes

## Overview

CatNet is a fully client-side React application with no backend dependencies. All game state is managed in memory via React hooks and persisted to localStorage.

## State Management

All game data flows through a single `GameState` interface defined in `src/types/index.ts`. This was established as a contract on day one of development — no feature was built without a corresponding field in GameState first.

The `useGameState` hook in `src/hooks/useGameState.ts` provides state to the rest of the application and auto-saves to localStorage on every state change.

## Core Systems

### Save System (`src/game/saveSystem.ts`)

- Reads and writes GameState to localStorage under the key `catnet-save`
- Includes version checking to handle save migration
- Nothing else in the codebase touches localStorage directly

### Incident Engine (`src/game/incidentEngine.ts`)

- Spawns incidents on a 15-second timer
- Selects incident types based on current tier
- Handles resolution logic including health impact and rewards
- Supports escalation chains (e.g. Catphishing → Unauthorized Dog Access → Mouseware)

### Device Manager (`src/game/deviceManager.ts`)

- Creates device instances from type definitions
- Positions devices in a circular layout on the SVG map
- Generates unique IDs for each device

## Data Layer

Static definitions live in `src/data/`:

- `devices.ts` — device blueprints with costs and descriptions
- `incidents.ts` — incident definitions with fix options, rewards, and escalation rules

These are read-only and never mutated at runtime.

## Component Structure

```
App.tsx
├── TierBanner         — progression display
├── NetworkMap         — SVG device visualization
├── DeviceBuilder      — purchase panel
├── IncidentModal      — fix selection dialog
├── FeedbackModal      — resolution feedback
├── WinScreen          — victory state
└── GameOverScreen     — defeat state
```

## Design Decisions

- **No backend** — keeps the project deployable to GitHub Pages with zero infrastructure
- **No external state library** — React useState is sufficient for this scope
- **SVG for the map** — gives full control over rendering without a canvas library
- **localStorage versioning** — protects against breaking changes to GameState shape
- **Type-only imports** — enforced by verbatimModuleSyntax in tsconfig to keep TypeScript strict
- **Data separation** — static definitions in src/data are kept separate from runtime state in GameState, making it easy to add new devices and incidents without touching game logic

## File Structure

```
src/
├── components/
│   ├── NetworkMap.tsx       — SVG map with clickable device nodes
│   ├── DeviceBuilder.tsx    — panel for purchasing devices
│   ├── IncidentModal.tsx    — incident investigation and fix selection
│   ├── FeedbackModal.tsx    — correct/incorrect feedback after resolution
│   ├── TierBanner.tsx       — tier name and influence progress bar
│   ├── WinScreen.tsx        — victory screen with final stats
│   └── GameOverScreen.tsx   — defeat screen with final stats
├── game/
│   ├── saveSystem.ts        — localStorage read/write and default state
│   ├── incidentEngine.ts    — incident spawning and resolution logic
│   └── deviceManager.ts     — device creation and positioning
├── hooks/
│   └── useGameState.ts      — React hook wrapping GameState with auto-save
├── types/
│   └── index.ts             — GameState contract and all TypeScript types
├── data/
│   ├── devices.ts           — static device definitions and costs
│   └── incidents.ts         — static incident definitions with fix options
├── styles/
│   └── global.css           — all application styles and CSS variables
├── App.tsx                  — root component, game loop, and event handlers
└── main.tsx                 — React entry point
```

## Deployment

The app is deployed to GitHub Pages using the `gh-pages` npm package. The Vite config sets `base: '/CatNet/'` to ensure assets load correctly from the subdirectory. A PWA manifest is included via `vite-plugin-pwa` making the game installable on mobile devices.
