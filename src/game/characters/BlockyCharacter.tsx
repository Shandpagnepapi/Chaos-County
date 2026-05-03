import { Clone, Html, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import type { Group, Mesh, Object3D } from 'three';
import { MathUtils } from 'three';
import { EventCosmetic } from '../items/EventCosmetic';

interface BlockyCharacterProps {
  model: string;
  position: [number, number, number];
  rotationY?: number;
  moving?: boolean;
  name?: string;
  title?: string;
  showHat?: boolean;
  cosmeticId?: string;
  scale?: number;
}

export function BlockyCharacter({
  model,
  position,
  rotationY = 0,
  moving = false,
  name,
  title,
  showHat = false,
  cosmeticId,
  scale = 0.52
}: BlockyCharacterProps) {
  const gltf = useGLTF(model);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    gltf.scene.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [gltf.scene]);

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, moving ? Math.sin(Date.now() * 0.016) * 0.03 : 0, 0]}>
        <Clone object={gltf.scene} />
        <EventCosmetic cosmeticId={cosmeticId ?? (showHat ? 'goblin_hat' : undefined)} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <circleGeometry args={[0.58, 24]} />
        <meshBasicMaterial color="#1a1110" transparent opacity={0.24} depthWrite={false} />
      </mesh>
      {name ? (
        <Html center position={[0, 2.08, 0]} distanceFactor={10}>
          <div className="world-label">
            {name}
            {title ? <span style={{ display: 'block', opacity: 0.74, fontSize: 9 }}>{title}</span> : null}
          </div>
        </Html>
      ) : null}
    </group>
  );
}

export function rotationFromVelocity(current: number, velocity: { x: number; z: number }): number {
  if (Math.abs(velocity.x) + Math.abs(velocity.z) < 0.001) {
    return current;
  }

  return MathUtils.lerp(current, Math.atan2(velocity.x, velocity.z), 0.28);
}
