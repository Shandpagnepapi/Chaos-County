import { gasStationGoblinPanic } from '../config/events';
import { getQuestLine } from '../save/saveManager';
import { useGameStore } from '../state/gameStore';

export function HUD() {
  const coins = useGameStore((state) => state.coins);
  const collectedItemIds = useGameStore((state) => state.collectedItemIds);
  const questStatus = useGameStore((state) => state.questStatus);
  const goblinHatUnlocked = useGameStore((state) => state.goblinHatUnlocked);
  const dialogue = useGameStore((state) => state.dialogue);
  const closeDialogue = useGameStore((state) => state.closeDialogue);
  const rewardPanelVisible = useGameStore((state) => state.rewardPanelVisible);
  const hideRewardPanel = useGameStore((state) => state.hideRewardPanel);

  const saveLike = {
    version: 1 as const,
    playerPosition: useGameStore.getState().playerPosition,
    coins,
    collectedItemIds,
    snackBagsCollected: collectedItemIds.length,
    questStatus,
    questCompleted: questStatus === 'completed',
    goblinHatUnlocked,
    introCompleted: true
  };

  return (
    <div className="hud">
      <div className="hud-top">
        <div className="event-banner panel">
          <strong>Active Event</strong>
          <span>{gasStationGoblinPanic.hudBannerText}</span>
        </div>
        <div className="stat-stack">
          <div className="stat-card panel">
            <b>Coins</b>
            <span>{coins}</span>
          </div>
          <div className="stat-card panel">
            <b>Snacks</b>
            <span>
              {collectedItemIds.length}/{gasStationGoblinPanic.requiredCount}
            </span>
          </div>
          <div className="stat-card panel">
            <b>Inventory</b>
            <span>{collectedItemIds.length + (goblinHatUnlocked ? 1 : 0)}</span>
          </div>
        </div>
      </div>

      <div className="quest-card panel">
        <h2>{gasStationGoblinPanic.name}</h2>
        <p>{getQuestLine(saveLike)}</p>
        <div className="progress-bar">
          <div style={{ width: `${Math.min(100, (collectedItemIds.length / gasStationGoblinPanic.requiredCount) * 100)}%` }} />
        </div>
      </div>

      {dialogue ? (
        <div className="dialogue-box panel">
          <h3>{dialogue.speaker}</h3>
          <p>{dialogue.text}</p>
          <button onClick={closeDialogue}>Continue</button>
        </div>
      ) : null}

      {rewardPanelVisible ? (
        <div className="reward-panel panel">
          <p className="eyebrow">Quest Complete</p>
          <h2>Snack Shelves Saved</h2>
          <p>You returned Big Dale&apos;s stolen snack bags and calmed the county for now.</p>
          <div className="reward-list">
            <div className="reward-item">+100 coins</div>
            <div className="reward-item">Goblin Hat unlocked</div>
          </div>
          <button onClick={hideRewardPanel}>Nice</button>
        </div>
      ) : null}
    </div>
  );
}
