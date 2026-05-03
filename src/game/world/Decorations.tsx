import { useMemo } from 'react';

function LowPolyTrashCan({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.7, 8]} />
        <meshStandardMaterial color="#56636a" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.28, 0.24, 0.1, 8]} />
        <meshStandardMaterial color="#384247" roughness={0.78} />
      </mesh>
    </group>
  );
}

function Streetlight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 2.2, 8]} />
        <meshStandardMaterial color="#3e3e47" roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0.22, 2.15, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.18]} />
        <meshStandardMaterial color="#424654" roughness={0.58} />
      </mesh>
      <mesh position={[0.45, 2.08, 0]}>
        <sphereGeometry args={[0.13, 12, 8]} />
        <meshStandardMaterial emissive="#ffd58e" emissiveIntensity={1.3} color="#ffe7ad" />
      </mesh>
      <pointLight position={[0.45, 2.0, 0]} intensity={0.55} color="#ffd58e" distance={5} />
    </group>
  );
}

function GasCrate({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial color="#9a6a43" roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.6]} />
        <meshStandardMaterial color="#c08a56" roughness={0.74} />
      </mesh>
    </group>
  );
}

function LockedGateDetails() {
  return (
    <group position={[15.6, 0.35, 1.1]}>
      <mesh castShadow position={[0, 0.82, 0]}>
        <boxGeometry args={[1.8, 0.18, 0.16]} />
        <meshStandardMaterial color="#6c4935" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.48, 0]}>
        <boxGeometry args={[1.8, 0.18, 0.16]} />
        <meshStandardMaterial color="#6c4935" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.64, 0.12]}>
        <boxGeometry args={[0.28, 0.34, 0.08]} />
        <meshStandardMaterial color="#d3a65f" roughness={0.45} />
      </mesh>
    </group>
  );
}

export function Decorations() {
  const grassTufts = useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => ({
        x: -17 + ((index * 5.7) % 34),
        z: -13 + ((index * 3.9) % 26),
        scale: 0.75 + ((index * 17) % 6) * 0.07
      })).filter((tuft) => Math.abs(tuft.z) > 2.4 && Math.abs(tuft.x - 4.6) > 2.4),
    []
  );

  return (
    <group>
      {grassTufts.map((tuft, index) => (
        <group key={index} position={[tuft.x, 0.035, tuft.z]} scale={tuft.scale}>
          <mesh castShadow position={[-0.09, 0.13, 0]} rotation={[0.3, 0, -0.2]}>
            <coneGeometry args={[0.05, 0.28, 4]} />
            <meshStandardMaterial color="#6f8253" roughness={0.85} />
          </mesh>
          <mesh castShadow position={[0.06, 0.11, 0.04]} rotation={[0.2, 0.2, 0.18]}>
            <coneGeometry args={[0.045, 0.24, 4]} />
            <meshStandardMaterial color="#788e59" roughness={0.85} />
          </mesh>
        </group>
      ))}
      <Streetlight position={[-4.8, 0, -2.35]} />
      <Streetlight position={[8.1, 0, -2.35]} />
      <Streetlight position={[-7.7, 0, 2.35]} />
      <Streetlight position={[12.2, 0, 2.35]} />
      <LowPolyTrashCan position={[-6.0, 0, -3.0]} />
      <LowPolyTrashCan position={[8.0, 0, -5.1]} />
      <LowPolyTrashCan position={[2.2, 0, 5.0]} />
      <GasCrate position={[-8.3, 0, -3.4]} />
      <GasCrate position={[-7.7, 0, -3.25]} />
      <GasCrate position={[-13.4, 0, -4.2]} />
      <LockedGateDetails />
    </group>
  );
}
