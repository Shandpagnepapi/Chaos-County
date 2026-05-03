import { create } from 'zustand';
import {
  countCollectedType,
  defaultEventId,
  getCollectibleDefinition,
  getEventConfig,
  type CollectibleType,
  type EventConfig,
  type EventId,
  type NpcId,
  type QuestStep
} from '../config/events';
import { npcs, type NpcConfig, type Vec2 } from '../config/world';
import {
  clearSave,
  createEventProgress,
  createNewSave,
  ensureEventProgress,
  hasSave,
  loadSave,
  saveGame,
  type EventProgress,
  type SaveData
} from '../save/saveManager';

export interface DialogueState {
  speaker: string;
  text: string;
}

export interface FloatingText {
  id: string;
  text: string;
  position: [number, number, number];
  tone?: 'normal' | 'rare' | 'reward';
}

export interface RewardPanelState {
  title: string;
  body: string;
  rewards: string[];
}

export type ScreenMode = 'start' | 'playing';

interface GameState {
  screen: ScreenMode;
  hasExistingSave: boolean;
  activeEventId: EventId;
  progressByEvent: Partial<Record<EventId, EventProgress>>;
  playerPosition: Vec2;
  mobileInput: Vec2;
  coins: number;
  unlockedCosmetics: string[];
  earnedBadges: string[];
  introCompleted: boolean;
  nearestNpcId?: NpcId;
  nearestZoneId?: string;
  dialogue?: DialogueState;
  floatingTexts: FloatingText[];
  rewardPanel?: RewardPanelState;
  startGame: (mode: 'continue' | 'new') => void;
  setActiveEvent: (eventId: EventId) => void;
  setPlayerPosition: (position: Vec2) => void;
  setMobileInput: (input: Vec2) => void;
  setNearestNpc: (npcId?: NpcId) => void;
  setNearestZone: (zoneId?: string) => void;
  interact: () => void;
  closeDialogue: () => void;
  collectEventItem: (id: string, position: [number, number, number]) => void;
  chooseQuestOption: (choiceId: string) => void;
  addFloatingText: (text: string, position: [number, number, number], tone?: FloatingText['tone']) => void;
  removeFloatingText: (id: string) => void;
  hideRewardPanel: () => void;
  saveNow: () => void;
}

const initialSave = loadSave() ?? createNewSave(defaultEventId);

function getAllNpcs(event: EventConfig): Array<NpcConfig | EventConfig['eventNpcs'][number]> {
  return [...npcs, ...event.eventNpcs];
}

function toSaveData(state: GameState): SaveData {
  return {
    version: 2,
    activeEventId: state.activeEventId,
    playerPosition: state.playerPosition,
    coins: state.coins,
    progressByEvent: state.progressByEvent,
    unlockedCosmetics: state.unlockedCosmetics,
    earnedBadges: state.earnedBadges,
    introCompleted: state.introCompleted
  };
}

