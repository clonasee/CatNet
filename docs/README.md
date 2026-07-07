# CatNet

A browser-based networking and cybersecurity strategy game where players manage the digital infrastructure of a growing cat civilization.

## Play the Game

Live demo: https://clonasee.github.io/catnet/

## What is CatNet?

CatNet teaches real networking and cybersecurity concepts through gameplay. Players build network infrastructure, respond to security incidents, and expand their cat network from a small neighborhood colony to a Global Feline Internet.

Every device, incident, and fix in the game is based on a real networking concept:

- Purrtocol Router = network router
- MeowDNS Server = DNS server
- Pawwall = firewall
- Mouseware Infection = malware
- Unauthorized Dog Access = network intrusion
- Catphishing Campaign = phishing attack

## How to Play

1. Start with 100 Catnip
2. Purchase devices from the Build Devices panel
3. Watch for red incident indicators on your devices
4. Click an affected device to investigate the incident
5. Choose the correct fix from the options presented
6. Earn Catnip and Influence to expand your network
7. Reach the Global Feline Internet to win

## Progression Tiers

| Tier | Name                    |
| ---- | ----------------------- |
| 1    | Neighborhood Cat Colony |
| 2    | City Cat Network        |
| 3    | Regional Cat Authority  |
| 4    | National CatNet         |
| 5    | Global Feline Internet  |

## Resources

- **Catnip** — currency used to build and upgrade devices
- **Influence** — earned by resolving incidents, used to advance tiers
- **Network Health** — drops when incidents go unresolved; reach 0% and the network falls

## Installation and Running Locally

Requirements: Node.js 18+

```bash
git clone https://github.com/clonasee/catnet.git
cd CatNet
npm install
npm run dev
```

Open http://localhost:5173/CatNet/ in your browser.

## Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages at https://clonasee.github.io/CatNet/

## Tech Stack

- React + TypeScript + Vite
- SVG for network visualization
- CSS for styling
- localStorage for save data
- GitHub Pages for deployment
- vite-plugin-pwa for Progressive Web App support

## Architecture

The project is fully client-side with no backend, database, or authentication required.

```
src/
├── components/    — UI components (NetworkMap, DeviceBuilder, modals)
├── game/          — Core logic (incident engine, device manager, save system)
├── hooks/         — Custom React hooks (useGameState)
├── types/         — TypeScript interfaces and GameState contract
├── data/          — Static device and incident definitions
├── styles/        — Global CSS
├── App.tsx        — Root component and game loop
└── main.tsx       — Entry point
```

## Incidents and Learning Outcomes

| Incident                 | Real Concept                  | Correct Fix                           |
| ------------------------ | ----------------------------- | ------------------------------------- |
| MeowDNS Failure          | DNS outage                    | Restart the DNS server                |
| Router Overload          | Network congestion            | Throttle traffic and upgrade capacity |
| Mouseware Infection      | Malware                       | Isolate and quarantine the device     |
| Pawwall Misconfiguration | Firewall misconfiguration     | Review and correct rule set           |
| Unauthorized Dog Access  | Network intrusion             | Block at firewall and rotate keys     |
| Broken Cat-5 Link        | Physical cable failure        | Replace the cable                     |
| Catnip Cloud Crash       | Server crash                  | Restart and add redundancy            |
| Network Congestion       | Bandwidth saturation          | Upgrade link capacity                 |
| DDoS Attack              | Distributed denial of service | Enable rate limiting                  |
| Catphishing Campaign     | Phishing attack               | Quarantine the message source         |
