import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { MathUtils } from 'three';
import { characterAssets } from '../config/assets';
import { getEventConfig, type NpcId } from '../config/events';
import { allColliders, npcs, type Vec2 } from '../config/world';
import { BlockyCharacter, rotationFromVelocity } from '../characters/BlockyCharacter';
import { useGameStore } from '../state/gameStore';
import { resolvePlayerCollision } from '../utils/collision';
import { useKeyboardInput } from './useKeyboardInput';

const moveSpeed = 3.75;
const acceleration = 13.5;
const deceleration = 18;
const interactionDistance = 1.55;

function rotateInputByCamera(input: Vec2, yaw: number): Vec2 {
  const inputLength = Math.hypot(input.x, input.z);
  if (inputLength < 0.001) {
    return { x: 0, z: 0 };
  }

  const normalized = inputLength > 1 ? { x: input.x / inputLength, z: input.z / inputLength } : input;
  const forward = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
  const right = { x: Math.cos(yaw), z: -Math.sin(yaw) };

  return {
    x: right.x * normalized.x + forward.x * -normalized.z,
    z: right.z * normalized.x + forward.z * -normalized.z
  };
}

function dampAngle(current: number, target: number, smoothing: number, delta: number): number {
  const angleDelta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + angleDelta * (1 - Math.exp(-smoothing * delta));
}

export function Player() {
  const groupRef = useRef<Group>(null);
  const facingRef = useRef(0);
  const movingRef = useRef(false);
  const velocityRef = useRef<Vec2>({ x: 0, z: 0 });
  const keyboardInput = useKeyboardInput();
  const playerPosition = useGameStore((state) => state.playerPosition);
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);
  const setNearestNpc = useGameStore((state) => state.setNearestNpc);
  const setNearestZone = useGameStore((state) => state.setNearestZone);
  const mobileInput = useGameStore((state) => state.mobileInput);
  const dialogue = useGameStore((state) => state.dialogue);
  const pausePanel = useGameStore((state) => state.pausePanel);
  const cameraYaw = useGameStore((state) => state.cameraOrbit.yaw);
  const unlockedCosmetics = useGameStore((state) => state.unlockedCosmetics);
  const activeEventId = useGameStore((state) => state.activeEventId);
  const activeEvent = getEventConfig(activeEventId);
  const cosmeticId = unlockedCosmetics.includes(activeEvent.reward.cosmetic)
    ? activeEvent.reward.cosmetic
    : unlockedCosmetics[unlockedCosmetics.length - 1];

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
    const inputLength = Math.hypot(rawInput.x, rawInput.z);
    const canAcceptInput = !dialogue && !pausePanel && inputLength > 0.001;
    const moveDirection = canAcceptInput ? rotateInputByCamera(rawInput, cameraYaw) : { x: 0, z: 0 };
    const targetVelocity = {
      x: moveDirection.x * moveSpeed,
      z: moveDirection.z * moveSpeed
    };
    const response = canAcceptInput ? acceleration : deceleration;
    velocityRef.current = {
      x: MathUtils.damp(velocityRef.current.x, targetVelocity.x, response, delta),
      z: MathUtils.damp(velocityRef.current.z, targetVelocity.z, response, delta)
    };
    const velocity = velocityRef.current;
    const moving = Math.hypot(velocity.x, velocity.z) > 0.06;

    const resolvedX = resolvePlayerCollision(
      {
        x: playerPosition.x + velocity.x * delta,
        z: playerPosition.z
      },
      allColliders
    );
    const hitX = Math.abs(resolvedX.x - (playerPosition.x + velocity.x * delta)) > 0.001;
    const nextPosition: Vec2 = resolvePlayerCollision(
      {
        x: resolvedX.x,
        z: resolvedX.z + velocity.z * delta
      },
      allColliders
    );
    const hitZ = Math.abs(nextPosition.z - (resolvedX.z + velocity.z * delta)) > 0.001;

    if (hitX) {
      velocityRef.current.x *= 0.36;
    }
    if (hitZ) {
      velocityRef.current.z *= 0.36;
    }

    if (moving) {
      facingRef.current = rotationFromVelocity(facingRef.current, velocity);
    }

    movingRef.current = moving;
    const speedRatio = Math.min(1, Math.hypot(velocity.x, velocity.z) / moveSpeed);
    const bob = moving
      ? Math.sin(performance.now() * 0.0135) * 0.028 * speedRatio
      : Math.sin(performance.now() * 0.003) * 0.012;
    const leanX = moving ? MathUtils.clamp(velocity.z / moveSpeed, -1, 1) * 0.055 : 0;
    const leanZ = moving ? -MathUtils.clamp(velocity.x / moveSpeed, -1, 1) * 0.055 : 0;
    group.position.set(nextPosition.x, bob, nextPosition.z);
    group.rotation.y = dampAngle(group.rotation.y, facingRef.current, 13, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, leanX, 10, delta);
    group.rotation.z = MathUtils.damp(group.rotation.z, leanZ, 10, delta);

    if (nextPosition.x !== playerPosition.x || nextPosition.z !== playerPosition.z) {
      setPlayerPosition(nextPosition);
    }

    const event = getEventConfig(activeEventId);
    let nearest: { id: NpcId; distance: number } | undefined;
    for (const npc of [...npcs, ...event.eventNpcs]) {
      const distance = Math.hypot(npc.position.x - nextPosition.x, npc.position.z - nextPosition.z);
      if (distance < interactionDistance && (!nearest || distance < nearest.distance)) {
        nearest = { id: npc.id, distance };
      }
    }
    setNearestNpc(nearest?.id);

    let nearestZone: { id: string; distance: number } | undefined;
    for (const zone of event.interactionZones) {
      const distance = Math.hypot(zone.position.x - nextPosition.x, zone.position.z - nextPosition.z);
      if (distance < zone.radius && (!nearestZone || distance < nearestZone.distance)) {
        nearestZone = { id: zone.id, distance };
      }
    }
    setNearestZone(nearestZone?.id);
  });

  return (
    <group ref={groupRef} position={[playerPosition.x, 0, playerPosition.z]}>
      <BlockyCharacter
        model={characterAssets.player}
        position={[0, 0, 0]}
        rotationY={0}
        moving={movingRef.current}
        cosmeticId={cosmeticId}
        scale={0.36}
      />
    </group>
  );
}
