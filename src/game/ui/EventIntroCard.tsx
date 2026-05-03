import { getEventConfig } from '../config/events';
import { createEventProgress, getQuestLine, type SaveData } from '../save/saveManager';
import { useGameStore } from '../state/gameStore';

export function EventIntroCard() {
  const visible = useGameStore((state) => state.eventIntroVisible);
  const activeEventId = useGameStore((state) => state.activeEventId);
  const progressByEvent = useGameStore((state) => state.progressByEvent);
  const hideEventIntro = useGameStore((state) => state.hideEventIntro);
  const coins = useGameStore((state) => state.coins);
  const unlockedCosmetics = useGameStore((state) => state.unlockedCosmetics);

  if (!visible) {
    return null;
  }

  const event = getEventConfig(activeEventId);
  const saveLike: SaveData = {
    version: 2,
    activeEventId,
    playerPosition: useGameStore.getState().playerPosition,
    coins,
    progressByEvent: {
      ...progressByEvent,
      [activeEventId]: progressByEvent[activeEventId] ?? createEventProgress()
    },
    unlockedCosmetics,
    earnedBadges: useGameStore.getState().earnedBadges,
    introCompleted: true
  };

  return (
    <div className="intro-card panel" data-testid="event-intro-card">
      <p className="eyebrow">County Alert</p>
      <h2>{event.name}</h2>
      <p>{event.introLore}</p>
      <div className="intro-objective">
        <strong>First objective</strong>
        <span>{getQuestLine(saveLike)}</span>
      </div>
      <button data-testid="event-intro-dismiss" onClick={hideEventIntro}>Head Out</button>
    </div>
  );
}
