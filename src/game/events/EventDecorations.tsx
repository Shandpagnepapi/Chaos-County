import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';
import { getEventConfig, type DecorationKind } from '../config/events';
import { useGameStore } from '../state/gameStore';

function DeliveryDrone() {
  const ref = useRef<Group>(null);
  const rotorRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 1.8 + ref.current.position.x) * 0.18;
      ref.current.rotation.y += 0.006;
    }
    if (rotorRef.current) {
      rotorRef.current.rotation.y += 0.35;
    }
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.18, 0.42]} />
        <meshStandardMaterial color="#eef2f0" roughness={0.45} />
      </mesh>
      <mesh castShadow position={[0, -0.13, 0]}>
        <boxGeometry args={[0.36, 0.18, 0.28]} />
        <meshStandardMaterial color="#c68c59" roughness={0.62} />
      </mesh>
      <group ref={rotorRef}>
        {[
          [-0.48, 0.02, -0.36],
          [0.48, 0.02, -0.36],
          [-0.48, 0.02, 0.36],
          [0.48, 0.02, 0.36]
        ].map(([x, y, z]) => (
          <group key={`${x}-${z}`} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[0.52, 0.025, 0.05]} />
              <meshStandardMaterial color="#32353c" roughness={0.55} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.52, 0.025, 0.05]} />
              <meshStandardMaterial color="#32353c" roughness={0.55} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function SignalJammer() {
  return (
    <group>
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.54, 0.58, 0.42]} />
        <meshStandardMaterial color="#46505b" roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0.04, 0.72, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 8]} />
        <meshStandardMaterial color="#252a31" roughness={0.42} />
      </mesh>
      <mesh position={[0.04, 1.15, 0]}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial color="#9fd7ff" emissive="#6db9ff" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function YardSaleTable() {
  return (
    <group>
      <mesh castShadow position={[0, 0.52, 0]}>
        <boxGeometry args={[1.2, 0.12, 0.58]} />
        <meshStandardMaterial color="#d9985f" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-0.46, 0.25, -0.2]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#8a5d43" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0.46, 0.25, 0.2]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#8a5d43" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[-0.34, 0.72, 0.02]}>
        <boxGeometry args={[0.28, 0.2, 0.24]} />
        <meshStandardMaterial color="#b789ff" roughness={0.66} />
      </mesh>
      <mesh castShadow position={[0.18, 0.72, -0.05]}>
        <cylinderGeometry args={[0.12, 0.16, 0.2, 8]} />
        <meshStandardMaterial color="#7ea36b" roughness={0.68} />
      </mesh>
    </group>
  );
}

function CursedRecliner() {
  return (
    <group>
      <mesh castShadow position={[0, 0.36, 0.08]}>
        <boxGeometry args={[0.74, 0.36, 0.72]} />
        <meshStandardMaterial color="#614873" roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0, 0.78, 0.34]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.78, 0.82, 0.22]} />
        <meshStandardMaterial color="#72548a" emissive="#351f47" emissiveIntensity={0.12} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-0.48, 0.48, 0.04]}>
        <boxGeometry args={[0.18, 0.44, 0.72]} />
        <meshStandardMaterial color="#523d66" roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0.48, 0.48, 0.04]}>
        <boxGeometry args={[0.18, 0.44, 0.72]} />
        <meshStandardMaterial color="#523d66" roughness={0.74} />
      </mesh>
    </group>
  );
}

function TrashBlockade() {
  return (
    <group>
      <mesh castShadow position={[-0.3, 0.34, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.66, 8]} />
        <meshStandardMaterial color="#56636a" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.18, 0.26, 0.1]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.5, 0.34, 0.38]} />
        <meshStandardMaterial color="#8f704d" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0.36, 0.62, -0.08]}>
        <boxGeometry args={[0.58, 0.28, 0.06]} />
        <meshStandardMaterial color="#f2ead9" roughness={0.72} />
      </mesh>
    </group>
  );
}

function RaccoonPodium() {
  return (
    <group>
      <mesh castShadow position={[0, 0.32, 0]}>
        <boxGeometry args={[0.72, 0.64, 0.42]} />
        <meshStandardMaterial color="#8f704d" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.98, 0.05]}>
        <sphereGeometry args={[0.26, 12, 8]} />
        <meshStandardMaterial color="#6c7270" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 1.02, 0.23]}>
        <boxGeometry args={[0.42, 0.1, 0.08]} />
        <meshStandardMaterial color="#2c3032" roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0.33, 0.88, -0.02]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.08, 0.1, 0.56, 8]} />
        <meshStandardMaterial color="#5d6260" roughness={0.72} />
      </mesh>
    </group>
  );
}

function ProtestSign() {
  return (
    <group>
      <mesh castShadow position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 1.1, 6]} />
        <meshStandardMaterial color="#775238" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 1.12, 0]}>
        <boxGeometry args={[0.68, 0.36, 0.05]} />
        <meshStandardMaterial color="#f5e0b7" roughness={0.72} />
      </mesh>
    </group>
  );
}

