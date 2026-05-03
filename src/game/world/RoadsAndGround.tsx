import { worldBounds } from '../config/world';

function GroundPlane({ position, size, color, opacity = 1 }: { position: [number, number, number]; size: [number, number]; color: string; opacity?: number }) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.92} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
}

export function RoadsAndGround() {
  const width = worldBounds.maxX - worldBounds.minX;
  const depth = worldBounds.maxZ - worldBounds.minZ;

  return (
    <group>
      <GroundPlane position={[0, -0.02, 0]} size={[width + 6, depth + 6]} color="#718567" />
      <GroundPlane position={[0, 0.005, 0]} size={[width, 4.0]} color="#3d4552" />
      <GroundPlane position={[4.6, 0.006, 0]} size={[4.0, depth]} color="#3d4552" />
      <GroundPlane position={[0, 0.012, 0]} size={[width, 2.55]} color="#4d5866" />
      <GroundPlane position={[4.6, 0.013, 0]} size={[2.55, depth]} color="#4d5866" />
      <GroundPlane position={[0, 0.018, -2.08]} size={[width, 0.22]} color="#b4b1a7" />
      <GroundPlane position={[0, 0.018, 2.08]} size={[width, 0.22]} color="#b4b1a7" />
      <GroundPlane position={[2.52, 0.019, 0]} size={[0.22, depth]} color="#b4b1a7" />
      <GroundPlane position={[6.68, 0.019, 0]} size={[0.22, depth]} color="#b4b1a7" />
      {Array.from({ length: 11 }).map((_, index) => (
        <GroundPlane key={`line-h-${index}`} position={[-15.5 + index * 3.1, 0.021, 0]} size={[1.25, 0.08]} color="#f3dcc0" opacity={0.36} />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <GroundPlane key={`line-v-${index}`} position={[4.6, 0.022, -11 + index * 3.1]} size={[0.08, 1.25]} color="#f3dcc0" opacity={0.36} />
      ))}
      <GroundPlane position={[-1.0, 0.01, 9.7]} size={[6.8, 5.0]} color="#7f946f" />
      <GroundPlane position={[-11.0, 0.011, -3.7]} size={[5.7, 2.6]} color="#424b58" />
    </group>
  );
}
