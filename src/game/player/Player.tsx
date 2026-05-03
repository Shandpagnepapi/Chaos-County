import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { MathUtils } from 'three';
import { characterAssets } from '../config/assets';
import { allColliders, npcs, type Vec2 } from '../config/world';
import { BlockyCharacter, rotationFromVelocity } from '../characters/BlockyCharacter';
import { useGameStore } from '../state/gameStore';
import { resolvePlayerCollision } from '../utils/collision';
import { useKeyboardInput } from './useKeyboardInput';

const moveSpeed = 4.2;
const interactionDistance = 1.75;

export function Player() {
  const groupRef = useRef<Group>(null);
  const facingRef = useRef(0);
  const movingRef = useRef(false);
  const keyboardInput = useKeyboardInput();
  const playerPosition = useGameStore((state) => state.playerPosition);
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);
  const setNearestNpc = useGameStore((state) => state.setNearestNpc);
  const mobileInput = useGameStore((state) => state.mobileInput);
  const dialogue = useGameStore((state) => state.dialogue);
  const goblinHatUnlocked = useGameStore((state) => state.goblinHatUnlocked);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const keyboard = keyboardInput.current;
    const rawInput = {
      x: keyboard.x + mobileInput.x,
      z: keyboard.z + mobileInput.z
    };
    const length = Math.hypot(rawInput.x, rawInput.z);
    const input = length > 1 ? { x: rawInput.x / length, z: rawInput.z / length } : rawInput;
    const canMove = !dialogue && Math.hypot(input.x, input.z) > 0.001;
    const velocity = canMove ? { x: input.x * moveSpeed, z: input.z * moveSpeed } : { x: 0, z: 0 };

    const nextPosition: Vec2 = resolvePlayerCollision(
      {
        x: playerPosition.x + velocity.x * delta,
        z: playerPosition.z + velocity.z * delta
      },
      allColliders
    );

    if (canMove) {
      facingRef.current = rotationFromVelocity(facingRef.current, velocity);
    }

    movingRef.current = canMove;
    const bob = canMove ? Math.sin(performance.now() * 0.014) * 0.04 : Math.sin(performance.now() * 0.003) * 0.018;
    group.position.set(nextPosition.x, bob, nextPosition.z);
    group.rotation.y = MathUtils.lerp(group.rotation.y, facingRef.current, 0.22);

    if (nextPosition.x !== playerPosition.x || nextPosition.z !== playerPosition.z) {
      setPlayerPosition(nextPosition);
    }

    let nearest: { id: (typeof npcs)[number]['id']; distance: number } | undefined;
    for (const npc of npcs) {
      const distance = Math.hypot(npc.position.x - nextPosition.x, npc.position.z - nextPosition.z);
      if (distance < interactionDistance && (!nearest || distance < nearest.distance)) {
        nearest = { id: npc.id, distance };
      }
    }
    setNearestNpc(nearest?.id);
  });

  return (
    <group ref={groupRef} position={[playerPosition.x, 0, playerPosition.z]}>
      <BlockyCharacter
        model={characterAssets.player}
        position={[0, 0, 0]}
        rotationY={0}
        moving={movingRef.current}
        showHat={goblinHatUnlocked}
      />
    </group>
  );
}
