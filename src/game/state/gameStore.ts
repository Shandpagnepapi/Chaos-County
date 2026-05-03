import { create } from 'zustand';
import { gasStationGoblinPanic, type QuestStatus } from '../config/events';
import { npcs, playerStartPosition, type NpcConfig, type Vec2 } from '../config/world';
import { clearSave, createNewSave, hasSave, loadSave, saveGame, type SaveData } from '../save/saveManager';

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

export type ScreenMode = 'start' | 'playing';

interface GameState {
  screen: ScreenMode;
  hasExistingSave: boolean;
  playerPosition: Vec2;
  mobileInput: Vec2;
  coins: number;
  collectedItemIds: string[];
  questStatus: QuestStatus;
  goblinHatUnlocked: boolean;
  introCompleted: boolean;
  nearestNpcId?: NpcConfig['id'];
  dialogue?: DialogueState;
  floatingTexts: FloatingText[];
  rewardPanelVisible: boolean;
  startGame: (mode: 'continue' | 'new') => void;
  setPlayerPosition: (position: Vec2) => void;
  setMobileInput: (input: Vec2) => void;
  setNearestNpc: (npcId?: NpcConfig['id']) => void;
  interact: () => void;
  closeDialogue: () => void;
  collectSnackBag: (id: string, position: [number, number, number]) => void;
  addFloatingText: (text: string, position: [number, number, number], tone?: FloatingText['tone']) => void;
  removeFloatingText: (id: string) => void;
  hideRewardPanel: () => void;
  saveNow: () => void;
}

const initialSave = loadSave() ?? createNewSave();

function toSaveData(state: GameState): SaveData {
  return {
    version: 1,
    playerPosition: state.playerPosition,
    coins: state.coins,
    collectedItemIds: state.collectedItemIds,
    snackBagsCollected: state.collectedItemIds.length,
    questStatus: state.questStatus,
    questCompleted: state.questStatus === 'completed',
    goblinHatUnlocked: state.goblinHatUnlocked,
    introCompleted: state.introCompleted
  };
}

function createFloatingId(): string {
  return `float-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  hasExistingSave: hasSave(),
  playerPosition: initialSave.playerPosition,
  mobileInput: { x: 0, z: 0 },
  coins: initialSave.coins,
  collectedItemIds: initialSave.collectedItemIds,
  questStatus: initialSave.questStatus,
  goblinHatUnlocked: initialSave.goblinHatUnlocked,
  introCompleted: initialSave.introCompleted,
  floatingTexts: [],
  rewardPanelVisible: false,

  startGame: (mode) => {
    const save = mode === 'continue' ? loadSave() ?? createNewSave() : createNewSave();
    if (mode === 'new') {
      clearSave();
    }

    const nextSave = { ...save, introCompleted: true };
    set({
      screen: 'playing',
      hasExistingSave: true,
      playerPosition: nextSave.playerPosition,
      coins: nextSave.coins,
      collectedItemIds: nextSave.collectedItemIds,
      questStatus: nextSave.questStatus,
      goblinHatUnlocked: nextSave.goblinHatUnlocked,
      introCompleted: true,
      dialogue: undefined,
      rewardPanelVisible: false
    });
    saveGame(nextSave);
  },

  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setMobileInput: (mobileInput) => set({ mobileInput }),
  setNearestNpc: (nearestNpcId) => set({ nearestNpcId }),

  interact: () => {
    const state = get();
    if (state.dialogue) {
      set({ dialogue: undefined });
      return;
    }

    const npc = npcs.find((candidate) => candidate.id === state.nearestNpcId);
    if (!npc) {
      return;
    }

    if (npc.id !== 'big-dale') {
      set({ dialogue: { speaker: npc.name, text: npc.dialogue } });
      return;
    }

    const collectedCount = state.collectedItemIds.length;
    if (state.questStatus === 'not_started') {
      set({
        questStatus: collectedCount >= gasStationGoblinPanic.requiredCount ? 'ready_to_return' : 'active',
        dialogue: { speaker: npc.name, text: gasStationGoblinPanic.questDialogue.start }
      });
      get().saveNow();
      return;
    }

    if (state.questStatus === 'active' && collectedCount >= gasStationGoblinPanic.requiredCount) {
      set({
        questStatus: 'ready_to_return',
        dialogue: { speaker: npc.name, text: gasStationGoblinPanic.questDialogue.ready }
      });
      get().saveNow();
      return;
    }

    if (state.questStatus === 'ready_to_return') {
      set({
        questStatus: 'completed',
        coins: state.coins + gasStationGoblinPanic.rewardCoins,
        goblinHatUnlocked: true,
        rewardPanelVisible: true,
        dialogue: {
          speaker: npc.name,
          text: 'You did it. Here is 100 coins and one questionable Goblin Hat. Wear it with brave confusion.'
        }
      });
      get().addFloatingText('+100 coins', [state.playerPosition.x, 2.6, state.playerPosition.z], 'reward');
      get().saveNow();
      return;
    }

    set({
      dialogue: {
        speaker: npc.name,
        text:
          state.questStatus === 'completed'
            ? gasStationGoblinPanic.questDialogue.completed
            : gasStationGoblinPanic.questDialogue.active
      }
    });
  },

  closeDialogue: () => set({ dialogue: undefined }),

  collectSnackBag: (id, position) => {
    const state = get();
    if (state.collectedItemIds.includes(id)) {
      return;
    }

    const collectedItemIds = [...state.collectedItemIds, id];
    const questStatus =
      state.questStatus !== 'completed' && collectedItemIds.length >= gasStationGoblinPanic.requiredCount
        ? 'ready_to_return'
        : state.questStatus === 'not_started'
          ? 'active'
          : state.questStatus;

    set({ collectedItemIds, questStatus });
    get().addFloatingText('+1 Snack Bag', position, collectedItemIds.length === gasStationGoblinPanic.requiredCount ? 'rare' : 'normal');
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

  hideRewardPanel: () => set({ rewardPanelVisible: false }),

  saveNow: () => {
    saveGame(toSaveData(get()));
    set({ hasExistingSave: true });
  }
}));
