import { characterAssets } from './assets';

export type QuestStatus = 'not_started' | 'active' | 'ready_to_return' | 'completed';

export type EventId =
  | 'gas-station-goblin-panic'
  | 'drone-swarm-over-dales'
  | 'great-yard-sale-stampede'
  | 'raccoon-union-strike'
  | 'influencer-apology-tour'
  | 'mysterious-sinkhole-behind-the-mini-mart';

export type NpcId = 'big-dale' | 'tammy-two-phones' | 'mayor-buck' | 'chad-thunder' | 'raccoon-union-rep';

export type CollectibleType =
  | 'snack_bag'
  | 'mystery_package'
  | 'drone_battery'
  | 'yard_sale_sticker'
  | 'questionable_antique'
  | 'shiny_bottle_cap'
  | 'premium_leftovers'
  | 'ring_light_piece'
  | 'fake_tear_drop'
  | 'apology_script'
  | 'strange_rock'
  | 'lost_town_item';

export type DecorationKind =
  | 'delivery_drone'
  | 'signal_jammer'
  | 'yard_sale_table'
  | 'cursed_recliner'
  | 'trash_blockade'
  | 'raccoon_podium'
  | 'protest_sign'
  | 'camera_tripod'
  | 'broken_ring_light'
  | 'glowing_sinkhole'
  | 'warning_cone'
  | 'warning_sign'
  | 'drone_crate'
  | 'scattered_boxes';

export interface EventVec2 {
  x: number;
  z: number;
}

export interface EventReward {
  coins: number;
  cosmetic: string;
  cosmeticLabel: string;
  badge?: string;
  unlockable?: string;
}

export interface CollectibleDefinition {
  type: CollectibleType;
  label: string;
  pluralLabel: string;
  floatingText: string;
  tone?: 'normal' | 'rare' | 'reward';
}

export interface EventCollectible {
  id: string;
  type: CollectibleType;
  position: EventVec2;
  height?: number;
}

export interface InteractionZone {
  id: string;
  label: string;
  position: EventVec2;
  radius: number;
  prompt: string;
  markerColor: string;
}

export interface TemporaryDecoration {
  id: string;
  kind: DecorationKind;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  zoneId?: string;
}

export interface EventNpcConfig {
  id: NpcId;
  name: string;
  title: string;
  model: string;
  position: EventVec2;
  rotationY: number;
  dialogue: string;
}

export type QuestStep =
  | {
      id: string;
      type: 'talk' | 'return';
      npcId: NpcId;
      objective: string;
      dialogue: string;
    }
  | {
      id: string;
      type: 'collect';
      collectibleType: CollectibleType;
      requiredCount: number;
      objective: string;
      completionText: string;
    }
  | {
      id: string;
      type: 'interact';
      zoneIds: string[];
      requiredCount: number;
      objective: string;
      completionText: string;
    }
  | {
      id: string;
      type: 'choice';
      objective: string;
      prompt: string;
      choices: Array<{
        id: string;
        label: string;
        dialogue: string;
      }>;
    };

export interface EventDialogueHooks {
  start: string;
  active: string;
  ready: string;
  completed: string;
  npcLines: Partial<Record<NpcId, string>>;
}

export interface EventConfig {
  id: EventId;
  name: string;
  subtitle: string;
  description: string;
  introLore: string;
  mainNpcId: NpcId;
  primaryCollectibleType: CollectibleType;
  requiredCount: number;
  reward: EventReward;
  hudBannerText: string;
  questSteps: QuestStep[];
  collectibleDefinitions: Record<CollectibleType, CollectibleDefinition>;
  collectibles: EventCollectible[];
  interactionZones: InteractionZone[];
  temporaryDecorations: TemporaryDecoration[];
  eventNpcs: EventNpcConfig[];
  dialogue: EventDialogueHooks;
  completionScreen: {
    title: string;
    body: string;
    reaction: string;
  };
}

const snackPositions: EventVec2[] = [
  { x: -8.1, z: -2.9 },
  { x: -14.4, z: -0.8 },
  { x: -4.9, z: -10.7 },
  { x: 1.3, z: -5.1 },
  { x: 7.7, z: -4.7 },
  { x: 13.8, z: -1.4 },
  { x: -5.8, z: 7.8 },
  { x: 2.8, z: 10.4 },
  { x: 7.2, z: 4.5 },
  { x: 14.3, z: 8.6 }
];

const packagePositions: EventVec2[] = [
  { x: -12.7, z: -3.7 },
  { x: -7.0, z: -8.8 },
  { x: -2.4, z: -5.3 },
  { x: 3.8, z: -9.7 },
  { x: 8.3, z: -4.1 },
  { x: -4.3, z: 5.4 },
  { x: 5.9, z: 7.1 },
  { x: 13.7, z: 6.2 }
];

const batteryPositions: EventVec2[] = [
  { x: -4.8, z: -2.2 },
  { x: 8.1, z: -2.1 },
  { x: 12.2, z: 2.7 }
];

const stickerPositions: EventVec2[] = [
  { x: -8.8, z: 7.8 },
  { x: -7.9, z: 6.8 },
  { x: -2.2, z: 9.7 },
  { x: -1.2, z: 8.8 },
  { x: 3.4, z: 8.8 },
  { x: 4.6, z: 9.7 },
  { x: 9.1, z: 4.5 },
  { x: 10.0, z: 3.6 },
  { x: 11.7, z: 7.8 },
  { x: 12.6, z: 6.9 },
  { x: -13.2, z: 3.8 },
  { x: -12.3, z: 4.8 }
];

