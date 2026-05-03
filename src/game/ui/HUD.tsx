import {
  countCollectedType,
  getCollectibleDefinition,
  getEventConfig,
  type EventId,
  type QuestStep
} from '../config/events';
import { createEventProgress, getQuestLine, type SaveData, type EventProgress } from '../save/saveManager';
import { useGameStore } from '../state/gameStore';
import { EventIntroCard } from './EventIntroCard';
import { PauseMenu } from './PauseMenu';

function getStepProgress(eventId: EventId, progress: EventProgress, step?: QuestStep): { current: number; total: number } {
  const event = getEventConfig(eventId);
  if (progress.status === 'completed') {
    return { current: 1, total: 1 };
  }

  if (step?.type === 'collect') {
    return {
      current: countCollectedType(event, progress.collectedItemIds, step.collectibleType),
      total: step.requiredCount
    };
  }

  if (step?.type === 'interact') {
    return {
      current: step.zoneIds.filter((zoneId) => progress.completedZoneIds.includes(zoneId)).length,
      total: step.requiredCount
    };
  }

  return { current: 0, total: 1 };
}

export function HUD() {
  const activeEventId = useGameStore((state) => state.activeEventId);
  const coins = useGameStore((state) => state.coins);
  const progressByEvent = useGameStore((state) => state.progressByEvent);
  const unlockedCosmetics = useGameStore((state) => state.unlockedCosmetics);
  const dialogue = useGameStore((state) => state.dialogue);
  const closeDialogue = useGameStore((state) => state.closeDialogue);
  const rewardPanel = useGameStore((state) => state.rewardPanel);
  const hideRewardPanel = useGameStore((state) => state.hideRewardPanel);
  const chooseQuestOption = useGameStore((state) => state.chooseQuestOption);
  const setPausePanel = useGameStore((state) => state.setPausePanel);

  const event = getEventConfig(activeEventId);
  const progress = progressByEvent[activeEventId] ?? createEventProgress();
  const step = event.questSteps[progress.stepIndex];
  const primaryDefinition = getCollectibleDefinition(event, event.primaryCollectibleType);
  const primaryCount = countCollectedType(event, progress.collectedItemIds, event.primaryCollectibleType);
  const stepProgress = getStepProgress(activeEventId, progress, step);
  const progressPercent = Math.min(100, (stepProgress.current / Math.max(1, stepProgress.total)) * 100);

  const saveLike: SaveData = {
    version: 2,
    activeEventId,
    playerPosition: useGameStore.getState().playerPosition,
    coins,
    progressByEvent,
    unlockedCosmetics,
    earnedBadges: useGameStore.getState().earnedBadges,
    introCompleted: true
  };

  return (
    <div className="hud">
      <div className="hud-top">
        <div className="event-banner panel">
          <strong>County Alert</strong>
          <span>{event.hudBannerText}</span>
          <button className="mini-board-button" onClick={() => setPausePanel('event-board')}>
            Board
          </button>
        </div>
        <div className="stat-stack">
          <div className="stat-card stat-coins panel">
            <b>Coins</b>
            <span>{coins}</span>
          </div>
          <div className="stat-card stat-primary panel">
            <b>{primaryDefinition.label}</b>
            <span>
              {primaryCount}/{event.requiredCount}
            </span>
          </div>
          <div className="stat-card stat-inventory panel">
            <b>Inventory</b>
            <span>{progress.collectedItemIds.length + unlockedCosmetics.length}</span>
          </div>
        </div>
      </div>

      <div className="quest-card panel">
        <h2>{event.name}</h2>
          <p>{getQuestLine(saveLike)}</p>
        <div className="progress-bar">
          <div style={{ width: `${progress.status === 'completed' ? 100 : progressPercent}%` }} />
        </div>
      </div>

      {step?.type === 'choice' && progress.status !== 'completed' ? (
        <div className="choice-panel panel">
          <p className="eyebrow">Choice</p>
          <h2>{step.prompt}</h2>
          <div className="choice-list">
            {step.choices.map((choice) => (
              <button key={choice.id} onClick={() => chooseQuestOption(choice.id)}>
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {dialogue ? (
        <div className="dialogue-box panel">
          <h3>{dialogue.speaker}</h3>
          <p>{dialogue.text}</p>
          <button onClick={closeDialogue}>Continue</button>
        </div>
      ) : null}

      {rewardPanel ? (
        <div className="reward-panel panel">
          <p className="eyebrow">Quest Complete</p>
          <h2>{rewardPanel.title}</h2>
          <p>{rewardPanel.body}</p>
          <div className="reward-list">
            {rewardPanel.rewards.map((reward) => (
              <div className="reward-item" key={reward}>
                {reward}
              </div>
            ))}
          </div>
          <button onClick={hideRewardPanel}>Nice</button>
        </div>
      ) : null}
      <EventIntroCard />
      <PauseMenu />
    </div>
  );
}
