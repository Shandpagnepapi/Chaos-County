import { eventList, type EventConfig } from '../config/events';
import { useGameStore } from '../state/gameStore';

function rewardSummary(event: EventConfig): string {
  const extras = [event.reward.cosmeticLabel, event.reward.badge, event.reward.unlockable].filter(Boolean);
  return `${event.reward.coins} coins${extras.length ? ` - ${extras.join(' - ')}` : ''}`;
}

interface EventBoardProps {
  compact?: boolean;
}

export function EventBoard({ compact = false }: EventBoardProps) {
  const activeEventId = useGameStore((state) => state.activeEventId);
  const setActiveEvent = useGameStore((state) => state.setActiveEvent);

  return (
    <section className={`event-board ${compact ? 'event-board-compact' : ''}`}>
      <div className="event-board-heading">
        <p className="eyebrow">County Alert Board</p>
        <h2>Tonight's Algorithm Incidents</h2>
      </div>
      <div className="event-card-grid">
        {eventList.map((event) => {
          const selected = event.id === activeEventId;
          return (
            <button
              key={event.id}
              className={`event-card ${selected ? 'event-card-selected' : ''}`}
              onClick={() => setActiveEvent(event.id)}
              type="button"
            >
              <span className="event-card-status">{selected ? 'Active Alert' : 'Available'}</span>
              <strong>{event.name}</strong>
              <em>{event.subtitle}</em>
              <p>{event.description}</p>
              <small>{rewardSummary(event)}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
