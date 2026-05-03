# Chaos County

True 3D low-poly browser game prototype built with Vite, TypeScript, Three.js, React Three Fiber, Drei, and Zustand.

Default event: **Gas Station Goblin Panic**

## Event Testing

Chaos County now has a reusable event config system in `src/game/config/events.ts`.
Use the event selector on the start screen or HUD dev toggle to enable one event at a time.

Configured events:

- Gas Station Goblin Panic
- Drone Swarm Over Dale's
- The Great Yard Sale Stampede
- Raccoon Union Strike
- Influencer Apology Tour
- Mysterious Sinkhole Behind the Mini-Mart

To add another future event, add one `EventConfig` entry with quest steps, collectibles, interaction zones, temporary decorations, rewards, dialogue hooks, and completion text. The shared store and scene components handle progress, localStorage saving, reward panels, and rendering for the active event.

## Scripts

- `npm run dev` - start local Vite dev server
- `npm run build` - type-check and build
- `npm run preview` - preview the production build

## Assets

The game uses official Kenney CC0 packs:

- City Kit: Suburban
- Blocky Characters

Runtime assets live in `public/assets/kenney`. Source downloads live in `assets/raw`.
