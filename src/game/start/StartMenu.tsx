import { useState } from 'react';
import { useGameStore } from '../state/gameStore';

export function StartMenu() {
  const [showCredits, setShowCredits] = useState(false);
  const hasExistingSave = useGameStore((state) => state.hasExistingSave);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className="start-ui panel">
      <p className="eyebrow">Gas Station Goblin Panic</p>
      <h1 className="title">Chaos County</h1>
      <p className="subtitle">
        A cozy-chaotic low-poly town trapped inside The Algorithm. Big Dale needs those snack bags back.
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
  );
}