const antiquePositions: EventVec2[] = [
  { x: -2.0, z: 7.4 },
  { x: 7.0, z: 4.2 },
  { x: -12.8, z: 6.0 }
];

const bottleCapPositions: EventVec2[] = [
  { x: -6.1, z: -3.0 },
  { x: 2.2, z: 5.0 },
  { x: 8.0, z: -5.1 },
  { x: 13.8, z: 0.8 },
  { x: -13.4, z: -0.9 },
  { x: -14.1, z: 8.3 },
  { x: -4.8, z: 2.8 },
  { x: 5.8, z: 2.9 },
  { x: 11.7, z: 8.1 },
  { x: 15.1, z: 2.6 }
];

const leftoverPositions: EventVec2[] = [
  { x: -6.8, z: -3.3 },
  { x: 1.6, z: 5.4 },
  { x: 9.0, z: -5.6 },
  { x: 13.4, z: 1.8 },
  { x: 15.0, z: 3.0 }
];

const ringLightPositions: EventVec2[] = [
  { x: -9.7, z: -3.4 },
  { x: -6.2, z: -1.9 },
  { x: -3.4, z: 2.8 },
  { x: 4.2, z: -2.5 },
  { x: 7.8, z: 5.6 }
];

const tearPositions: EventVec2[] = [
  { x: -8.1, z: -4.6 },
  { x: -5.0, z: -0.8 },
  { x: -1.2, z: 3.3 },
  { x: 2.6, z: 5.9 },
  { x: 8.8, z: 3.6 },
  { x: 12.9, z: -2.4 }
];

const strangeRockPositions: EventVec2[] = [
  { x: -12.3, z: -4.4 },
  { x: -9.3, z: -0.2 },
  { x: -6.8, z: -2.4 },
  { x: -4.0, z: -0.7 },
  { x: 1.4, z: -1.6 },
  { x: 8.2, z: 0.6 },
  { x: 12.8, z: 2.2 }
];

const lostItemPositions: EventVec2[] = [
  { x: -11.6, z: -3.1 },
  { x: -8.4, z: -0.5 },
  { x: -5.1, z: -1.9 },
  { x: 3.8, z: 0.5 }
];

function collectibles(type: CollectibleType, prefix: string, positions: EventVec2[], height = 0.58): EventCollectible[] {
  return positions.map((position, index) => ({
    id: `${prefix}-${String(index + 1).padStart(2, '0')}`,
    type,
    position,
    height
  }));
}

function definition(
  type: CollectibleType,
  label: string,
  pluralLabel: string,
  floatingText: string,
  tone: CollectibleDefinition['tone'] = 'normal'
): CollectibleDefinition {
  return { type, label, pluralLabel, floatingText, tone };
}

const commonDefinitions: EventConfig['collectibleDefinitions'] = {
  snack_bag: definition('snack_bag', 'Snack Bag', 'Snack Bags', '+1 Snack Bag'),
  mystery_package: definition('mystery_package', 'Mystery Package', 'Mystery Packages', '+1 Mystery Package'),
  drone_battery: definition('drone_battery', 'Drone Battery', 'Drone Batteries', '+1 Drone Battery', 'rare'),
  yard_sale_sticker: definition('yard_sale_sticker', 'Yard Sale Sticker', 'Yard Sale Stickers', '+1 Yard Sale Sticker'),
  questionable_antique: definition('questionable_antique', 'Questionable Antique', 'Questionable Antiques', '+1 Questionable Antique', 'rare'),
  shiny_bottle_cap: definition('shiny_bottle_cap', 'Shiny Bottle Cap', 'Shiny Bottle Caps', '+1 Shiny Bottle Cap'),
  premium_leftovers: definition('premium_leftovers', 'Premium Leftovers', 'Premium Leftovers', '+1 Premium Leftovers', 'rare'),
  ring_light_piece: definition('ring_light_piece', 'Ring Light Piece', 'Ring Light Pieces', '+1 Ring Light Piece'),
  fake_tear_drop: definition('fake_tear_drop', 'Fake Tear Drop', 'Fake Tear Drops', '+1 Fake Tear Drop'),
  apology_script: definition('apology_script', 'Apology Script', 'Apology Scripts', 'Missing Script Found', 'rare'),
  strange_rock: definition('strange_rock', 'Strange Rock', 'Strange Rocks', '+1 Strange Rock'),
  lost_town_item: definition('lost_town_item', 'Lost Town Item', 'Lost Town Items', '+1 Lost Town Item', 'rare')
};

