interface GoblinHatProps {
  position?: [number, number, number];
  scale?: number;
}

export function GoblinHat({ position = [0, 0, 0], scale = 1 }: GoblinHatProps) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.08, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.42, 0.58, 4]} />
        <meshStandardMaterial color="#5aa15f" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-0.34, -0.02, 0.02]} rotation={[0, 0.1, -0.9]}>
        <coneGeometry args={[0.14, 0.4, 4]} />
        <meshStandardMaterial color="#6fc070" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0.34, -0.02, 0.02]} rotation={[0, -0.1, 0.9]}>
        <coneGeometry args={[0.14, 0.4, 4]} />
        <meshStandardMaterial color="#6fc070" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.48, 0.5, 0.12, 6]} />
        <meshStandardMaterial color="#3f7c49" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0.12, -0.16, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.18, 0.06, 0.04]} />
        <meshStandardMaterial color="#f0c767" roughness={0.52} />
      </mesh>
    </group>
  );
}
