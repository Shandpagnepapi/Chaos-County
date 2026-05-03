import { EventBoard } from './EventBoard';
import { useGameStore } from '../state/gameStore';

export function PauseMenu() {
  const pausePanel = useGameStore((state) => state.pausePanel);
  const closePause = useGameStore((state) => state.closePause);
  const setPausePanel = useGameStore((state) => state.setPausePanel);
  const returnToTitle = useGameStore((state) => state.returnToTitle);
  const resetSave = useGameStore((state) => state.resetSave);

  if (!pausePanel) {
    return null;
  }

  return (
    <div className="pause-backdrop">
      <div className={`pause-shell panel ${pausePanel === 'event-board' ? 'pause-shell-wide' : ''}`}>
        <div className="pause-header">
          <p className="eyebrow">County Pause Office</p>
          <button className="icon-button" onClick={closePause} aria-label="Resume game">
            x
          </button>
        </div>

        {pausePanel === 'menu' ? (
          <>
            <h2>Chaos County</h2>
            <p className="pause-copy">The Algorithm can wait a minute. Probably.</p>
            <div className="pause-actions">
              <button className="menu-button primary" onClick={closePause}>
                Resume
              </button>
              <button className="menu-button" onClick={() => setPausePanel('event-board')}>
                Event Board
              </button>
              <button className="menu-button" onClick={() => setPausePanel('controls')}>
                Controls
              </button>
              <button className="menu-button" onClick={() => setPausePanel('credits')}>
                Credits
              </button>
              <button className="menu-button ghost" onClick={resetSave}>
                Reset Save
              </button>
              <button className="menu-button ghost" onClick={returnToTitle}>
                Back to Title
              </button>
            </div>
          </>
        ) : null}

        {pausePanel === 'event-board' ? (
          <>
            <EventBoard />
            <button className="menu-button board-back" onClick={() => setPausePanel('menu')}>
              Back
            </button>
          </>
        ) : null}

        {pausePanel === 'controls' ? (
          <div className="pause-info">
            <h2>Controls</h2>
            <p><strong>Desktop:</strong> WASD or arrow keys move relative to the camera, drag to orbit, mouse wheel zooms, E talks or uses, Escape/Tab opens this menu.</p>
            <p><strong>Mobile:</strong> left thumbstick moves, swipe the open right side to rotate the camera, and use Talk/Use when a prompt appears.</p>
            <p>Follow the amber guidance marker for the next person, place, or weird object the county needs handled.</p>
            <button className="menu-button" onClick={() => setPausePanel('menu')}>Back</button>
          </div>
        ) : null}

        {pausePanel === 'credits' ? (
          <div className="pause-info">
            <h2>Credits</h2>
            <p>Chaos County uses Kenney City Kit: Suburban and Kenney Blocky Characters. Both packs are CC0.</p>
            <p>Additional event props and UI styling are custom low-poly shapes made to match the Kenney direction.</p>
            <button className="menu-button" onClick={() => setPausePanel('menu')}>Back</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