export const gasStationGoblinPanic: EventConfig = {
  id: 'gas-station-goblin-panic',
  name: 'Gas Station Goblin Panic',
  subtitle: 'A limited-time Algorithm disaster',
  description:
    'A weird gas station goblin stole snack bags from Big Dale and scattered them around Chaos County.',
  introLore:
    'Chaos County keeps a handwritten list of Algorithm incidents behind the gas station register. Tonight, the ink smells like nacho cheese, the streetlights are flickering in hashtags, and Big Dale is already reaching for the emergency snack clipboard.',
  mainNpcId: 'big-dale',
  primaryCollectibleType: 'snack_bag',
  requiredCount: 10,
  reward: {
    coins: 100,
    cosmetic: 'goblin_hat',
    cosmeticLabel: 'Goblin Hat'
  },
  hudBannerText: 'Gas Station Goblin Panic',
  questSteps: [
    {
      id: 'talk-dale',
      type: 'talk',
      npcId: 'big-dale',
      objective: 'Talk to Big Dale at Dale Mart.',
      dialogue:
        'Listen, friend. The Gas Station Goblin cleaned out my snack rack and ran giggling into the neighborhood. Bring back 10 stolen snack bags and I will make it worth your while. Last week the Algorithm made my ice machine predict birthdays, so I am handling this one early.'
    },
    {
      id: 'collect-snacks',
      type: 'collect',
      collectibleType: 'snack_bag',
      requiredCount: 10,
      objective: 'Collect 10 stolen snack bags around town.',
      completionText: 'You found every stolen snack bag. Big Dale is waiting at the gas station.'
    },
    {
      id: 'return-to-dale',
      type: 'return',
      npcId: 'big-dale',
      objective: 'Return the snack bags to Big Dale.',
      dialogue: 'You did it. Here is 100 coins and one questionable Goblin Hat. Wear it with brave confusion.'
    }
  ],
  collectibleDefinitions: commonDefinitions,
  collectibles: collectibles('snack_bag', 'snack', snackPositions),
  interactionZones: [],
  temporaryDecorations: [
    { id: 'gas-crates', kind: 'scattered_boxes', position: [-8.1, 0, -3.4], scale: 1.0 },
    { id: 'goblin-sign-a', kind: 'warning_sign', position: [-12.2, 0, -3.0], rotationY: -0.3, scale: 0.8 }
  ],
  eventNpcs: [],
  dialogue: {
    start:
      'Listen, friend. The Gas Station Goblin cleaned out my snack rack and ran giggling into the neighborhood. Bring back 10 stolen snack bags and I will make it worth your while. Last week the Algorithm made my ice machine predict birthdays, so I am handling this one early.',
    active:
      'Those snack bags are still out there. Check driveways, back lots, fences, and anywhere a goblin would think was hilarious. If you hear tiny chewing, do not negotiate.',
    ready:
      'You found all 10? Bless this county and its suspiciously useful hero. Come collect your reward.',
    completed:
      'The shelves are safe again. You earned 100 coins and the Goblin Hat. I will pretend that hat is normal, which is how this town survives.',
    npcLines: {
      'tammy-two-phones':
        'My left phone says the goblin is real. My right phone says he has a brand strategy. Both are ringing, and neither one has apologized for last week.',
      'mayor-buck':
        'Everything is under control. I have appointed a snack advisory committee and given it a very sturdy clipboard. The Algorithm respects forms, probably.'
    }
  },
  completionScreen: {
    title: 'Snack Shelves Saved',
    body: 'You returned Big Dale\'s stolen snack bags and calmed the county for now.',
    reaction: 'Tammy is already posting a blurry hat photo, and Mayor Buck has declared the snack aisle a temporary heritage site.'
  }
};

