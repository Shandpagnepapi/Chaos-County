import { characterAssets, worldAssets } from './assets';
import type { NpcId } from './events';

export interface Vec2 {
  x: number;
  z: number;
}

export interface RectCollider {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
}

export interface WorldModel {
  id: string;
  model: string;
  position: [number, number, number];
  rotationY?: number;
  scale: number;
  collider?: RectCollider;
  label?: string;
  labelHeight?: number;
  fadeWhenOccluding?: boolean;
}

export interface NpcConfig {
  id: NpcId;
  name: string;
  title: string;
  model: string;
  position: Vec2;
  rotationY: number;
  dialogue: string;
}

export interface SnackBagConfig {
  id: string;
  position: Vec2;
}

export const worldBounds = {
  minX: -18,
  maxX: 18,
  minZ: -14,
  maxZ: 14
} as const;

export const playerStartPosition: Vec2 = { x: -9.8, z: 4.9 };

export const worldModels: WorldModel[] = [
  {
    id: 'gas-station',
    model: worldAssets.gasStation,
    position: [-10.8, 0, -6.4],
    rotationY: Math.PI,
    scale: 2.6,
    label: 'Dale Mart',
    labelHeight: 2.9,
    fadeWhenOccluding: true,
    collider: { id: 'gas-station', x: -10.8, z: -6.4, width: 3.2, depth: 2.2 }
  },
  {
    id: 'gas-storage',
    model: worldAssets.storage,
    position: [-6.9, 0, -5.7],
    rotationY: Math.PI,
    scale: 2.1,
    collider: { id: 'gas-storage', x: -6.9, z: -5.7, width: 2.2, depth: 1.8 }
  },
  {
    id: 'town-hall',
    model: worldAssets.townHall,
    position: [9.8, 0, -7.4],
    rotationY: Math.PI,
    scale: 2.55,
    label: 'Town Hall',
    labelHeight: 2.8,
    fadeWhenOccluding: true,
    collider: { id: 'town-hall', x: 9.8, z: -7.4, width: 3.1, depth: 2.1 }
  },
  {
    id: 'maple-house',
    model: worldAssets.houseA,
    position: [-3.4, 0, -8.1],
    rotationY: Math.PI,
    scale: 2.15,
    collider: { id: 'maple-house', x: -3.4, z: -8.1, width: 2.5, depth: 1.8 }
  },
  {
    id: 'juniper-house',
    model: worldAssets.houseB,
    position: [2.5, 0, -8.4],
    rotationY: Math.PI,
    scale: 2.18,
    collider: { id: 'juniper-house', x: 2.5, z: -8.4, width: 2.55, depth: 1.85 }
  },
  {
    id: 'tammy-house',
    model: worldAssets.houseC,
    position: [-2.7, 0, 7.4],
    scale: 2.2,
    collider: { id: 'tammy-house', x: -2.7, z: 7.4, width: 2.6, depth: 1.9 }
  },
  {
    id: 'solar-house',
    model: worldAssets.houseE,
    position: [4.8, 0, 7.8],
    scale: 2.15,
    collider: { id: 'solar-house', x: 4.8, z: 7.8, width: 2.5, depth: 1.85 }
  },
  {
    id: 'corner-home',
    model: worldAssets.houseF,
    position: [10.3, 0, 6.6],
    scale: 2.25,
    collider: { id: 'corner-home', x: 10.3, z: 6.6, width: 2.8, depth: 2.0 }
  },
  {
    id: 'cedar-bungalow',
    model: worldAssets.houseBungalow,
    position: [-13.6, 0, 6.9],
    rotationY: Math.PI / 2,
    scale: 2.08,
    collider: { id: 'cedar-bungalow', x: -13.6, z: 6.9, width: 2.2, depth: 2.55 }
  },
  {
    id: 'alley-shop',
    model: worldAssets.shopSmall,
    position: [-15.0, 0, -6.6],
    rotationY: Math.PI,
    scale: 1.95,
    fadeWhenOccluding: true,
    collider: { id: 'alley-shop', x: -15.0, z: -6.6, width: 2.15, depth: 1.8 }
  },
  {
    id: 'hazel-house',
    model: worldAssets.housePorch,
    position: [0.3, 0, 11.6],
    scale: 2.05,
    collider: { id: 'hazel-house', x: 0.3, z: 11.6, width: 2.4, depth: 1.8 }
  },
  {
    id: 'garage-house',
    model: worldAssets.houseGarage,
    position: [14.1, 0, 8.8],
    rotationY: -Math.PI / 2,
    scale: 2.05,
    collider: { id: 'garage-house', x: 14.1, z: 8.8, width: 2.2, depth: 2.45 }
  },
  {
    id: 'duplex',
    model: worldAssets.houseD,
    position: [14.2, 0, -4.1],
    rotationY: -Math.PI / 2,
    scale: 2.25,
    collider: { id: 'duplex', x: 14.2, z: -4.1, width: 2.3, depth: 2.4 }
  },
  {
    id: 'fence-park-a',
    model: worldAssets.fenceLong,
    position: [-2.8, 0, 11.1],
    scale: 2.35,
    collider: { id: 'fence-park-a', x: -2.8, z: 11.1, width: 4.0, depth: 0.45 }
  },
  {
    id: 'fence-park-b',
    model: worldAssets.fenceCorner,
    position: [1.2, 0, 11.0],
    rotationY: -Math.PI / 2,
    scale: 2.15,
    collider: { id: 'fence-park-b', x: 1.2, z: 11.0, width: 1.4, depth: 2.5 }
  },
  {
    id: 'woods-gate-fence',
    model: worldAssets.fenceCorner,
    position: [15.7, 0, 1.7],
    rotationY: Math.PI / 2,
    scale: 2.35,
    label: 'Woods Locked',
    labelHeight: 1.9,
    collider: { id: 'woods-gate-fence', x: 15.7, z: 1.7, width: 1.4, depth: 3.2 }
  },
  {
    id: 'fence-low-gas',
    model: worldAssets.fenceLow,
    position: [-13.8, 0, 0.6],
    scale: 2.3,
    collider: { id: 'fence-low-gas', x: -13.8, z: 0.6, width: 2.2, depth: 0.45 }
  },
  {
    id: 'fence-yard-west',
    model: worldAssets.fenceMedium,
    position: [-12.0, 0, 9.8],
    rotationY: Math.PI / 2,
    scale: 2.1,
    collider: { id: 'fence-yard-west', x: -12.0, z: 9.8, width: 0.55, depth: 2.9 }
  },
  {
    id: 'fence-yard-east',
    model: worldAssets.fenceShort,
    position: [12.7, 0, 10.5],
    scale: 2.0,
    collider: { id: 'fence-yard-east', x: 12.7, z: 10.5, width: 2.25, depth: 0.5 }
  }
];

