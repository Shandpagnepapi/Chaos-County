import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { getCollectibleDefinition, getEventConfig, type EventVec2 } from '../config/events';
import { npcs } from '../config/world';
import { createEventProgress } from '../save/saveManager';
import { useGameStore } from '../state/gameStore';

function targetForStep(): { position: EventVec2; label: string; kind: 'npc' | 'collectible' | 'zone' } | undefined {
  const state = useGameStore.getState();
  const event = getEventConfig(state.activeEventId);
  const progress = state.progressByEvent[state.activeEventId] ?? createEventProgress();
  if (progress.status === 'completed') {
    return undefined;
  }

  const step = event.questSteps[progress.stepIndex];
  if (!step) {
    return undefined;
  }

  if (step.type === 'talk' || step.type === 'return') {
    const npc = [...npcs, ...event.eventNpcs].find((candidate) => candidate.id === step.npcId);
    return npc ? { position: npc.position, label: step.objective, kind: 'npc' } : undefined;
  }

  if (step.type === 'interact') {
    const zone = event.interactionZones.find(
      (candidate) => step.zoneIds.includes(candidate.id) && !progress.completedZoneIds.includes(candidate.id)
    );
    return zone ? { position: zone.position, label: zone.label, kind: 'zone' } : undefined;
  }

  if (step.type === 'collect') {
    const items = event.collectibles.filter(
      (candidate) => candidate.type === step.collectibleType && !progress.collectedItemIds.includes(candidate.id)
    );
    const item = items.reduce<(typeof items)[number] | undefined>((nearest, candidate) => {
      if (!nearest) {
        return candidate;
      }
      const candidateDistance = Math.hypot(candidate.position.x - state.playerPosition.x, candidate.position.z - state.playerPosition.z);
      const nearestDistance = Math.hypot(nearest.position.x - state.playerPosition.x, nearest.position.z - state.playerPosition.z);
      return candidateDistance < nearestDistance ? candidate : nearest;
    }, undefined);
    const definition = getCollectibleDefinition(event, step.collectibleType);
    return item ? { position: item.position, label: definition.label, kind: 'collectible' } : undefined;
  }

  return undefined;
}

export function GuidanceMarker() {
  const ref = useRef<Group>(null);
  useGameStore((state) => state.activeEventId);
  useGameStore((state) => state.progressByEvent);
  const target = targetForStep();

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }
    ref.current.position.y = 1.05 + Math.sin(clock.elapsedTime * 3) * 0.08;
    ref.current.rotation.y += 0.02;
  });

  if (!target) {
    return null;
  }

  return (
    <group ref={ref} position={[target.position.x, 1.05, target.position.z]}>
      {target.kind === 'npc' ? (
        <Html center position={[0, 0.5, 0]} distanceFactor={8} zIndexRange={[2, 0]}>
          <div className="quest-bang">!</div>
        </Html>
      ) : null}
      <mesh castShadow rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.36, 4]} />
        <meshStandardMaterial color="#ffd36f" emissive="#ff9f45" emissiveIntensity={0.3} roughness={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]}>
        <ringGeometry args={[0.32, 0.44, 28]} />
        <meshBasicMaterial color="#ffd36f" transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <Html center position={[0, 0.24, 0]} distanceFactor={10} zIndexRange={[2, 0]}>
        <div className="world-label guide-label">{target.kind === 'npc' ? target.label : `Find: ${target.label}`}</div>
      </Html>
    </group>
  );
}
