import { useState } from 'react';
import { getEventConfig } from '../config/events';
import { useGameStore } from '../state/gameStore';
import { EventBoard } from '../ui/EventBoard';

export function StartMenu() {
  const [showCredits, setShowCredits] = useState(false);
  const hasExistingSave = useGameStore((state) => state.hasExistingSave);
  const startGame = useGameStore((state) => state.startGame);
  const activeEventId = useGameStore((state) => state.activeEventId);
  const event = getEventConfig(activeEventId);

  return (
    <div className="start-layout">
      <div className="start-ui panel">
        <p className="eyebrow">{event.subtitle}</p>
        <h1 className="title">Chaos County</h1>
        <p className="subtitle">
          A cozy-chaotic 3D county trapped inside The Algorithm. Tonight's selected alert: <strong>{event.name}</strong>.
        </p>
        <div className="button-row">
          <button className="menu-button primary" onClick={() => startGame(hasExistingSave ? 'continue' : 'new')}>
            Start Game
          </button>
          <button className="menu-button" disabled={!hasExistingSave} onClick={() => startGame('continue')}>
            Continue
          </button>
          <button className="menu-button" onClick={() => startGame('new')}>
            New Game
          </button>
          <button className="menu-button ghost" onClick={() => setShowCredits((value) => !value)}>
            Credits
          </button>
        </div>
        {showCredits ? (
          <div className="credits-popover panel">
            <strong>Assets</strong>
            <br />
            Kenney - City Kit: Suburban and Blocky Characters.
            <br />
            Both packs are CC0. See <code>CREDITS.md</code>.
          </div>
        ) : null}
      </div>
      <div className="start-board panel">
        <EventBoard compact />
      </div>
    </div>
  );
}
