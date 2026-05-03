export const CITY_MODEL_BASE = '/assets/kenney/city-kit-suburban/models';
export const CHARACTER_MODEL_BASE = '/assets/kenney/blocky-characters/models';

export const cityModel = (name: string) => `${CITY_MODEL_BASE}/${name}.glb`;
export const characterModel = (name: string) => `${CHARACTER_MODEL_BASE}/${name}.glb`;

export const characterAssets = {
  player: characterModel('character-a'),
  bigDale: characterModel('character-j'),
  tammy: characterModel('character-m'),
  mayorBuck: characterModel('character-g'),
  chad: characterModel('character-c'),
  raccoonRep: characterModel('character-r')
} as const;

export const worldAssets = {
  gasStation: cityModel('building-type-p'),
  storage: cityModel('building-type-q'),
  townHall: cityModel('building-type-h'),
  houseA: cityModel('building-type-a'),
  houseAAngled: cityModel('building-type-b'),
  houseBungalow: cityModel('building-type-c'),
  houseB: cityModel('building-type-d'),
  housePorch: cityModel('building-type-e'),
  houseC: cityModel('building-type-f'),
  houseCorner: cityModel('building-type-g'),
  houseD: cityModel('building-type-i'),
  houseE: cityModel('building-type-j'),
  houseGarage: cityModel('building-type-k'),
  houseWide: cityModel('building-type-l'),
  houseTall: cityModel('building-type-m'),
  shopSmall: cityModel('building-type-r'),
  houseF: cityModel('building-type-s'),
  houseSolar: cityModel('building-type-t'),
  shopWide: cityModel('building-type-u'),
  treeLarge: cityModel('tree-large'),
  treeSmall: cityModel('tree-small'),
  fenceSingle: cityModel('fence'),
  fenceShort: cityModel('fence-1x2'),
  fenceMedium: cityModel('fence-1x3'),
  fenceLong: cityModel('fence-1x4'),
  fenceSquare: cityModel('fence-2x2'),
  fenceL: cityModel('fence-2x3'),
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
