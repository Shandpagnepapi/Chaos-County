export type QuestStatus = 'not_started' | 'active' | 'ready_to_return' | 'completed';

export interface EventConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  collectibleType: 'snack_bag';
  requiredCount: number;
  rewardCoins: number;
  rewardCosmetic: 'goblin_hat';
  hudBannerText: string;
  questDialogue: {
    start: string;
    active: string;
    ready: string;
    completed: string;
  };
  decorations: string[];
}

export const gasStationGoblinPanic: EventConfig = {
  id: 'gas-station-goblin-panic',
  name: 'Gas Station Goblin Panic',
  subtitle: 'A limited-time Algorithm disaster',
  description:
    'A weird gas station goblin stole snack bags from Big Dale and scattered them around Chaos County.',
  collectibleType: 'snack_bag',
  requiredCount: 10,
  rewardCoins: 100,
  rewardCosmetic: 'goblin_hat',
  hudBannerText: 'Gas Station Goblin Panic',
  questDialogue: {
    start:
      'Listen, friend. The Gas Station Goblin cleaned out my snack rack and ran giggling into the neighborhood. Bring back 10 stolen snack bags and I will make it worth your while.',
    active:
      'Those snack bags are still out there. Check driveways, back lots, fences, and anywhere a goblin would think was hilarious.',
    ready:
      'You found all 10? Bless this county and its suspiciously useful hero. Come collect your reward.',
    completed:
      'The shelves are safe again. You earned 100 coins and the Goblin Hat. I will pretend that hat is normal.'
  },
  decorations: ['snack-dust', 'goblin-signs', 'gas-station-crates']
};
