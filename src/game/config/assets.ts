export const CITY_MODEL_BASE = '/assets/kenney/city-kit-suburban/models';
export const CHARACTER_MODEL_BASE = '/assets/kenney/blocky-characters/models';

export const cityModel = (name: string) => `${CITY_MODEL_BASE}/${name}.glb`;
export const characterModel = (name: string) => `${CHARACTER_MODEL_BASE}/${name}.glb`;

export const characterAssets = {
  player: characterModel('character-a'),
  bigDale: characterModel('character-j'),
  tammy: characterModel('character-m'),
  mayorBuck: characterModel('character-g')
} as const;

export const worldAssets = {
  gasStation: cityModel('building-type-p'),
  storage: cityModel('building-type-q'),
  townHall: cityModel('building-type-h'),
  houseA: cityModel('building-type-a'),
  houseB: cityModel('building-type-d'),
  houseC: cityModel('building-type-f'),
  houseD: cityModel('building-type-i'),
  houseE: cityModel('building-type-j'),
  houseF: cityModel('building-type-s'),
  treeLarge: cityModel('tree-large'),
  treeSmall: cityModel('tree-small'),
  fenceLong: cityModel('fence-1x4'),
  fenceCorner: cityModel('fence-3x3'),
  fenceLow: cityModel('fence-low'),
  drivewayLong: cityModel('driveway-long'),
  drivewayShort: cityModel('driveway-short'),
  pathLong: cityModel('path-long'),
  pathShort: cityModel('path-short'),
  stonesLong: cityModel('path-stones-long'),
  stonesMessy: cityModel('path-stones-messy'),
  stonesShort: cityModel('path-stones-short'),
  planter: cityModel('planter')
} as const;
