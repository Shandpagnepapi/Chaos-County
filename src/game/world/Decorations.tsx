import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

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

function ParkedCar({ position, color, rotationY = 0 }: { position: [number, number, number]; color: string; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow position={[0, 0.32, 0]}>
        <boxGeometry args={[1.18, 0.38, 0.68]} />
        <meshStandardMaterial color={color} roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0.03, 0.63, -0.03]}>
        <boxGeometry args={[0.7, 0.34, 0.48]} />
        <meshStandardMaterial color="#d8e6ed" roughness={0.36} />
      </mesh>
      {[-0.45, 0.45].map((x) =>
        [-0.36, 0.36].map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, 0.16, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.12, 10]} />
            <meshStandardMaterial color="#2f3338" roughness={0.6} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mailbox({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.68, 6]} />
        <meshStandardMaterial color="#4e5964" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.74, 0.08]}>
        <boxGeometry args={[0.42, 0.22, 0.28]} />
        <meshStandardMaterial color="#5f9ea0" roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0.26, 0.78, 0.08]}>
        <boxGeometry args={[0.05, 0.28, 0.05]} />
        <meshStandardMaterial color="#f2c66d" roughness={0.52} />
      </mesh>
    </group>
  );
}

function CountySign({ position, text = 'ALERT', rotationY = 0 }: { position: [number, number, number]; text?: string; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow position={[-0.34, 0.62, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 1.2, 6]} />
        <meshStandardMaterial color="#665044" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0.34, 0.62, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 1.2, 6]} />
        <meshStandardMaterial color="#665044" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 1.08, 0]}>
        <boxGeometry args={[1.05, 0.46, 0.08]} />
        <meshStandardMaterial color="#f0d6a2" roughness={0.66} />
      </mesh>
      <mesh castShadow position={[0, 1.1, 0.055]}>
        <boxGeometry args={[0.7, 0.08, 0.02]} />
        <meshStandardMaterial color={text === 'ALERT' ? '#c66b4f' : '#547c84'} roughness={0.58} />
      </mesh>
    </group>
  );
}

function FlowerPatch({ position, color = '#f3b6a4' }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} castShadow position={[-0.18 + index * 0.18, 0.13, (index % 2) * 0.12]}>
          <sphereGeometry args={[0.055, 8, 6]} />
          <meshStandardMaterial color={color} roughness={0.65} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.08, 0.04]}>
        <boxGeometry args={[0.42, 0.04, 0.26]} />
        <meshStandardMaterial color="#6f8f68" roughness={0.82} />
      </mesh>
    </group>
  );
}

function PowerPole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 2.5, 8]} />
        <meshStandardMaterial color="#6e5546" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0, 2.23, 0]}>
        <boxGeometry args={[0.95, 0.08, 0.08]} />
        <meshStandardMaterial color="#5f4a3d" roughness={0.78} />
      </mesh>
      <mesh position={[0, 2.22, 0]}>
        <torusGeometry args={[0.1, 0.018, 6, 10]} />
        <meshStandardMaterial color="#e9e1c8" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Fireflies() {
  const ref = useRef<Group>(null);
  const points = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        x: -15 + ((index * 4.7) % 30),
        y: 1.1 + ((index * 0.37) % 1.6),
        z: -9 + ((index * 3.4) % 18),
        phase: index * 0.7
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }
    ref.current.children.forEach((child, index) => {
      const point = points[index];
      child.position.y = point.y + Math.sin(clock.elapsedTime * 1.2 + point.phase) * 0.08;
    });
  });

  return (
    <group ref={ref}>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color="#ffe5a6" emissive="#ffc76d" emissiveIntensity={0.65} roughness={0.4} />
        </mesh>
      ))}
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
      Array.from({ length: 72 }, (_, index) => ({
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
      <PowerPole position={[-14.6, 0, -2.2]} />
      <PowerPole position={[14.8, 0, -2.0]} />
      <LowPolyTrashCan position={[-6.0, 0, -3.0]} />
      <LowPolyTrashCan position={[-12.9, 0, -2.25]} />
      <LowPolyTrashCan position={[-8.2, 0, -2.12]} />
      <LowPolyTrashCan position={[8.0, 0, -5.1]} />
      <LowPolyTrashCan position={[2.2, 0, 5.0]} />
      <ParkedCar position={[-12.4, 0, -1.2]} color="#cf795e" rotationY={Math.PI / 2} />
      <ParkedCar position={[-10.4, 0, -2.85]} color="#d0a562" rotationY={Math.PI / 2} />
      <ParkedCar position={[1.3, 0, 2.85]} color="#5f8d95" rotationY={0} />
      <ParkedCar position={[7.6, 0, -1.4]} color="#d7b56d" rotationY={Math.PI} />
      <ParkedCar position={[12.9, 0, 2.85]} color="#6c8fa3" rotationY={0} />
      <Mailbox position={[-3.1, 0, -5.1]} rotationY={Math.PI} />
      <Mailbox position={[-13.1, 0, 4.55]} rotationY={Math.PI / 2} />
      <Mailbox position={[5.6, 0, 5.0]} rotationY={0.1} />
      <Mailbox position={[10.8, 0, 4.3]} rotationY={-0.2} />
      <CountySign position={[-12.0, 0, -2.55]} text="ALERT" rotationY={0.2} />
      <CountySign position={[-8.0, 0, -2.18]} text="BOARD" rotationY={-0.25} />
      <CountySign position={[14.0, 0, 2.35]} text="WOODS" rotationY={-0.5} />
      <GasCrate position={[-8.3, 0, -3.4]} />
      <GasCrate position={[-7.7, 0, -3.25]} />
      <GasCrate position={[-13.4, 0, -4.2]} />
      <GasCrate position={[-12.8, 0, -3.65]} />
      <GasCrate position={[-8.8, 0, -2.65]} />
      <FlowerPatch position={[-5.1, 0, -6.1]} color="#f0a28e" />
      <FlowerPatch position={[6.2, 0, 6.8]} color="#ffd27a" />
      <FlowerPatch position={[12.4, 0, -4.6]} color="#9fcac5" />
      <FlowerPatch position={[-1.2, 0, 10.1]} color="#f0a28e" />
      <LockedGateDetails />
      <Fireflies />
    </group>
  );
}
