import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group } from 'three';
import { PerspectiveCamera } from 'three';
import { StaticModel } from '../assets/StaticModel';
import { BlockyCharacter } from '../characters/BlockyCharacter';
import { characterAssets, worldAssets } from '../config/assets';
import { Lighting } from '../world/Lighting';
import { RoadsAndGround } from '../world/RoadsAndGround';

function TitleFireflies() {
  const ref = useRef<Group>(null);
  const points = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        x: -9 + ((index * 2.3) % 18),
        y: 1.4 + ((index * 0.31) % 2.2),
        z: -7 + ((index * 1.8) % 8),
        phase: index * 0.55
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }
    ref.current.children.forEach((child, index) => {
      const point = points[index];
      child.position.y = point.y + Math.sin(clock.elapsedTime * 1.3 + point.phase) * 0.12;
      child.position.x = point.x + Math.sin(clock.elapsedTime * 0.35 + point.phase) * 0.08;
    });
  });

  return (
    <group ref={ref}>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color="#ffe7a6" emissive="#ffbf67" emissiveIntensity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

export function StartScene3D() {
  const townRef = useRef<Group>(null);

  useFrame(({ camera, clock }) => {
    camera.position.set(
      -8.2 + Math.sin(clock.elapsedTime * 0.18) * 0.5,
      4.7 + Math.sin(clock.elapsedTime * 0.13) * 0.14,
      8.4 + Math.cos(clock.elapsedTime * 0.16) * 0.45
    );
    camera.lookAt(-2.2, 1.0, -3.0);

    if (camera instanceof PerspectiveCamera) {
      camera.fov = 45;
      camera.updateProjectionMatrix();
    }

    if (townRef.current) {
      townRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.025;
    }
  });

  return (
    <>
      <Lighting />
      <RoadsAndGround />
      <group ref={townRef}>
        <StaticModel src={worldAssets.gasStation} position={[-7.7, 0, -4.5]} rotation={[0, Math.PI, 0]} scale={2.65} />
        <StaticModel src={worldAssets.storage} position={[-4.1, 0, -4.0]} rotation={[0, Math.PI, 0]} scale={2.0} />
        <StaticModel src={worldAssets.houseA} position={[0.2, 0, -5.5]} rotation={[0, Math.PI, 0]} scale={2.1} />
        <StaticModel src={worldAssets.houseC} position={[4.7, 0, -4.4]} rotation={[0, Math.PI, 0]} scale={2.15} />
        <StaticModel src={worldAssets.townHall} position={[8.2, 0, -4.9]} rotation={[0, Math.PI, 0]} scale={2.45} />
        <StaticModel src={worldAssets.drivewayLong} position={[-7.7, 0.02, -1.9]} scale={2.5} />
        <StaticModel src={worldAssets.pathShort} position={[0.2, 0.02, -3.1]} scale={1.8} />
        <StaticModel src={worldAssets.treeLarge} position={[-10.3, 0, -6.6]} scale={2.4} />
        <StaticModel src={worldAssets.treeSmall} position={[10.1, 0, -6.1]} scale={1.9} />
        <StaticModel src={worldAssets.treeLarge} position={[-11.4, 0, -1.4]} scale={2.15} />
        <StaticModel src={worldAssets.planter} position={[-2.0, 0, -3.9]} scale={1.7} />
        <BlockyCharacter model={characterAssets.bigDale} position={[-7.4, 0, -2.2]} rotationY={Math.PI} scale={0.75} />
        <BlockyCharacter model={characterAssets.tammy} position={[-1.2, 0, -2.8]} rotationY={-0.2} scale={0.72} />
        <mesh castShadow position={[-6.4, 0.34, -2.2]}>
          <boxGeometry args={[0.8, 0.42, 0.55]} />
          <meshStandardMaterial color="#c27b5e" roughness={0.58} />
        </mesh>
      </group>
      <mesh position={[-7.2, 2.8, -2.8]}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshStandardMaterial color="#ffd58e" emissive="#ffd58e" emissiveIntensity={1.2} />
      </mesh>
      <pointLight position={[-7.2, 2.55, -2.8]} intensity={0.55 + Math.sin(performance.now() * 0.006) * 0.08} color="#ffd58e" distance={5} />
      <TitleFireflies />
    </>
  );
}