export const eventConfigs: Record<EventId, EventConfig> = {
  'gas-station-goblin-panic': gasStationGoblinPanic,
  'drone-swarm-over-dales': {
    id: 'drone-swarm-over-dales',
    name: "Drone Swarm Over Dale's",
    subtitle: 'Nobody ordered this much sky mail',
    description:
      'Suspicious delivery drones are hovering over the gas station and dropping mystery packages across town.',
    introLore:
      'The Algorithm found the county shipping database and started improvising. Now Dale Mart has a buzzing ceiling, Tammy has a sky conspiracy thread, and Mayor Buck has asked everyone to remain calm beneath the suspicious packages.',
    mainNpcId: 'big-dale',
    primaryCollectibleType: 'mystery_package',
    requiredCount: 8,
    reward: {
      coins: 150,
      cosmetic: 'tin_foil_cap',
      cosmeticLabel: 'Tin Foil Cap',
      badge: 'Airspace Defender'
    },
    hudBannerText: "Drone Swarm Over Dale's",
    questSteps: [
      {
        id: 'talk-dale-drones',
        type: 'talk',
        npcId: 'big-dale',
        objective: 'Talk to Big Dale about the drones.',
        dialogue:
          "Nobody ordered 47 boxes of off-brand phone chargers. That's how they get ya. First it is drones, then it is coupons that know your middle name."
      },
      {
        id: 'collect-packages',
        type: 'collect',
        collectibleType: 'mystery_package',
        requiredCount: 8,
        objective: 'Collect 8 mystery packages around town.',
        completionText: 'The mystery packages are secured. The drones still need their batteries dealt with.'
      },
      {
        id: 'collect-batteries',
        type: 'collect',
        collectibleType: 'drone_battery',
        requiredCount: 3,
        objective: 'Find 3 drone batteries near streetlights and power poles.',
        completionText: 'The drone batteries are in your bag. Big Dale has one more deeply normal request.'
      },
      {
        id: 'return-dale-drones',
        type: 'return',
        npcId: 'big-dale',
        objective: 'Return to Big Dale.',
        dialogue:
          'Good. Now place this signal jammer behind the gas station before a toaster gets delivered to my roof. The Algorithm hates a confident metal box.'
      },
      {
        id: 'place-jammer',
        type: 'interact',
        zoneIds: ['signal-jammer-zone'],
        requiredCount: 1,
        objective: 'Place the signal jammer behind the gas station.',
        completionText: 'The jammer hums to life. The drones wobble away like they just remembered a meeting.'
      }
    ],
    collectibleDefinitions: commonDefinitions,
    collectibles: [
      ...collectibles('mystery_package', 'package', packagePositions),
      ...collectibles('drone_battery', 'battery', batteryPositions)
    ],
    interactionZones: [
      {
        id: 'signal-jammer-zone',
        label: 'Signal Jammer Spot',
        position: { x: -11.7, z: -8.7 },
        radius: 1.3,
        prompt: 'Place Jammer',
        markerColor: '#9fd7ff'
      }
    ],
    temporaryDecorations: [
      { id: 'drone-a', kind: 'delivery_drone', position: [-10.8, 4.2, -4.0], scale: 1.0 },
      { id: 'drone-b', kind: 'delivery_drone', position: [-5.0, 4.8, -6.8], scale: 0.9 },
      { id: 'drone-c', kind: 'delivery_drone', position: [4.5, 4.4, -5.5], scale: 0.86 },
      { id: 'drone-d', kind: 'delivery_drone', position: [10.6, 4.2, 4.2], scale: 0.92 },
      { id: 'drone-crates', kind: 'drone_crate', position: [-12.4, 0, -3.3], scale: 1.0 },
      { id: 'signal-jammer-prop', kind: 'signal_jammer', position: [-11.7, 0, -8.7], scale: 0.8, zoneId: 'signal-jammer-zone' }
    ],
    eventNpcs: [],
    dialogue: {
      start:
        "Nobody ordered 47 boxes of off-brand phone chargers. That's how they get ya. First it is drones, then it is coupons that know your middle name.",
      active:
        'The sky is buzzing and my snack aisle is emotionally unavailable. Grab packages, batteries, and anything humming with bad intent.',
      ready: 'Bring those batteries here. We are grounding the county with science and suspicion.',
      completed:
        'Airspace is clear. The Tin Foil Cap is yours. Do not let it touch the microwave. Or Tammy\'s left phone.',
      npcLines: {
        'tammy-two-phones':
          "I saw one drone wink at me. Drones don't have eyes, but I know what I saw. I am calling this one #SkyOops.",
        'mayor-buck':
          'The town has full control of the sky situation. Please do not look up. That is not a law, but it is advice with official stationery.'
      }
    },
    completionScreen: {
      title: 'Airspace Defended',
      body: 'The drones left Dale Mart alone, and the county has learned absolutely nothing about online shipping.',
      reaction:
        'Big Dale taped a thank-you note to the jammer, and Tammy is insisting the drones now follow her private account.'
    }
  },
  'great-yard-sale-stampede': {
    id: 'great-yard-sale-stampede',
    name: 'The Great Yard Sale Stampede',
    subtitle: 'One cursed recliner, many bad decisions',
    description:
      'Tammy posted about a possibly haunted recliner, and the whole town is digging through yard sales.',
    introLore:
      'Every Saturday, Chaos County pretends it is normal by selling lamps on card tables. Then the Algorithm boosts one rumor about a cursed recliner, and suddenly every driveway becomes a treasure hunt with emotional consequences.',
    mainNpcId: 'tammy-two-phones',
    primaryCollectibleType: 'yard_sale_sticker',
    requiredCount: 12,
    reward: {
      coins: 125,
      cosmetic: 'bargain_hunter_visor',
      cosmeticLabel: 'Bargain Hunter Visor',
      unlockable: 'Cursed Recliner'
    },
    hudBannerText: 'The Great Yard Sale Stampede',
    questSteps: [
      {
        id: 'talk-tammy-sale',
        type: 'talk',
        npcId: 'tammy-two-phones',
        objective: 'Talk to Tammy near the neighborhood.',
        dialogue:
          'I said it MIGHT be haunted. People really need to start reading the second half of my posts. The Algorithm clipped the cautious part again.'
      },
      {
        id: 'inspect-yard-sales',
        type: 'interact',
        zoneIds: ['yard-table-a', 'yard-table-b', 'yard-table-c', 'yard-table-d', 'yard-table-e'],
        requiredCount: 5,
        objective: 'Search 5 yard sale tables around town.',
        completionText: 'Every table has been inspected. The neighborhood feels judged.'
      },
      {
        id: 'collect-stickers',
        type: 'collect',
        collectibleType: 'yard_sale_sticker',
        requiredCount: 12,
        objective: 'Collect 12 yard sale price stickers.',
        completionText: 'You gathered enough stickers to price a small disaster.'
      },
      {
        id: 'collect-antiques',
        type: 'collect',
        collectibleType: 'questionable_antique',
        requiredCount: 3,
        objective: 'Find 3 questionable antiques.',
        completionText: 'The questionable antiques hum quietly in your inventory. Probably fine.'
      },
      {
        id: 'inspect-recliner',
        type: 'interact',
        zoneIds: ['cursed-recliner-zone'],
        requiredCount: 1,
        objective: 'Inspect the final cursed recliner behind a house.',
        completionText: 'The recliner creaks with historical opinions.'
      },
      {
        id: 'return-tammy-sale',
        type: 'return',
        npcId: 'tammy-two-phones',
        objective: 'Return to Tammy.',
        dialogue:
          'So the recliner is real, lightly cursed, and honestly pretty comfy. That is content. Also possibly evidence. Mostly content.'
      }
    ],
    collectibleDefinitions: commonDefinitions,
    collectibles: [
      ...collectibles('yard_sale_sticker', 'sticker', stickerPositions, 0.5),
      ...collectibles('questionable_antique', 'antique', antiquePositions, 0.6)
    ],
    interactionZones: [
      { id: 'yard-table-a', label: 'Yard Sale Table', position: { x: -8.6, z: 7.2 }, radius: 1.1, prompt: 'Inspect Table', markerColor: '#ffd58e' },
      { id: 'yard-table-b', label: 'Yard Sale Table', position: { x: -1.7, z: 8.8 }, radius: 1.1, prompt: 'Inspect Table', markerColor: '#ffd58e' },
      { id: 'yard-table-c', label: 'Yard Sale Table', position: { x: 4.1, z: 9.2 }, radius: 1.1, prompt: 'Inspect Table', markerColor: '#ffd58e' },
      { id: 'yard-table-d', label: 'Yard Sale Table', position: { x: 9.6, z: 4.1 }, radius: 1.1, prompt: 'Inspect Table', markerColor: '#ffd58e' },
      { id: 'yard-table-e', label: 'Yard Sale Table', position: { x: -12.7, z: 4.4 }, radius: 1.1, prompt: 'Inspect Table', markerColor: '#ffd58e' },
      { id: 'cursed-recliner-zone', label: 'Cursed Recliner', position: { x: 11.2, z: 8.8 }, radius: 1.2, prompt: 'Inspect Recliner', markerColor: '#b789ff' }
    ],
    temporaryDecorations: [
      { id: 'yard-table-a-prop', kind: 'yard_sale_table', position: [-8.6, 0, 7.2], rotationY: 0.2, scale: 0.95, zoneId: 'yard-table-a' },
      { id: 'yard-table-b-prop', kind: 'yard_sale_table', position: [-1.7, 0, 8.8], rotationY: -0.25, scale: 0.95, zoneId: 'yard-table-b' },
      { id: 'yard-table-c-prop', kind: 'yard_sale_table', position: [4.1, 0, 9.2], rotationY: 0.45, scale: 0.95, zoneId: 'yard-table-c' },
      { id: 'yard-table-d-prop', kind: 'yard_sale_table', position: [9.6, 0, 4.1], rotationY: -0.5, scale: 0.95, zoneId: 'yard-table-d' },
      { id: 'yard-table-e-prop', kind: 'yard_sale_table', position: [-12.7, 0, 4.4], rotationY: 0.1, scale: 0.95, zoneId: 'yard-table-e' },
      { id: 'cursed-recliner-prop', kind: 'cursed_recliner', position: [11.2, 0, 8.8], rotationY: -0.4, scale: 0.95, zoneId: 'cursed-recliner-zone' }
    ],
    eventNpcs: [],
    dialogue: {
      start:
        'I said it MIGHT be haunted. People really need to start reading the second half of my posts. The Algorithm clipped the cautious part again.',
      active:
        'Check the yard sales before someone tries to haggle with an antique that blinks. Stickers first, questions later.',
      ready: 'You found the recliner? Tell me it did not choose a new owner.',
      completed:
        'Great news: everyone is embarrassed and I have already drafted a follow-up post called Things I Never Said But Technically Started.',
      npcLines: {
        'big-dale':
          'Never trust a recliner with cupholders and a history. I learned that during the Algorithm futon incident.',
        'mayor-buck':
          'All yard sales are currently considered emotionally unstable. The county recommends exact change and deep breathing.'
      }
    },
    completionScreen: {
      title: 'Bargain Crisis Contained',
      body: 'The cursed recliner has been identified, priced, and politely removed from the rumor cycle.',
      reaction:
        'Tammy marked the post as resolved, which in Chaos County means everyone has twelve new theories.'
    }
  },
  'raccoon-union-strike': {
    id: 'raccoon-union-strike',
    name: 'Raccoon Union Strike',
    subtitle: 'A very serious trash labor dispute',
    description:
      'The town raccoons have unionized and blocked the trash pickup route until leftovers improve.',
    introLore:
      'After three Algorithm disasters in one month, even the nighttime trash crowd got organized. Mayor Buck says this is a civic challenge. The tiny podium near the woods gate suggests it is also a press conference.',
    mainNpcId: 'mayor-buck',
    primaryCollectibleType: 'shiny_bottle_cap',
    requiredCount: 10,
    reward: {
      coins: 175,
      cosmetic: 'trash_king_crown',
      cosmeticLabel: 'Trash King Crown',
      badge: 'Union Negotiator'
    },
    hudBannerText: 'Raccoon Union Strike',
    questSteps: [
      {
        id: 'talk-mayor-raccoons',
        type: 'talk',
        npcId: 'mayor-buck',
        objective: 'Talk to Mayor Buck at Town Hall.',
        dialogue:
          'I support workers. I just did not know that included raccoons with clipboards. The Algorithm has widened the definition of town staff.'
      },
      {
        id: 'visit-trash-spots',
        type: 'interact',
        zoneIds: ['trash-spot-a', 'trash-spot-b', 'trash-spot-c', 'trash-spot-d'],
        requiredCount: 4,
        objective: 'Visit 4 blocked trash pickup spots.',
        completionText: 'You documented every blocked trash stop. The clipboard energy is strong.'
      },
      {
        id: 'collect-caps',
        type: 'collect',
        collectibleType: 'shiny_bottle_cap',
        requiredCount: 10,
        objective: 'Collect 10 shiny bottle caps.',
        completionText: 'The bottle caps are shiny enough for diplomacy.'
      },
      {
        id: 'collect-leftovers',
        type: 'collect',
        collectibleType: 'premium_leftovers',
        requiredCount: 5,
        objective: 'Find 5 premium leftovers.',
        completionText: 'You found leftovers with the confidence of a catered meeting.'
      },
      {
        id: 'deliver-supplies',
        type: 'interact',
        zoneIds: ['raccoon-meeting-zone'],
        requiredCount: 1,
        objective: 'Deliver negotiation supplies near the woods gate.',
        completionText: 'The supplies are on the podium. The union is ready to talk.'
      },
      {
        id: 'talk-union-rep',
        type: 'talk',
        npcId: 'raccoon-union-rep',
        objective: 'Talk to the Raccoon Union Rep.',
        dialogue: 'We demand dignity, dental, and first pick of pizza crusts.'
      },
      {
        id: 'return-mayor-raccoons',
        type: 'return',
        npcId: 'mayor-buck',
        objective: 'Return to Mayor Buck.',
        dialogue:
          'Excellent. I will issue a proclamation recognizing nighttime as a valid shift. Please do not ask who funds the tiny dental plan.'
      }
    ],
    collectibleDefinitions: commonDefinitions,
    collectibles: [
      ...collectibles('shiny_bottle_cap', 'cap', bottleCapPositions, 0.48),
      ...collectibles('premium_leftovers', 'leftover', leftoverPositions, 0.58)
    ],
    interactionZones: [
      { id: 'trash-spot-a', label: 'Blocked Trash Stop', position: { x: -6.1, z: -3.0 }, radius: 1.1, prompt: 'Inspect Route', markerColor: '#a3d977' },
      { id: 'trash-spot-b', label: 'Blocked Trash Stop', position: { x: 2.2, z: 5.0 }, radius: 1.1, prompt: 'Inspect Route', markerColor: '#a3d977' },
      { id: 'trash-spot-c', label: 'Blocked Trash Stop', position: { x: 8.0, z: -5.1 }, radius: 1.1, prompt: 'Inspect Route', markerColor: '#a3d977' },
      { id: 'trash-spot-d', label: 'Blocked Trash Stop', position: { x: 13.8, z: 0.8 }, radius: 1.1, prompt: 'Inspect Route', markerColor: '#a3d977' },
      { id: 'raccoon-meeting-zone', label: 'Union Meeting Spot', position: { x: 15.0, z: 3.0 }, radius: 1.35, prompt: 'Deliver Supplies', markerColor: '#ffe08a' }
    ],
    temporaryDecorations: [
      { id: 'trash-blockade-a', kind: 'trash_blockade', position: [-6.1, 0, -3.0], scale: 0.9, zoneId: 'trash-spot-a' },
      { id: 'trash-blockade-b', kind: 'trash_blockade', position: [2.2, 0, 5.0], scale: 0.9, zoneId: 'trash-spot-b' },
      { id: 'trash-blockade-c', kind: 'trash_blockade', position: [8.0, 0, -5.1], scale: 0.9, zoneId: 'trash-spot-c' },
      { id: 'trash-blockade-d', kind: 'trash_blockade', position: [13.8, 0, 0.8], scale: 0.9, zoneId: 'trash-spot-d' },
      { id: 'raccoon-podium', kind: 'raccoon_podium', position: [15.0, 0, 3.0], scale: 0.9, zoneId: 'raccoon-meeting-zone' },
      { id: 'strike-sign-a', kind: 'protest_sign', position: [14.1, 0, 2.4], rotationY: -0.3, scale: 0.8 },
      { id: 'strike-sign-b', kind: 'protest_sign', position: [15.7, 0, 2.1], rotationY: 0.35, scale: 0.8 }
    ],
    eventNpcs: [
      {
        id: 'raccoon-union-rep',
        name: 'Union Rep',
        title: 'Trash Local 404',
        model: characterAssets.raccoonRep,
        position: { x: 15.4, z: 3.4 },
        rotationY: -Math.PI / 2,
        dialogue: 'We demand dignity, dental, and first pick of pizza crusts.'
      }
    ],
    dialogue: {
      start:
        'I support workers. I just did not know that included raccoons with clipboards. The Algorithm has widened the definition of town staff.',
      active:
        'Please resolve this before the sanitation department asks for a mediator. Gather shiny caps and premium leftovers with diplomatic posture.',
      ready: 'The union is listening. Be respectful, and do not mention the word pest.',
      completed:
        'The trash route is moving again, and I have learned a great deal about collective bargaining, mostly from a clipboard I am afraid to touch.',
      npcLines: {
        'tammy-two-phones':
          'I respect the movement. I just want my trash can back. Their social media rollout is honestly disciplined.',
        'big-dale':
          'I have never seen a strike line move that quietly. Last week\'s goblin had less organizational structure.'
      }
    },
    completionScreen: {
      title: 'Agreement Reached',
      body: 'Trash pickup resumed after a historic agreement involving leftovers, bottle caps, and official nighttime recognition.',
      reaction:
        'Mayor Buck filed the agreement under Wildlife, Labor, and Probably The Algorithm Again.'
    }
  },
  'influencer-apology-tour': {
    id: 'influencer-apology-tour',
    name: 'Influencer Apology Tour',
    subtitle: 'A crisis with 312 followers',
    description:
      'Chad Thunder lost the props for a redo of his apology video, and Tammy wants the situation contained.',
    introLore:
      'The Algorithm loves apologies almost as much as it loves making the gas station weird. Chad Thunder stepped in front of pump three with a ring light, three rehearsed sighs, and no idea why the town was watching.',
    mainNpcId: 'tammy-two-phones',
    primaryCollectibleType: 'ring_light_piece',
    requiredCount: 5,
    reward: {
      coins: 140,
      cosmetic: 'influencer_shades',
      cosmeticLabel: 'Influencer Shades',
      badge: 'Publicist for Hire'
    },
    hudBannerText: 'Influencer Apology Tour',
    questSteps: [
      {
        id: 'talk-tammy-chad',
        type: 'talk',
        npcId: 'tammy-two-phones',
        objective: 'Talk to Tammy Two-Phones.',
        dialogue:
          'He has 312 followers and a manager. That is how you know it is serious. The Algorithm smells sincerity like popcorn.'
      },
      {
        id: 'find-chad',
        type: 'talk',
        npcId: 'chad-thunder',
        objective: 'Find Chad Thunder near the gas station.',
        dialogue:
          'I want to take full accountability for whatever everyone says I did. I also want the lighting to suggest personal growth.'
      },
      {
        id: 'collect-ring-lights',
        type: 'collect',
        collectibleType: 'ring_light_piece',
        requiredCount: 5,
        objective: 'Collect 5 ring light pieces.',
        completionText: 'The ring light is mostly a circle again.'
      },
      {
        id: 'collect-tears',
        type: 'collect',
        collectibleType: 'fake_tear_drop',
        requiredCount: 6,
        objective: 'Collect 6 fake tear drops.',
        completionText: 'The fake tears shimmer with professional regret.'
      },
      {
        id: 'find-script',
        type: 'collect',
        collectibleType: 'apology_script',
        requiredCount: 1,
        objective: 'Find the missing apology script in the back lot.',
        completionText: 'You found the missing apology script. It has bullet points and panic stains.'
      },
      {
        id: 'return-chad',
        type: 'return',
        npcId: 'chad-thunder',
        objective: 'Bring everything back to Chad.',
        dialogue:
          'Perfect. Now help me choose a tone that says growth, but also sponsorship-ready. My manager says the county deserves closure and a thumbnail.'
      },
      {
        id: 'choose-apology',
        type: 'choice',
        objective: 'Choose Chad Thunder\'s apology style.',
        prompt: 'Pick the apology style for Chad Thunder.',
        choices: [
          {
            id: 'dramatic',
            label: 'Dramatic',
            dialogue: 'Chad whispers into the ring light like it personally forgave him.'
          },
          {
            id: 'corporate',
            label: 'Corporate',
            dialogue: 'Chad says the word stakeholders six times and apologizes to the brand ecosystem.'
          },
          {
            id: 'confusing',
            label: 'Completely Confusing',
            dialogue: 'Chad apologizes to a parking meter. Somehow, the comments love it.'
          }
        ]
      }
    ],
    collectibleDefinitions: commonDefinitions,
    collectibles: [
      ...collectibles('ring_light_piece', 'ring-piece', ringLightPositions, 0.6),
      ...collectibles('fake_tear_drop', 'tear', tearPositions, 0.68),
      { id: 'apology-script-01', type: 'apology_script', position: { x: -12.7, z: -7.9 }, height: 0.54 }
    ],
    interactionZones: [],
    temporaryDecorations: [
      { id: 'camera-tripod', kind: 'camera_tripod', position: [-9.8, 0, -3.6], rotationY: 0.35, scale: 0.9 },
      { id: 'broken-ring-light', kind: 'broken_ring_light', position: [-8.8, 0, -3.7], rotationY: -0.2, scale: 0.9 },
      { id: 'influencer-boxes', kind: 'scattered_boxes', position: [-11.6, 0, -3.4], scale: 0.8 }
    ],
    eventNpcs: [
      {
        id: 'chad-thunder',
        name: 'Chad Thunder',
        title: 'Local Influencer',
        model: characterAssets.chad,
        position: { x: -8.6, z: -3.0 },
        rotationY: Math.PI,
        dialogue: 'I want to take full accountability for whatever everyone says I did.'
      }
    ],
    dialogue: {
      start:
        'He has 312 followers and a manager. That is how you know it is serious. The Algorithm smells sincerity like popcorn.',
      active:
        'Find his gear before he records a second apology for losing the first apology. Check the back lot for anything suspiciously branded.',
      ready: 'Chad is ready to say words near a camera. That is usually where the trouble starts.',
      completed:
        'That apology had layers. I am not saying they were good layers, but they were layers. Chaos County will discuss them at dinner.',
      npcLines: {
        'big-dale':
          'He apologized in front of pump three. That pump has seen enough. It still has feelings from the drone thing.',
        'mayor-buck':
          'I support accountability, especially when someone else understands the situation. My statement is currently in draft.'
      }
    },
    completionScreen: {
      title: 'Apology Uploaded',
      body: 'Chad Thunder has released a new statement, and Chaos County has chosen to move on for at least eleven minutes.',
      reaction:
        'Tammy clipped the confusing part, Big Dale banned tripods from pump three, and Chad called it a healing arc.'
    }
  },
  'mysterious-sinkhole-behind-the-mini-mart': {
    id: 'mysterious-sinkhole-behind-the-mini-mart',
    name: 'Mysterious Sinkhole Behind the Mini-Mart',
    subtitle: 'Probably decorative. Probably.',
    description:
      'A glowing sinkhole opened behind the gas station, and strange objects keep popping out of it.',
    introLore:
      'Behind Dale Mart, the pavement has started glowing like the Algorithm dropped a moon under the asphalt. The town insists it is fine because the alternative requires a subcommittee and better cones.',
    mainNpcId: 'big-dale',
    primaryCollectibleType: 'strange_rock',
    requiredCount: 7,
    reward: {
      coins: 200,
      cosmetic: 'hazard_vest',
      cosmeticLabel: 'Hazard Vest',
      unlockable: 'Sinkhole Depths'
    },
    hudBannerText: 'Mysterious Sinkhole Behind the Mini-Mart',
    questSteps: [
      {
        id: 'talk-dale-sinkhole',
        type: 'talk',
        npcId: 'big-dale',
        objective: 'Talk to Big Dale behind the gas station.',
        dialogue:
          'I am not saying the hole is alive. I am saying it coughed up my old lunchbox. It had my name on it and a note that said unsubscribe.'
      },
      {
        id: 'investigate-sinkhole',
        type: 'interact',
        zoneIds: ['sinkhole-zone'],
        requiredCount: 1,
        objective: 'Investigate the glowing sinkhole.',
        completionText: 'The sinkhole glows back. That feels rude.'
      },
      {
        id: 'collect-rocks',
        type: 'collect',
        collectibleType: 'strange_rock',
        requiredCount: 7,
        objective: 'Collect 7 strange rocks around the back lot and roads.',
        completionText: 'The strange rocks are warm, which rocks traditionally are not.'
      },
      {
        id: 'collect-lost-items',
        type: 'collect',
        collectibleType: 'lost_town_item',
        requiredCount: 4,
        objective: 'Collect 4 lost town items spat out by the sinkhole.',
        completionText: 'The lost town items are accounted for, though nobody wants to explain them.'
      },
      {
        id: 'place-cones',
        type: 'interact',
        zoneIds: ['cone-zone-a', 'cone-zone-b', 'cone-zone-c'],
        requiredCount: 3,
        objective: 'Place 3 warning cones around the sinkhole.',
        completionText: 'The cones form a legally convincing triangle.'
      },
      {
        id: 'talk-mayor-sinkhole',
        type: 'talk',
        npcId: 'mayor-buck',
        objective: 'Talk to Mayor Buck.',
        dialogue:
          'The hole has been reviewed and is currently classified as mostly decorative. That classification expires if it starts humming again.'
      },
      {
        id: 'return-dale-sinkhole',
        type: 'return',
        npcId: 'big-dale',
        objective: 'Return to Big Dale.',
        dialogue:
          'Good work. If the hole asks for a rewards card, you did not hear it from me. The Algorithm already gets enough points.'
      }
    ],
    collectibleDefinitions: commonDefinitions,
    collectibles: [
      ...collectibles('strange_rock', 'rock', strangeRockPositions, 0.54),
      ...collectibles('lost_town_item', 'lost-item', lostItemPositions, 0.58)
    ],
    interactionZones: [
      { id: 'sinkhole-zone', label: 'Glowing Sinkhole', position: { x: -12.0, z: -8.1 }, radius: 1.55, prompt: 'Investigate', markerColor: '#9d7cff' },
      { id: 'cone-zone-a', label: 'Cone Spot', position: { x: -13.1, z: -7.4 }, radius: 0.9, prompt: 'Place Cone', markerColor: '#ffb36b' },
      { id: 'cone-zone-b', label: 'Cone Spot', position: { x: -11.0, z: -7.2 }, radius: 0.9, prompt: 'Place Cone', markerColor: '#ffb36b' },
      { id: 'cone-zone-c', label: 'Cone Spot', position: { x: -12.0, z: -9.3 }, radius: 0.9, prompt: 'Place Cone', markerColor: '#ffb36b' }
    ],
    temporaryDecorations: [
      { id: 'sinkhole-core', kind: 'glowing_sinkhole', position: [-12.0, 0, -8.1], scale: 1.05, zoneId: 'sinkhole-zone' },
      { id: 'sinkhole-cone-a', kind: 'warning_cone', position: [-13.1, 0, -7.4], scale: 0.75, zoneId: 'cone-zone-a' },
      { id: 'sinkhole-cone-b', kind: 'warning_cone', position: [-11.0, 0, -7.2], scale: 0.75, zoneId: 'cone-zone-b' },
      { id: 'sinkhole-cone-c', kind: 'warning_cone', position: [-12.0, 0, -9.3], scale: 0.75, zoneId: 'cone-zone-c' },
      { id: 'sinkhole-warning-sign', kind: 'warning_sign', position: [-10.3, 0, -8.9], rotationY: 0.45, scale: 0.85 }
    ],
    eventNpcs: [],
    dialogue: {
      start:
        'I am not saying the hole is alive. I am saying it coughed up my old lunchbox. It had my name on it and a note that said unsubscribe.',
      active:
        'The back lot is glowing again. Please make the glowing less legally complicated. Rocks, lost items, cones. In that order if possible.',
      ready: 'Mayor Buck called it decorative. I am going to need a second opinion from someone with eyes.',
      completed:
        'The hole is coned off, the rocks are contained, and I am choosing optimism with both hands.',
      npcLines: {
        'tammy-two-phones':
          'I posted one picture and now people are calling it a portal. Which it might be. My comments are split between science and vibes.',
        'mayor-buck':
          'The hole has been reviewed and is currently classified as mostly decorative. That classification expires if it starts humming again.'
      }
    },
    completionScreen: {
      title: 'Sinkhole Secured',
      body: 'The glowing back-lot anomaly is now surrounded by cones, which is close enough to science for today.',
      reaction:
        'Big Dale taped a loyalty-card application to the warning sign just in case the depths become customers.'
    }
  }
};

export const eventList = Object.values(eventConfigs);
export const defaultEventId: EventId = 'gas-station-goblin-panic';

export function getEventConfig(eventId: EventId): EventConfig {
  return eventConfigs[eventId] ?? eventConfigs[defaultEventId];
}

export function getCollectibleDefinition(event: EventConfig, type: CollectibleType): CollectibleDefinition {
  return event.collectibleDefinitions[type] ?? commonDefinitions[type];
}

export function countCollectedType(event: EventConfig, collectedItemIds: string[], type: CollectibleType): number {
  const ids = new Set(collectedItemIds);
  return event.collectibles.filter((item) => item.type === type && ids.has(item.id)).length;
}

// To add a future event, create one EventConfig entry above with a questSteps sequence,
// matching collectibles, zones, decorations, rewards, and dialogue hooks. The shared
// store and scene components will handle activation, progress, saving, and rewards.
