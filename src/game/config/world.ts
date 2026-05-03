import { characterAssets, worldAssets } from './assets';

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
  id: 'big-dale' | 'tammy-two-phones' | 'mayor-buck';
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
  }
];

export const groundDecor: WorldModel[] = [
  { id: 'driveway-gas', model: worldAssets.drivewayLong, position: [-10.8, 0.015, -3.8], scale: 2.6 },
  { id: 'driveway-storage', model: worldAssets.drivewayShort, position: [-6.9, 0.015, -3.4], scale: 2.2 },
  { id: 'path-maple', model: worldAssets.pathShort, position: [-3.4, 0.018, -5.9], scale: 1.8 },
  { id: 'path-juniper', model: worldAssets.pathShort, position: [2.5, 0.018, -6.0], scale: 1.8 },
  { id: 'path-town-hall', model: worldAssets.pathLong, position: [9.8, 0.018, -4.8], scale: 2.0 },
  { id: 'path-tammy', model: worldAssets.stonesLong, position: [-2.7, 0.018, 5.0], scale: 2.0 },
  { id: 'path-solar', model: worldAssets.pathShort, position: [4.8, 0.018, 5.4], scale: 1.8 },
  { id: 'path-corner', model: worldAssets.stonesMessy, position: [10.3, 0.018, 4.2], scale: 1.8 }
];

export const treeDecor: WorldModel[] = [
  { id: 'tree-a', model: worldAssets.treeLarge, position: [-15.2, 0, -10.2], scale: 2.1, collider: { id: 'tree-a', x: -15.2, z: -10.2, width: 0.8, depth: 0.8 } },
  { id: 'tree-b', model: worldAssets.treeSmall, position: [-7.6, 0, -10.1], scale: 1.9, collider: { id: 'tree-b', x: -7.6, z: -10.1, width: 0.7, depth: 0.7 } },
  { id: 'tree-c', model: worldAssets.treeLarge, position: [7.1, 0, -11.0], scale: 2.1, collider: { id: 'tree-c', x: 7.1, z: -11.0, width: 0.8, depth: 0.8 } },
  { id: 'tree-d', model: worldAssets.treeSmall, position: [15.6, 0, -9.8], scale: 1.9, collider: { id: 'tree-d', x: 15.6, z: -9.8, width: 0.7, depth: 0.7 } },
  { id: 'tree-e', model: worldAssets.treeLarge, position: [-15.8, 0, 9.6], scale: 2.1, collider: { id: 'tree-e', x: -15.8, z: 9.6, width: 0.8, depth: 0.8 } },
  { id: 'tree-f', model: worldAssets.treeSmall, position: [15.2, 0, 10.2], scale: 1.9, collider: { id: 'tree-f', x: 15.2, z: 10.2, width: 0.7, depth: 0.7 } },
  { id: 'planter-a', model: worldAssets.planter, position: [-4.9, 0, -6.5], scale: 1.7, collider: { id: 'planter-a', x: -4.9, z: -6.5, width: 0.8, depth: 0.55 } },
  { id: 'planter-b', model: worldAssets.planter, position: [6.0, 0, 7.3], scale: 1.7, collider: { id: 'planter-b', x: 6.0, z: 7.3, width: 0.8, depth: 0.55 } },
  { id: 'planter-c', model: worldAssets.planter, position: [12.4, 0, -5.1], scale: 1.7, collider: { id: 'planter-c', x: 12.4, z: -5.1, width: 0.8, depth: 0.55 } }
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
    dialogue: 'I know three things: gas prices, snack margins, and when a goblin is bad for business.'
  },
  {
    id: 'tammy-two-phones',
    name: 'Tammy Two-Phones',
    title: 'Gossip NPC',
    model: characterAssets.tammy,
    position: { x: -1.0, z: 4.8 },
    rotationY: -0.4,
    dialogue:
      'My left phone says the goblin is real. My right phone says he has a brand strategy. Both are ringing.'
  },
  {
    id: 'mayor-buck',
    name: 'Mayor Buck',
    title: 'Clueless Mayor',
    model: characterAssets.mayorBuck,
    position: { x: 9.7, z: -4.3 },
    rotationY: Math.PI,
    dialogue:
      'Everything is under control. I have appointed a snack advisory committee and given it a very sturdy clipboard.'
  }
];
