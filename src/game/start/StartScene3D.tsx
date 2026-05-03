import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { StaticModel } from '../assets/StaticModel';
import { worldAssets } from '../config/assets';
import { Lighting } from '../world/Lighting';
import { RoadsAndGround } from '../world/RoadsAndGround';

export function StartScene3D() {
  const townRef = useRef<Group>(null);

  useFrame(({ camera, clock }) => {
    camera.position.set(
      -6.4 + Math.sin(clock.elapsedTime * 0.18) * 0.45,
      6.8 + Math.sin(clock.elapsedTime * 0.13) * 0.16,
      9.2 + Math.cos(clock.elapsedTime * 0.16) * 0.45
    );
    camera.lookAt(-1.6, 0.8, -1.8);

    if (townRef.current) {
      townRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.025;
    }
  });

  return (
    <>
      <Lighting />
      <RoadsAndGround />
      <group ref={townRef}>
        <StaticModel src={worldAssets.gasStation} position={[-7.5, 0, -4.7]} rotation={[0, Math.PI, 0]} scale={2.55} />
        <StaticModel src={worldAssets.storage} position={[-4.2, 0, -4.2]} rotation={[0, Math.PI, 0]} scale={2.0} />
        <StaticModel src={worldAssets.houseA} position={[0.2, 0, -5.2]} rotation={[0, Math.PI, 0]} scale={2.1} />
        <StaticModel src={worldAssets.houseC} position={[4.5, 0, -4.3]} rotation={[0, Math.PI, 0]} scale={2.15} />
        <StaticModel src={worldAssets.townHall} position={[7.9, 0, -4.9]} rotation={[0, Math.PI, 0]} scale={2.45} />
        <StaticModel src={worldAssets.drivewayLong} position={[-7.5, 0.02, -2.1]} scale={2.5} />
        <StaticModel src={worldAssets.pathShort} position={[0.2, 0.02, -3.1]} scale={1.8} />
        <StaticModel src={worldAssets.treeLarge} position={[-10.3, 0, -6.6]} scale={2.1} />
        <StaticModel src={worldAssets.treeSmall} position={[10.1, 0, -6.1]} scale={1.9} />
        <StaticModel src={worldAssets.planter} position={[-2.0, 0, -3.9]} scale={1.7} />
      </group>
      <mesh position={[-7.2, 2.8, -2.8]}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshStandardMaterial color="#ffd58e" emissive="#ffd58e" emissiveIntensity={1.2} />
      </mesh>
    </>
  );
}
