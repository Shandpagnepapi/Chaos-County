import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import type { CollectibleDefinition, CollectibleType } from '../config/events';

interface EventCollectibleProps {
  type: CollectibleType;
  definition: CollectibleDefinition;
  position: [number, number, number];
  onCollect: () => void;
}

function SnackBagShape() {
  return (
    <>
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.58, 0.18]} />
        <meshStandardMaterial color="#cf563e" roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0, 0.34, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.28, 0.1, 0.2]} />
        <meshStandardMaterial color="#f0c767" roughness={0.66} />
      </mesh>
      <mesh position={[0, 0.02, 0.096]}>
        <boxGeometry args={[0.3, 0.08, 0.018]} />
        <meshStandardMaterial color="#fff1c9" roughness={0.55} />
      </mesh>
    </>
  );
}

function PackageShape() {
  return (
    <>
      <mesh castShadow>
        <boxGeometry args={[0.52, 0.44, 0.52]} />
        <meshStandardMaterial color="#c28a56" roughness={0.76} />
      </mesh>
      <mesh castShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.12]} />
        <meshStandardMaterial color="#7e5a40" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.58]} />
        <meshStandardMaterial color="#7e5a40" roughness={0.72} />
      </mesh>
    </>
  );
}

function BatteryShape() {
  return (
    <>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.58, 10]} />
        <meshStandardMaterial color="#5f6e75" roughness={0.5} metalness={0.18} />
      </mesh>
      <mesh castShadow position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 10]} />
        <meshStandardMaterial color="#9fd7ff" emissive="#6db9ff" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

function StickerShape() {
  return (
    <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.24, 0.24, 0.06, 6]} />
      <meshStandardMaterial color="#ffd25f" roughness={0.55} />
    </mesh>
  );
}

function AntiqueShape() {
  return (
    <>
      <mesh castShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 0.42, 8]} />
        <meshStandardMaterial color="#795e91" roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial color="#b596d4" roughness={0.55} />
      </mesh>
    </>
  );
}

function BottleCapShape() {
  return (
    <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
      <meshStandardMaterial color="#d9e8ec" roughness={0.36} metalness={0.35} />
    </mesh>
  );
}

function LeftoversShape() {
  return (
    <>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.32, 0.42]} />
        <meshStandardMaterial color="#f2ead9" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.34]} />
        <meshStandardMaterial color="#c85f4e" roughness={0.68} />
      </mesh>
    </>
  );
}

function RingLightShape() {
  return (
    <>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.035, 8, 18]} />
        <meshStandardMaterial color="#f2f4f0" emissive="#fff7d5" emissiveIntensity={0.28} roughness={0.45} />
      </mesh>
      <mesh castShadow position={[0.1, -0.08, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.08]} />
        <meshStandardMaterial color="#30323a" roughness={0.6} />
      </mesh>
    </>
  );
}

function TearShape() {
  return (
    <>
      <mesh castShadow position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color="#8ed7ff" transparent opacity={0.82} roughness={0.18} />
      </mesh>
      <mesh castShadow position={[0, 0.16, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.14, 0.28, 10]} />
        <meshStandardMaterial color="#8ed7ff" transparent opacity={0.82} roughness={0.18} />
      </mesh>
    </>
  );
}

function ScriptShape() {
  return (
    <>
      <mesh castShadow rotation={[0.25, 0.2, 0]}>
        <boxGeometry args={[0.46, 0.04, 0.34]} />
        <meshStandardMaterial color="#fff6df" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.035, 0.08]} rotation={[0.25, 0.2, 0]}>
        <boxGeometry args={[0.32, 0.012, 0.025]} />
        <meshStandardMaterial color="#4f5966" roughness={0.5} />
      </mesh>
    </>
  );
}

function RockShape() {
  return (
    <mesh castShadow rotation={[0.2, 0.5, -0.1]}>
      <dodecahedronGeometry args={[0.26, 0]} />
      <meshStandardMaterial color="#756a91" emissive="#5d4aa7" emissiveIntensity={0.16} roughness={0.8} />
    </mesh>
  );
}

function LostItemShape() {
  return (
    <>
      <mesh castShadow>
        <boxGeometry args={[0.46, 0.32, 0.38]} />
        <meshStandardMaterial color="#4f87a7" roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.32, 0.08, 0.3]} />
        <meshStandardMaterial color="#f2c76d" roughness={0.58} />
      </mesh>
    </>
  );
}

function ShapeByType({ type }: { type: CollectibleType }) {
  if (type === 'mystery_package') return <PackageShape />;
  if (type === 'drone_battery') return <BatteryShape />;
  if (type === 'yard_sale_sticker') return <StickerShape />;
  if (type === 'questionable_antique') return <AntiqueShape />;
  if (type === 'shiny_bottle_cap') return <BottleCapShape />;
  if (type === 'premium_leftovers') return <LeftoversShape />;
  if (type === 'ring_light_piece') return <RingLightShape />;
  if (type === 'fake_tear_drop') return <TearShape />;
  if (type === 'apology_script') return <ScriptShape />;
  if (type === 'strange_rock') return <RockShape />;
  if (type === 'lost_town_item') return <LostItemShape />;
  return <SnackBagShape />;
}

export function EventCollectible({ type, definition, position, onCollect }: EventCollectibleProps) {
  const ref = useRef<Group>(null);
  const rare = definition.tone === 'rare';

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * (rare ? 3.8 : 3.2) + position[0]) * 0.12;
    ref.current.rotation.y += rare ? 0.024 : 0.018;
  });

  return (
    <group ref={ref} position={position} onClick={onCollect}>
      <ShapeByType type={type} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]}>
        <circleGeometry args={[rare ? 0.58 : 0.46, 24]} />
        <meshBasicMaterial
          color={rare ? '#aaddff' : '#ffce6f'}
          transparent
          opacity={rare ? 0.28 : 0.22}
          depthWrite={false}
        />
      </mesh>
      <Html center position={[0, 0.92, 0]} distanceFactor={9} zIndexRange={[2, 0]}>
        <div className={`world-label ${rare ? 'rare-label' : ''}`}>{definition.label}</div>
      </Html>
    </group>
  );
}
