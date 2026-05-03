import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { getCollectibleDefinition, getEventConfig } from '../config/events';
import { useGameStore } from '../state/gameStore';
import { EventCollectible } from './EventCollectible';

export function Collectibles() {
  const activeEventId = useGameStore((state) => state.activeEventId);
  const progressByEvent = useGameStore((state) => state.progressByEvent);
  const collectEventItem = useGameStore((state) => state.collectEventItem);
  const floatingTexts = useGameStore((state) => state.floatingTexts);
  const event = getEventConfig(activeEventId);
  const progress = progressByEvent[activeEventId] ?? { collectedItemIds: [], completedZoneIds: [], status: 'not_started', stepIndex: 0 };

  useFrame(() => {
    const latest = useGameStore.getState();
    const latestEvent = getEventConfig(latest.activeEventId);
    const latestProgress = latest.progressByEvent[latest.activeEventId];
    const collected = latestProgress?.collectedItemIds ?? [];

    for (const item of latestEvent.collectibles) {
      if (collected.includes(item.id)) {
        continue;
      }

      const latestPosition = latest.playerPosition;
      const distance = Math.hypot(latestPosition.x - item.position.x, latestPosition.z - item.position.z);
      if (distance < 0.85) {
        collectEventItem(item.id, [item.position.x, 1.35, item.position.z]);
      }
    }
  });

  return (
    <>
      {event.collectibles.map((item) => {
        if (progress.collectedItemIds.includes(item.id)) {
          return null;
        }

        const definition = getCollectibleDefinition(event, item.type);
        return (
          <EventCollectible
            key={item.id}
            type={item.type}
            definition={definition}
            position={[item.position.x, item.height ?? 0.58, item.position.z]}
            onCollect={() => collectEventItem(item.id, [item.position.x, 1.35, item.position.z])}
          />
        );
      })}
      {floatingTexts.map((text) => (
        <Html key={text.id} center position={text.position} distanceFactor={8}>
          <div className={`floating-text floating-${text.tone ?? 'normal'}`}>{text.text}</div>
        </Html>
      ))}
    </>
  );
}