export const groundDecor: WorldModel[] = [
  { id: 'driveway-gas', model: worldAssets.drivewayLong, position: [-10.8, 0.07, -3.8], scale: 2.6 },
  { id: 'driveway-storage', model: worldAssets.drivewayShort, position: [-6.9, 0.07, -3.4], scale: 2.2 },
  { id: 'path-maple', model: worldAssets.pathShort, position: [-3.4, 0.065, -5.9], scale: 1.8 },
  { id: 'path-juniper', model: worldAssets.pathShort, position: [2.5, 0.065, -6.0], scale: 1.8 },
  { id: 'path-town-hall', model: worldAssets.pathLong, position: [9.8, 0.065, -4.8], scale: 2.0 },
  { id: 'path-tammy', model: worldAssets.stonesLong, position: [-2.7, 0.065, 5.0], scale: 2.0 },
  { id: 'path-solar', model: worldAssets.pathShort, position: [4.8, 0.065, 5.4], scale: 1.8 },
  { id: 'path-corner', model: worldAssets.stonesMessy, position: [10.3, 0.065, 4.2], scale: 1.8 },
  { id: 'path-cedar', model: worldAssets.pathShort, position: [-13.0, 0.065, 4.35], rotationY: Math.PI / 2, scale: 1.8 },
  { id: 'path-hazel', model: worldAssets.stonesShort, position: [0.3, 0.065, 9.6], scale: 1.6 },
  { id: 'driveway-garage', model: worldAssets.drivewayShort, position: [12.2, 0.07, 8.8], rotationY: Math.PI / 2, scale: 2.0 },
  { id: 'alley-stones', model: worldAssets.stonesMessy, position: [-13.7, 0.065, -3.65], rotationY: -0.2, scale: 1.5 }
];