function CameraTripod() {
  return (
    <group>
      <mesh castShadow position={[0, 1.0, 0]}>
        <boxGeometry args={[0.38, 0.24, 0.24]} />
        <meshStandardMaterial color="#2e333d" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0.28, 1.0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 10]} />
        <meshStandardMaterial color="#15171d" roughness={0.45} />
      </mesh>
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rotation) => (
        <mesh key={rotation} castShadow position={[0, 0.48, 0]} rotation={[0.7, rotation, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 1.0, 6]} />
          <meshStandardMaterial color="#333842" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function BrokenRingLight() {
  return (
    <group>
      <mesh castShadow position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.035, 8, 20]} />
        <meshStandardMaterial color="#fff6df" emissive="#ffd58e" emissiveIntensity={0.25} roughness={0.52} />
      </mesh>
      <mesh castShadow position={[0.24, 1.22, 0.02]} rotation={[0.2, 0, 0.6]}>
        <boxGeometry args={[0.28, 0.08, 0.08]} />
        <meshStandardMaterial color="#30323a" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 1.1, 6]} />
        <meshStandardMaterial color="#333842" roughness={0.55} />
      </mesh>
    </group>
  );
}

function GlowingSinkhole() {
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.08;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.06, 24]} />
        <meshStandardMaterial color="#221b2e" roughness={0.78} />
      </mesh>
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <torusGeometry args={[0.82, 0.08, 8, 24]} />
        <meshStandardMaterial color="#9d7cff" emissive="#7555ff" emissiveIntensity={1.1} roughness={0.35} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#9d7cff" intensity={1.0} distance={5} />
    </group>
  );
}

function WarningCone() {
  return (
    <group>
      <mesh castShadow position={[0, 0.28, 0]}>
        <coneGeometry args={[0.22, 0.56, 4]} />
        <meshStandardMaterial color="#f47c42" roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial color="#4f3d34" roughness={0.68} />
      </mesh>
    </group>
  );
}

function WarningSign() {
  return (
    <group>
      <mesh castShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 1.0, 6]} />
        <meshStandardMaterial color="#775238" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 1.03, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.48, 0.48, 0.05]} />
        <meshStandardMaterial color="#ffbd68" roughness={0.62} />
      </mesh>
    </group>
  );
}

function DroneCrate() {
  return (
    <group>
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.62, 0.5, 0.52]} />
        <meshStandardMaterial color="#c28a56" roughness={0.76} />
      </mesh>
      <mesh castShadow position={[0.48, 0.2, 0.18]} rotation={[0.2, 0.1, -0.12]}>
        <boxGeometry args={[0.44, 0.4, 0.38]} />
        <meshStandardMaterial color="#9f7652" roughness={0.78} />
      </mesh>
    </group>
  );
}

function ScatteredBoxes() {
  return (
    <group>
      <mesh castShadow position={[-0.28, 0.24, 0]}>
        <boxGeometry args={[0.5, 0.48, 0.5]} />
        <meshStandardMaterial color="#9a6a43" roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0.26, 0.18, 0.12]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.42, 0.36, 0.42]} />
        <meshStandardMaterial color="#c08a56" roughness={0.74} />
      </mesh>
    </group>
  );
}

function DecorationShape({ kind }: { kind: DecorationKind }) {
  if (kind === 'delivery_drone') return <DeliveryDrone />;
  if (kind === 'signal_jammer') return <SignalJammer />;
  if (kind === 'yard_sale_table') return <YardSaleTable />;
  if (kind === 'cursed_recliner') return <CursedRecliner />;
  if (kind === 'trash_blockade') return <TrashBlockade />;
  if (kind === 'raccoon_podium') return <RaccoonPodium />;
  if (kind === 'protest_sign') return <ProtestSign />;
  if (kind === 'camera_tripod') return <CameraTripod />;
  if (kind === 'broken_ring_light') return <BrokenRingLight />;
  if (kind === 'glowing_sinkhole') return <GlowingSinkhole />;
  if (kind === 'warning_cone') return <WarningCone />;
  if (kind === 'warning_sign') return <WarningSign />;
  if (kind === 'drone_crate') return <DroneCrate />;
  return <ScatteredBoxes />;
}

export function EventDecorations() {
  const activeEventId = useGameStore((state) => state.activeEventId);
  const progressByEvent = useGameStore((state) => state.progressByEvent);
  const nearestZoneId = useGameStore((state) => state.nearestZoneId);
  const event = getEventConfig(activeEventId);
  const progress = progressByEvent[activeEventId] ?? { status: 'not_started', stepIndex: 0, collectedItemIds: [], completedZoneIds: [] };
  const currentStep = event.questSteps[progress.stepIndex];

  return (
    <group>
      {event.temporaryDecorations.map((decoration) => (
        <group
          key={decoration.id}
          position={decoration.position}
          rotation={[0, decoration.rotationY ?? 0, 0]}
          scale={decoration.scale ?? 1}
        >
          <DecorationShape kind={decoration.kind} />
        </group>
      ))}

      {event.interactionZones.map((zone) => {
        const relevant =
          currentStep?.type === 'interact' &&
          currentStep.zoneIds.includes(zone.id) &&
          !progress.completedZoneIds.includes(zone.id) &&
          progress.status !== 'completed';
        if (!relevant) {
          return null;
        }

        return (
          <group key={zone.id} position={[zone.position.x, 0.05, zone.position.z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[zone.radius * 0.54, zone.radius * 0.66, 32]} />
              <meshBasicMaterial color={zone.markerColor} transparent opacity={nearestZoneId === zone.id ? 0.62 : 0.36} depthWrite={false} />
            </mesh>
            <Html center position={[0, 0.8, 0]} distanceFactor={9}>
              <div className={`world-label ${nearestZoneId === zone.id ? 'interaction-prompt' : ''}`}>
                {nearestZoneId === zone.id ? zone.prompt : zone.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
