import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

interface SnackBagProps {
  position: [number, number, number];
  onCollect: () => void;
}

export function SnackBag({ position, onCollect }: SnackBagProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 3.2 + position[0]) * 0.12;
    ref.current.rotation.y += 0.018;
  });

  return (
    <group ref={ref} position={position}>
      <mesh onClick={onCollect} castShadow>
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]}>
        <circleGeometry args={[0.46, 24]} />
        <meshBasicMaterial color="#ffce6f" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <Html center position={[0, 0.92, 0]} distanceFactor={9} zIndexRange={[2, 0]}>
        <div className="world-label">Snack Bag</div>
      </Html>
    </group>
  );
}
