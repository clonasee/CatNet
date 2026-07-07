# #hackthekitty 2026 — Project Report

**Project Name:** CatNet
**Reference ID:** 7RVYCER4

---

## 1. Executive Summary

CatNet is a browser-based networking and cybersecurity strategy game where players manage the digital infrastructure of a growing cat civilization, expanding from a small neighborhood network to a Global Feline Internet. Players learn real networking and security concepts — DNS, firewalls, malware, DDoS attacks, and more by diagnosing and resolving incidents on a live network map. The game delivers genuine educational value wrapped in an approachable, humorous theme that lowers the barrier to entry for cybersecurity concepts.

---

## 2. Project Overview

### 2a. Why you're building what you're building

Cybersecurity education often feels intimidating or inaccessible to people without a technical background. Most learning resources are dry, text-heavy, and disconnected from hands-on experience. CatNet addresses this by embedding real networking concepts directly into gameplay — players don't read about DNS failures, they diagnose and fix them under time pressure. The game creates a low-stakes environment where making the wrong choice teaches as much as making the right one.

### 2b. How it relates to the theme

CatNet directly embodies the #hackthekitty theme. The entire narrative is built around cats taking over the world through superior digital infrastructure — positively, strategically, and one network tier at a time. Every device, incident, and mechanic is cat-themed while remaining grounded in real cybersecurity concepts, making the theme functional rather than cosmetic.

### 2c. Target Audience

CatNet is designed for people who are curious about networking and cybersecurity but have no formal background in either. This includes students, career changers exploring tech, and general audiences who enjoy strategy games. It is also suitable as a supplementary learning tool for introductory IT or cybersecurity courses.

---

## 3. Key Features

- Interactive SVG network map with clickable device nodes and real-time health indicators
- Ten distinct security incidents based on real networking concepts, each with multiple fix options and educational feedback
- Resource management loop — earn Catnip by resolving incidents, spend it to build and expand your network
- Five-tier progression system from Neighborhood Cat Colony to Global Feline Internet, gated by Influence milestones
- Incident escalation chains — unresolved threats compound into worse incidents (e.g. Catphishing → Unauthorized Dog Access → Mouseware Infection)
- Win screen and game over screen with final stats and ASCII cat art
- Fully persistent save system via localStorage with version checking
- Progressive Web App support — installable on mobile devices via browser

---

## 4. Technology Stack

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| Frontend framework | React 19 + TypeScript               |
| Build tool         | Vite 8                              |
| Visualization      | SVG (built-in, no external library) |
| Styling            | CSS with custom properties          |
| Persistence        | localStorage (client-side)          |
| PWA support        | vite-plugin-pwa                     |
| Deployment         | GitHub Pages via gh-pages           |
| Version control    | Git + GitHub                        |

---

## 5. Technical Architecture

CatNet is a fully client-side single-page application with no backend, database, or authentication layer. All game logic runs in the browser.

### Data Flow

```
User interaction
      ↓
App.tsx (game loop + event handlers)
      ↓
useGameState hook (React state + auto-save)
      ↓
saveSystem.ts (localStorage read/write)
```

### Core Systems

The `GameState` interface in `src/types/index.ts` is the central contract. Every piece of game data, devices, incidents, resources, tier — lives inside this single object. Nothing in the app mutates state directly; all changes flow through the `updateGameState` function provided by the `useGameState` hook, which triggers an auto-save to localStorage on every update.

The incident engine runs on a 15-second timer. When it fires, it selects a random incident type appropriate for the current tier, assigns it to a healthy device, and updates GameState. If the player selects the wrong fix, the incident is marked resolved but health is penalized. If they select the correct fix, they earn Catnip and Influence rewards. Incidents with escalation chains will spawn a follow-up incident if left unresolved past their time limit.

### Component Tree

```
App.tsx
├── TierBanner
├── NetworkMap
├── DeviceBuilder
├── IncidentModal
├── FeedbackModal
├── WinScreen
└── GameOverScreen
```

---

## 6. Testing Matrix

