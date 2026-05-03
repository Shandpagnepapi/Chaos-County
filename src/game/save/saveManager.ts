import { gasStationGoblinPanic, type QuestStatus } from '../config/events';
import { playerStartPosition, type Vec2 } from '../config/world';

export const SAVE_KEY = 'chaos-county-3d-save-v1';

export interface SaveData {
  version: 1;
  playerPosition: Vec2;
  coins: number;
  collectedItemIds: string[];
  snackBagsCollected: number;
  questStatus: QuestStatus;
  questCompleted: boolean;
  goblinHatUnlocked: boolean;
  introCompleted: boolean;
}

export function createNewSave(): SaveData {
  return {
    version: 1,
    playerPosition: playerStartPosition,
    coins: 0,
    collectedItemIds: [],
    snackBagsCollected: 0,
    questStatus: 'not_started',
    questCompleted: false,
    goblinHatUnlocked: false,
    introCompleted: false
  };
}

export function loadSave(): SaveData | undefined {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as Partial<SaveData>;
    return {
      ...createNewSave(),
      ...parsed,
      playerPosition: parsed.playerPosition ?? playerStartPosition,
      collectedItemIds: parsed.collectedItemIds ?? [],
      snackBagsCollected: parsed.collectedItemIds?.length ?? parsed.snackBagsCollected ?? 0,
      questStatus: parsed.questCompleted ? 'completed' : parsed.questStatus ?? 'not_started'
    };
  } catch {
    return undefined;
  }
}

export function hasSave(): boolean {
  return Boolean(loadSave());
}

export function saveGame(data: SaveData): void {
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      ...data,
      snackBagsCollected: data.collectedItemIds.length,
      questCompleted: data.questStatus === 'completed',
      version: 1
    } satisfies SaveData)
  );
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function getQuestLine(save: SaveData): string {
  if (save.questStatus === 'not_started') {
    return 'Talk to Big Dale at Dale Mart.';
  }

  if (save.questStatus === 'completed') {
    return 'Snack shelves restored. The Goblin Hat is unlocked.';
  }

  const count = save.collectedItemIds.length;
  if (count >= gasStationGoblinPanic.requiredCount) {
    return 'Return the snack bags to Big Dale.';
  }

  return `Collect stolen snack bags around town. ${count}/${gasStationGoblinPanic.requiredCount}`;
}