export const treeDecor: WorldModel[] = [
  { id: 'tree-a', model: worldAssets.treeLarge, position: [-15.2, 0, -10.2], scale: 2.1, collider: { id: 'tree-a', x: -15.2, z: -10.2, width: 0.8, depth: 0.8 } },
  { id: 'tree-b', model: worldAssets.treeSmall, position: [-7.6, 0, -10.1], scale: 1.9, collider: { id: 'tree-b', x: -7.6, z: -10.1, width: 0.7, depth: 0.7 } },
  { id: 'tree-c', model: worldAssets.treeLarge, position: [7.1, 0, -11.0], scale: 2.1, collider: { id: 'tree-c', x: 7.1, z: -11.0, width: 0.8, depth: 0.8 } },
  { id: 'tree-d', model: worldAssets.treeSmall, position: [15.6, 0, -9.8], scale: 1.9, collider: { id: 'tree-d', x: 15.6, z: -9.8, width: 0.7, depth: 0.7 } },
  { id: 'tree-e', model: worldAssets.treeLarge, position: [-15.8, 0, 9.6], scale: 2.1, collider: { id: 'tree-e', x: -15.8, z: 9.6, width: 0.8, depth: 0.8 } },
  { id: 'tree-f', model: worldAssets.treeSmall, position: [15.2, 0, 10.2], scale: 1.9, collider: { id: 'tree-f', x: 15.2, z: 10.2, width: 0.7, depth: 0.7 } },
  { id: 'tree-g', model: worldAssets.treeSmall, position: [-12.2, 0, 11.8], scale: 1.75, collider: { id: 'tree-g', x: -12.2, z: 11.8, width: 0.65, depth: 0.65 } },
  { id: 'tree-h', model: worldAssets.treeLarge, position: [1.9, 0, 12.7], scale: 1.95, collider: { id: 'tree-h', x: 1.9, z: 12.7, width: 0.8, depth: 0.8 } },
  { id: 'tree-i', model: worldAssets.treeSmall, position: [12.4, 0, 10.9], scale: 1.7, collider: { id: 'tree-i', x: 12.4, z: 10.9, width: 0.65, depth: 0.65 } },
  { id: 'planter-a', model: worldAssets.planter, position: [-4.9, 0, -6.5], scale: 1.7, collider: { id: 'planter-a', x: -4.9, z: -6.5, width: 0.8, depth: 0.55 } },
  { id: 'planter-b', model: worldAssets.planter, position: [6.0, 0, 7.3], scale: 1.7, collider: { id: 'planter-b', x: 6.0, z: 7.3, width: 0.8, depth: 0.55 } },
  { id: 'planter-c', model: worldAssets.planter, position: [12.4, 0, -5.1], scale: 1.7, collider: { id: 'planter-c', x: 12.4, z: -5.1, width: 0.8, depth: 0.55 } },
  { id: 'planter-d', model: worldAssets.planter, position: [-9.0, 0, -5.1], scale: 1.55, collider: { id: 'planter-d', x: -9.0, z: -5.1, width: 0.75, depth: 0.5 } },
  { id: 'planter-e', model: worldAssets.planter, position: [-12.6, 0, 6.0], scale: 1.55, collider: { id: 'planter-e', x: -12.6, z: 6.0, width: 0.75, depth: 0.5 } }
];

export const allColliders: RectCollider[] = [...worldModels, ...treeDecor]
  .map((model) => model.collider)
  .filter((collider): collider is RectCollider => Boolean(collider));

export const snackBags: SnackBagConfig[] = [
  { id: 'snack-01', position: { x: -8.1, z: -2.9 } },
  { id: 'snack-02', position: { x: -14.4, z: -0.8 } },
  { id: 'snack-03', position: { x: -4.9, z: -10.7 } },
  { id: 'snack-04', position: { x: 1.3, z: -5.1 } },
  { id: 'snack-05', position: { x: 7.7, z: -4.7 } },
  { id: 'snack-06', position: { x: 13.8, z: -1.4 } },
  { id: 'snack-07', position: { x: -5.8, z: 7.8 } },
  { id: 'snack-08', position: { x: 2.8, z: 10.4 } },
  { id: 'snack-09', position: { x: 7.2, z: 4.5 } },
  { id: 'snack-10', position: { x: 14.3, z: 8.6 } }
];

export const npcs: NpcConfig[] = [
  {
    id: 'big-dale',
    name: 'Big Dale',
    title: 'Gas Station Owner',
    model: characterAssets.bigDale,
    position: { x: -9.1, z: -2.5 },
    rotationY: Math.PI,
    dialogue:
      'I know three things: gas prices, snack margins, and when The Algorithm is about to make my Tuesday legally interesting. If the streetlights blink twice, I start labeling shelves by emotional risk.'
  },
  {
    id: 'tammy-two-phones',
    name: 'Tammy Two-Phones',
    title: 'Gossip NPC',
    model: characterAssets.tammy,
    position: { x: -1.0, z: 4.8 },
    rotationY: -0.4,
    dialogue:
      'My left phone tracks rumors. My right phone tracks rumors about the rumors. Chaos County is basically a weather system with comments, and I am the only person brave enough to refresh during thunder.'
  },
  {
    id: 'mayor-buck',
    name: 'Mayor Buck',
    title: 'Clueless Mayor',
    model: characterAssets.mayorBuck,
    position: { x: 9.7, z: -4.3 },
    rotationY: Math.PI,
    dialogue:
      'Everything is under control. We have a clipboard, a sunset, and several official explanations for things no one understands. The Algorithm has not filed the correct permit, which I consider progress.'
  }
];