| Feature / Flow          | Steps                                              | Expected Result                                                | Actual Result                                                     | Pass / Fail |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| Place a device          | Click a device card in Build Devices panel         | Device appears on network map, Catnip deducted                 | Device appears centered on map, Catnip reduced correctly          | Pass        |
| Insufficient funds      | Attempt to buy a device with less Catnip than cost | Button is disabled, nothing happens                            | Card greyed out, click has no effect                              | Pass        |
| Incident spawns         | Wait 15 seconds with at least one device placed    | Red dot appears on a device                                    | Red indicator appears on device node                              | Pass        |
| Correct fix             | Click incident device, select correct fix option   | Feedback modal shows correct, rewards granted, red dot removed | Correct feedback shown, Catnip and Influence updated, dot cleared | Pass        |
| Wrong fix               | Click incident device, select incorrect fix option | Feedback modal shows incorrect, no rewards, health reduced     | Incorrect feedback shown, health dropped, no rewards              | Pass        |
| Influence progress      | Resolve multiple incidents correctly               | Influence increases and progress bar fills                     | Influence incremented, bar width updated correctly                | Pass        |
| Tier advancement        | Reach Influence threshold for current tier         | Tier number increments, tier name updates in banner            | Tier advanced correctly on next render cycle                      | Pass        |
| New device types unlock | Advance to Tier 2                                  | Additional device types appear in Build Devices panel          | Catnip Cloud and Cat-5 Link appeared at Tier 2                    | Pass        |
| Save and reload         | Refresh the browser mid-game                       | Game state restored exactly as left                            | All devices, resources, and incidents restored from localStorage  | Pass        |
| New Game button         | Click New Game in header                           | Game resets to default state, map clears                       | State reset, devices cleared, resources returned to default       | Pass        |
| Game over               | Allow Network Health to reach 0%                   | Game over screen displays with final stats                     | Game over screen appeared with correct stats                      | Pass        |
| PWA install prompt      | Open on mobile browser                             | Install to home screen prompt appears                          | Install prompt displayed on Chrome for Android                    | Pass        |

---

## 8. Future Improvements

- **Upgrade system** — spend Catnip to upgrade individual devices, increasing their health cap and reducing incident frequency on that node
- **Animated packet traffic** — SVG path animations showing data flowing between nodes, pulsing faster under load and slowing during incidents
- **Incident log / activity feed** — a scrollable sidebar showing a history of all incidents, resolutions, and tier advancements
- **Tiers 4 and 5 content** — National CatNet and Global Feline Internet tiers with new device types and higher-difficulty incidents
- **Leaderboard** — score tracking based on time to completion, incidents resolved correctly, and final network health
- **Sound effects** — audio cues for incident spawns, correct fixes, tier advancements, and the win screen
- **Tutorial mode** — a guided first-game experience that walks new players through their first incident resolution step by step

---

## 9. Tools Used

- Claude (Anthropic) — AI assistant used for architecture planning, debugging, and documentation
- VS Code — code editor
- Git Bash — terminal for version control and deployment
- GitHub — source control and GitHub Pages hosting
- Chrome DevTools — debugging, localStorage inspection, and console testing

---

## 11. Learnings & Takeaways

Building CatNet reinforced how much a clear architectural contract at the start of a project pays off under time pressure. Defining the `GameState` interface before writing any components meant there was never any ambiguity about where data lived or how it flowed — every decision during the build had a clear answer. The biggest technical lesson was how TypeScript's `verbatimModuleSyntax` setting enforces `import type` for type-only imports, which surfaced early and would have caused build failures at deployment if not caught. On the design side, the project demonstrated that a strong theme makes scoping decisions easier, every feature either served the cat network narrative or it didn't, which made it straightforward to prioritize during a tight deadline.

---

## 12. Acknowledgments

- React, Vite, and the open-source ecosystem for the foundational tooling
- The vite-plugin-pwa project for making PWA setup nearly zero-config
- gh-pages npm package for streamlining GitHub Pages deployment

---
