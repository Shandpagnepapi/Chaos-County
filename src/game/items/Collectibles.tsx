import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { snackBags } from '../config/world';
import { useGameStore } from '../state/gameStore';
import { SnackBag } from './SnackBag';

export function Collectibles() {
  const collectedItemIds = useGameStore((state) => state.collectedItemIds);
  const collectSnackBag = useGameStore((state) => state.collectSnackBag);
  const floatingTexts = useGameStore((state) => state.floatingTexts);

  useFrame(() => {
    for (const snack of snackBags) {
      if (useGameStore.getState().collectedItemIds.includes(snack.id)) {
        continue;
      }

      const latestPosition = useGameStore.getState().playerPosition;
      const distance = Math.hypot(latestPosition.x - snack.position.x, latestPosition.z - snack.position.z);
      if (distance < 0.85) {
        collectSnackBag(snack.id, [snack.position.x, 1.35, snack.position.z]);
      }
    }
  });

  return (
    <>
      {snackBags.map((snack) => {
        if (collectedItemIds.includes(snack.id)) {
          return null;
        }

        return (
          <SnackBag
            key={snack.id}
            position={[snack.position.x, 0.58, snack.position.z]}
            onCollect={() => collectSnackBag(snack.id, [snack.position.x, 1.35, snack.position.z])}
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
