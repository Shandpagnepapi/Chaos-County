import {
  countCollectedType,
  defaultEventId,
  getEventConfig,
  type EventId,
  type QuestStatus
} from '../config/events';
import { playerStartPosition, type Vec2 } from '../config/world';

export const SAVE_KEY = 'chaos-county-3d-save-v2';
const LEGACY_SAVE_KEY = 'chaos-county-3d-save-v1';

export interface EventProgress {
  status: QuestStatus;
  stepIndex: number;
  collectedItemIds: string[];
  completedZoneIds: string[];
  choiceId?: string;
}

export interface SaveData {
  version: 2;
  activeEventId: EventId;
  playerPosition: Vec2;
  coins: number;
  progressByEvent: Partial<Record<EventId, EventProgress>>;
  unlockedCosmetics: string[];
  earnedBadges: string[];
  introCompleted: boolean;
}

interface LegacySaveData {
  playerPosition?: Vec2;
  coins?: number;
  collectedItemIds?: string[];
  questStatus?: QuestStatus;
  questCompleted?: boolean;
  goblinHatUnlocked?: boolean;
  introCompleted?: boolean;
}

export function createEventProgress(): EventProgress {
  return {
    status: 'not_started',
    stepIndex: 0,
    collectedItemIds: [],
    completedZoneIds: []
  };
}

export function ensureEventProgress(save: SaveData, eventId: EventId): EventProgress {
  return save.progressByEvent[eventId] ?? createEventProgress();
}

export function createNewSave(activeEventId: EventId = defaultEventId): SaveData {
  return {
    version: 2,
    activeEventId,
    playerPosition: playerStartPosition,
    coins: 0,
    progressByEvent: {
      [activeEventId]: createEventProgress()
    },
    unlockedCosmetics: [],
    earnedBadges: [],
    introCompleted: false
  };
}

function migrateLegacySave(): SaveData | undefined {
  const raw = localStorage.getItem(LEGACY_SAVE_KEY);
  if (!raw) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(raw) as LegacySaveData;
    const status = parsed.questCompleted ? 'completed' : parsed.questStatus ?? 'not_started';
    return {
      ...createNewSave(defaultEventId),
      playerPosition: parsed.playerPosition ?? playerStartPosition,
      coins: parsed.coins ?? 0,
      progressByEvent: {
        [defaultEventId]: {
          status,
          stepIndex: status === 'completed' ? 2 : status === 'not_started' ? 0 : 1,
          collectedItemIds: parsed.collectedItemIds ?? [],
          completedZoneIds: []
        }
      },
      unlockedCosmetics: parsed.goblinHatUnlocked ? ['goblin_hat'] : [],
      introCompleted: parsed.introCompleted ?? false
    };
  } catch {
    return undefined;
  }
}

export function loadSave(): SaveData | undefined {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      return migrateLegacySave();
    }

    const parsed = JSON.parse(raw) as Partial<SaveData>;
    const activeEventId = parsed.activeEventId ?? defaultEventId;
    return {
      ...createNewSave(activeEventId),
      ...parsed,
      version: 2,
      activeEventId,
      playerPosition: parsed.playerPosition ?? playerStartPosition,
      progressByEvent: parsed.progressByEvent ?? { [activeEventId]: createEventProgress() },
      unlockedCosmetics: parsed.unlockedCosmetics ?? [],
      earnedBadges: parsed.earnedBadges ?? [],
      introCompleted: parsed.introCompleted ?? false
    };
  } catch {
    return migrateLegacySave();
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
      version: 2
    } satisfies SaveData)
  );
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(LEGACY_SAVE_KEY);
}

export function getQuestLine(save: SaveData): string {
  const event = getEventConfig(save.activeEventId);
  const progress = ensureEventProgress(save, event.id);

  if (progress.status === 'completed') {
    return event.dialogue.completed;
  }

  const step = event.questSteps[progress.stepIndex] ?? event.questSteps[0];
  if (!step) {
    return event.description;
  }

  if (step.type === 'collect') {
    const count = countCollectedType(event, progress.collectedItemIds, step.collectibleType);
    return `${step.objective} ${count}/${step.requiredCount}`;
  }

  if (step.type === 'interact' && step.requiredCount > 1) {
    const count = step.zoneIds.filter((zoneId) => progress.completedZoneIds.includes(zoneId)).length;
    return `${step.objective} ${count}/${step.requiredCount}`;
  }

  return step.objective;
}