function createFloatingId(): string {
  return `float-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getProgress(state: GameState, eventId = state.activeEventId): EventProgress {
  return state.progressByEvent[eventId] ?? createEventProgress();
}

function withProgress(
  progressByEvent: GameState['progressByEvent'],
  eventId: EventId,
  progress: EventProgress
): GameState['progressByEvent'] {
  return {
    ...progressByEvent,
    [eventId]: progress
  };
}

function countStepProgress(event: EventConfig, progress: EventProgress, step: QuestStep): number {
  if (step.type === 'collect') {
    return countCollectedType(event, progress.collectedItemIds, step.collectibleType);
  }

  if (step.type === 'interact') {
    return step.zoneIds.filter((zoneId) => progress.completedZoneIds.includes(zoneId)).length;
  }

  return 0;
}

function normalizeAutomaticSteps(event: EventConfig, progress: EventProgress): { progress: EventProgress; completed: boolean } {
  let next = progress;

  while (next.stepIndex < event.questSteps.length) {
    const step = event.questSteps[next.stepIndex];
    const collectDone = step.type === 'collect' && countStepProgress(event, next, step) >= step.requiredCount;
    const interactDone = step.type === 'interact' && countStepProgress(event, next, step) >= step.requiredCount;

    if (!collectDone && !interactDone) {
      break;
    }

    next = {
      ...next,
      status: 'active',
      stepIndex: next.stepIndex + 1
    };
  }

  if (next.stepIndex >= event.questSteps.length) {
    return {
      progress: {
        ...next,
        status: 'completed',
        stepIndex: Math.max(0, event.questSteps.length - 1)
      },
      completed: true
    };
  }

  return { progress: next, completed: false };
}

function advanceStep(event: EventConfig, progress: EventProgress): { progress: EventProgress; completed: boolean } {
  const advanced = {
    ...progress,
    status: 'active' as const,
    stepIndex: progress.stepIndex + 1
  };
  return normalizeAutomaticSteps(event, advanced);
}

function rewardLines(event: EventConfig): string[] {
  return [
    `+${event.reward.coins} coins`,
    `${event.reward.cosmeticLabel} unlocked`,
    ...(event.reward.badge ? [`Badge: ${event.reward.badge}`] : []),
    ...(event.reward.unlockable ? [`Unlock: ${event.reward.unlockable}`] : [])
  ];
}

function dialogueForNpc(event: EventConfig, npcId: NpcId, progress: EventProgress, fallback: string): string {
  if (npcId === event.mainNpcId) {
    if (progress.status === 'completed') {
      return event.dialogue.completed;
    }

    const normalized = normalizeAutomaticSteps(event, progress).progress;
    const step = event.questSteps[normalized.stepIndex];
    if (step?.type === 'return') {
      return event.dialogue.ready;
    }

    return normalized.status === 'not_started' ? event.dialogue.start : event.dialogue.active;
  }

  return event.dialogue.npcLines[npcId] ?? fallback;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  hasExistingSave: hasSave(),
  activeEventId: initialSave.activeEventId,
  progressByEvent: initialSave.progressByEvent,
  playerPosition: initialSave.playerPosition,
  mobileInput: { x: 0, z: 0 },
  coins: initialSave.coins,
  unlockedCosmetics: initialSave.unlockedCosmetics,
  earnedBadges: initialSave.earnedBadges,
  introCompleted: initialSave.introCompleted,
  floatingTexts: [],

  startGame: (mode) => {
    const selectedEventId = get().activeEventId;
    const save = mode === 'continue' ? loadSave() ?? createNewSave(selectedEventId) : createNewSave(selectedEventId);
    if (mode === 'new') {
      clearSave();
    }

    const progressByEvent = {
      ...save.progressByEvent,
      [selectedEventId]: save.progressByEvent[selectedEventId] ?? createEventProgress()
    };

    const nextSave: SaveData = {
      ...save,
      activeEventId: selectedEventId,
      progressByEvent,
      introCompleted: true
    };

    set({
      screen: 'playing',
      hasExistingSave: true,
      activeEventId: selectedEventId,
      progressByEvent,
      playerPosition: nextSave.playerPosition,
      coins: nextSave.coins,
      unlockedCosmetics: nextSave.unlockedCosmetics,
      earnedBadges: nextSave.earnedBadges,
      introCompleted: true,
      dialogue: undefined,
      rewardPanel: undefined,
      nearestNpcId: undefined,
      nearestZoneId: undefined
    });
    saveGame(nextSave);
  },

  setActiveEvent: (activeEventId) => {
    const shouldSave = get().screen === 'playing';
    set((state) => ({
      activeEventId,
      progressByEvent: {
        ...state.progressByEvent,
        [activeEventId]: state.progressByEvent[activeEventId] ?? createEventProgress()
      },
      dialogue: undefined,
      rewardPanel: undefined,
      nearestNpcId: undefined,
      nearestZoneId: undefined
    }));
    if (shouldSave) {
      get().saveNow();
    }
  },

  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setMobileInput: (mobileInput) => set({ mobileInput }),
  setNearestNpc: (nearestNpcId) => set({ nearestNpcId }),
  setNearestZone: (nearestZoneId) => set({ nearestZoneId }),

  interact: () => {
    const state = get();
    if (state.dialogue) {
      set({ dialogue: undefined });
      return;
    }

    const event = getEventConfig(state.activeEventId);
    const progress = getProgress(state);
    const normalized = normalizeAutomaticSteps(event, progress);
    const currentProgress = normalized.progress;
    const step = event.questSteps[currentProgress.stepIndex];

    if (normalized.progress !== progress) {
      set({ progressByEvent: withProgress(state.progressByEvent, event.id, currentProgress) });
    }

    if (currentProgress.status === 'completed') {
      const npc = getAllNpcs(event).find((candidate) => candidate.id === state.nearestNpcId);
      if (npc) {
        set({ dialogue: { speaker: npc.name, text: dialogueForNpc(event, npc.id, currentProgress, npc.dialogue) } });
      }
      return;
    }

    if (step?.type === 'interact' && state.nearestZoneId && step.zoneIds.includes(state.nearestZoneId)) {
      const zone = event.interactionZones.find((candidate) => candidate.id === state.nearestZoneId);
      const completedZoneIds = currentProgress.completedZoneIds.includes(state.nearestZoneId)
        ? currentProgress.completedZoneIds
        : [...currentProgress.completedZoneIds, state.nearestZoneId];
      const updatedProgress = { ...currentProgress, status: 'active' as const, completedZoneIds };
      const completedCount = countStepProgress(event, updatedProgress, step);
      const result =
        completedCount >= step.requiredCount
          ? advanceStep(event, updatedProgress)
          : { progress: updatedProgress, completed: false };

      set({
        progressByEvent: withProgress(state.progressByEvent, event.id, result.progress),
        dialogue: {
          speaker: event.name,
          text:
            completedCount >= step.requiredCount
              ? step.completionText
              : `${zone?.label ?? 'Objective'} checked. ${completedCount}/${step.requiredCount}`
        }
      });

      if (result.completed) {
        get().chooseQuestOption('');
      } else {
        get().saveNow();
      }
      return;
    }

    const npc = getAllNpcs(event).find((candidate) => candidate.id === state.nearestNpcId);
    if (!npc) {
      return;
    }

    if ((step?.type === 'talk' || step?.type === 'return') && step.npcId === npc.id) {
      const result = advanceStep(event, {
        ...currentProgress,
        status: 'active'
      });

      set({
        progressByEvent: withProgress(state.progressByEvent, event.id, result.progress),
        dialogue: { speaker: npc.name, text: step.dialogue }
      });

      if (result.completed) {
        const latest = get();
        const unlockedCosmetics = latest.unlockedCosmetics.includes(event.reward.cosmetic)
          ? latest.unlockedCosmetics
          : [...latest.unlockedCosmetics, event.reward.cosmetic];
        const earnedBadges =
          event.reward.badge && !latest.earnedBadges.includes(event.reward.badge)
            ? [...latest.earnedBadges, event.reward.badge]
            : latest.earnedBadges;

        set({
          coins: latest.coins + event.reward.coins,
          unlockedCosmetics,
          earnedBadges,
          rewardPanel: {
            title: event.completionScreen.title,
            body: event.completionScreen.body,
            rewards: rewardLines(event)
          }
        });
        get().addFloatingText(`+${event.reward.coins} coins`, [latest.playerPosition.x, 2.6, latest.playerPosition.z], 'reward');
      }

      get().saveNow();
      return;
    }

    set({
      dialogue: {
        speaker: npc.name,
        text: dialogueForNpc(event, npc.id, currentProgress, npc.dialogue)
      }
    });
  },

  closeDialogue: () => set({ dialogue: undefined }),

  collectEventItem: (id, position) => {
    const state = get();
    const event = getEventConfig(state.activeEventId);
    const item = event.collectibles.find((candidate) => candidate.id === id);
    if (!item) {
      return;
    }

    const progress = getProgress(state);
    if (progress.collectedItemIds.includes(id)) {
      return;
    }

    const collectedItemIds = [...progress.collectedItemIds, id];
    const updatedProgress = {
      ...progress,
      collectedItemIds
    };
    const normalized = normalizeAutomaticSteps(event, updatedProgress);

    set({
      progressByEvent: withProgress(state.progressByEvent, event.id, normalized.progress)
    });

    const definition = getCollectibleDefinition(event, item.type as CollectibleType);
    get().addFloatingText(definition.floatingText, position, definition.tone);
    get().saveNow();
  },

  chooseQuestOption: (choiceId) => {
    const state = get();
    const event = getEventConfig(state.activeEventId);
    const progress = getProgress(state);
    const step = event.questSteps[progress.stepIndex];

    if (step?.type !== 'choice') {
      if (progress.status !== 'completed') {
        const completedProgress = {
          ...progress,
          status: 'completed' as const,
          stepIndex: Math.max(0, event.questSteps.length - 1)
        };
        set({ progressByEvent: withProgress(state.progressByEvent, event.id, completedProgress) });
      }
    } else {
      const choice = step.choices.find((candidate) => candidate.id === choiceId) ?? step.choices[0];
      const completedProgress = {
        ...progress,
        status: 'completed' as const,
        stepIndex: Math.max(0, event.questSteps.length - 1),
        choiceId: choice.id
      };
      set({
        progressByEvent: withProgress(state.progressByEvent, event.id, completedProgress),
        dialogue: { speaker: event.name, text: choice.dialogue }
      });
    }

    const latest = get();
    const unlockedCosmetics = latest.unlockedCosmetics.includes(event.reward.cosmetic)
      ? latest.unlockedCosmetics
      : [...latest.unlockedCosmetics, event.reward.cosmetic];
    const earnedBadges =
      event.reward.badge && !latest.earnedBadges.includes(event.reward.badge)
        ? [...latest.earnedBadges, event.reward.badge]
        : latest.earnedBadges;

    set({
      coins: latest.coins + event.reward.coins,
      unlockedCosmetics,
      earnedBadges,
      rewardPanel: {
        title: event.completionScreen.title,
        body: event.completionScreen.body,
        rewards: rewardLines(event)
      }
    });
    get().addFloatingText(`+${event.reward.coins} coins`, [latest.playerPosition.x, 2.6, latest.playerPosition.z], 'reward');
    get().saveNow();
  },

  addFloatingText: (text, position, tone = 'normal') => {
    const id = createFloatingId();
    set((state) => ({ floatingTexts: [...state.floatingTexts, { id, text, position, tone }] }));
    window.setTimeout(() => get().removeFloatingText(id), 1400);
  },

  removeFloatingText: (id) => {
    set((state) => ({ floatingTexts: state.floatingTexts.filter((text) => text.id !== id) }));
  },

  hideRewardPanel: () => set({ rewardPanel: undefined }),

  saveNow: () => {
    saveGame(toSaveData(get()));
    set({ hasExistingSave: true });
  }
}));
