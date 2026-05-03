import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { BlockyCharacter } from '../characters/BlockyCharacter';
import { getEventConfig, type EventNpcConfig } from '../config/events';
import { npcs, type NpcConfig } from '../config/world';
import { useGameStore } from '../state/gameStore';

function NPCActor({ npc }: { npc: NpcConfig | EventNpcConfig }) {
  const groupRef = useRef<Group>(null);
  const nearestNpcId = useGameStore((state) => state.nearestNpcId);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.y = Math.sin(clock.elapsedTime * 1.5 + npc.position.x) * 0.02;
    groupRef.current.rotation.y = npc.rotationY + Math.sin(clock.elapsedTime * 0.8 + npc.position.z) * 0.06;
  });

  return (
    <group ref={groupRef} position={[npc.position.x, 0, npc.position.z]}>
      <BlockyCharacter
        model={npc.model}
        position={[0, 0, 0]}
        rotationY={0}
        name={npc.name}
        title={npc.title}
        scale={0.88}
      />
      {nearestNpcId === npc.id ? (
        <Html center position={[0, 2.72, 0]} distanceFactor={8}>
          <div className="world-label interaction-prompt">Press E / Tap</div>
        </Html>
      ) : null}
    </group>
  );
}

export function NPCs() {
  const activeEventId = useGameStore((state) => state.activeEventId);
  const event = getEventConfig(activeEventId);
  const activeNpcs = [...npcs, ...event.eventNpcs];

  return (
    <>
      {activeNpcs.map((npc) => (
        <NPCActor key={npc.id} npc={npc} />
      ))}
      <Html position={[-9.25, 2.6, -4.45]} center distanceFactor={13}>
        <div className="world-label">{event.subtitle}</div>
      </Html>
    </>
  );
}
