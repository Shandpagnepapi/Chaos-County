import { useState } from 'react';
import { eventList, getEventConfig, type EventId } from '../config/events';
import { useGameStore } from '../state/gameStore';

export function StartMenu() {
  const [showCredits, setShowCredits] = useState(false);
  const hasExistingSave = useGameStore((state) => state.hasExistingSave);
  const startGame = useGameStore((state) => state.startGame);
  const activeEventId = useGameStore((state) => state.activeEventId);
  const setActiveEvent = useGameStore((state) => state.setActiveEvent);
  const event = getEventConfig(activeEventId);

  return (
    <div className="start-ui panel">
      <p className="eyebrow">{event.name}</p>
      <h1 className="title">Chaos County</h1>
      <p className="subtitle">{event.description}</p>
      <label className="start-event-select">
        <span>Test Event</span>
        <select value={activeEventId} onChange={(changeEvent) => setActiveEvent(changeEvent.target.value as EventId)}>
          {eventList.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </label>
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
