import { worldBounds } from '../config/world';

interface SlabProps {
  position: [number, number, number];
  size: [number, number];
  color: string;
  height?: number;
  opacity?: number;
}

function LowPolySlab({ position, size, color, height = 0.08, opacity = 1 }: SlabProps) {
  return (
    <mesh receiveShadow position={[position[0], position[1] - height / 2, position[2]]}>
      <boxGeometry args={[size[0], height, size[1]]} />
      <meshStandardMaterial
        color={color}
        roughness={0.92}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

type RoadMarkProps = Omit<SlabProps, 'color'> & { color?: string };

function RoadMark({ position, size, color = '#f5d7ab', opacity = 0.5 }: RoadMarkProps) {
  return <LowPolySlab position={position} size={size} color={color} height={0.018} opacity={opacity} />;
}

const lawnPatches = [
  { position: [-13.5, -0.012, -10.2], size: [7.0, 4.4], color: '#94aa74' },
  { position: [-2.0, -0.01, -11.0], size: [8.5, 3.8], color: '#8da36d' },
  { position: [10.9, -0.008, -10.0], size: [8.8, 4.6], color: '#92a872' },
  { position: [-11.0, -0.01, 7.8], size: [8.4, 6.2], color: '#8ea46f' },
  { position: [0.7, -0.008, 10.1], size: [9.7, 4.7], color: '#97ad76' },
  { position: [11.5, -0.01, 8.6], size: [8.8, 5.3], color: '#899f6a' }
] satisfies Array<{ position: [number, number, number]; size: [number, number]; color: string }>;

const drivewayPads = [
  { position: [-10.9, 0.035, -3.35], size: [4.8, 1.55] },
  { position: [-6.9, 0.036, -3.15], size: [2.6, 1.25] },
  { position: [9.8, 0.035, -4.0], size: [3.5, 1.1] },
  { position: [4.8, 0.034, 4.25], size: [2.4, 1.3] },
  { position: [10.3, 0.034, 3.55], size: [2.7, 1.35] }
] satisfies Array<{ position: [number, number, number]; size: [number, number] }>;

const lotEdges = [
  { position: [-13.6, 0.074, 4.45], size: [3.6, 0.12] },
  { position: [-2.7, 0.074, 5.05], size: [3.2, 0.12] },
  { position: [4.8, 0.074, 5.2], size: [3.0, 0.12] },
  { position: [10.3, 0.074, 4.0], size: [3.3, 0.12] },
  { position: [-3.4, 0.074, -5.55], size: [3.2, 0.12] },
  { position: [2.5, 0.074, -5.62], size: [3.2, 0.12] }
] satisfies Array<{ position: [number, number, number]; size: [number, number] }>;

export function RoadsAndGround() {
  const width = worldBounds.maxX - worldBounds.minX;
  const depth = worldBounds.maxZ - worldBounds.minZ;

  return (
    <group>
      <LowPolySlab position={[0, -0.06, 0]} size={[width + 8, depth + 8]} color="#7f9664" height={0.16} />

      {lawnPatches.map((patch) => (
        <LowPolySlab
          key={`${patch.position[0]}-${patch.position[2]}`}
          position={patch.position}
          size={patch.size}
          color={patch.color}
          height={0.055}
        />
      ))}

      <LowPolySlab position={[0, 0.012, 0]} size={[width + 1.2, 4.55]} color="#333b47" height={0.14} />
      <LowPolySlab position={[4.6, 0.014, 0]} size={[4.55, depth + 0.8]} color="#333b47" height={0.14} />
      <LowPolySlab position={[0, 0.045, 0]} size={[width + 0.2, 2.85]} color="#465463" height={0.055} />
      <LowPolySlab position={[4.6, 0.046, 0]} size={[2.85, depth + 0.2]} color="#465463" height={0.055} />
      <LowPolySlab position={[4.6, 0.052, 0]} size={[4.0, 4.0]} color="#4b5967" height={0.045} />

      <LowPolySlab position={[0, 0.08, -2.48]} size={[width + 0.9, 0.32]} color="#c9c0ad" height={0.16} />
      <LowPolySlab position={[0, 0.08, 2.48]} size={[width + 0.9, 0.32]} color="#c9c0ad" height={0.16} />
      <LowPolySlab position={[2.12, 0.081, 0]} size={[0.32, depth + 0.7]} color="#c9c0ad" height={0.16} />
      <LowPolySlab position={[7.08, 0.081, 0]} size={[0.32, depth + 0.7]} color="#c9c0ad" height={0.16} />

      <LowPolySlab position={[0, 0.052, -3.12]} size={[width - 3.2, 0.7]} color="#d6c8ae" height={0.06} />
      <LowPolySlab position={[0, 0.052, 3.12]} size={[width - 3.2, 0.7]} color="#d6c8ae" height={0.06} />
      <LowPolySlab position={[1.48, 0.053, 0]} size={[0.7, depth - 2.8]} color="#d6c8ae" height={0.06} />
      <LowPolySlab position={[7.72, 0.053, 0]} size={[0.7, depth - 2.8]} color="#d6c8ae" height={0.06} />

      {drivewayPads.map((pad) => (
        <LowPolySlab
          key={`${pad.position[0]}-${pad.position[2]}`}
          position={pad.position}
          size={pad.size}
          color="#b9b4a7"
          height={0.05}
        />
      ))}

      <LowPolySlab position={[-10.8, 0.07, -3.55]} size={[7.4, 3.0]} color="#414d5b" height={0.09} />
      <LowPolySlab position={[-10.8, 0.115, -1.98]} size={[7.6, 0.16]} color="#d3c5ad" height={0.08} />
      <LowPolySlab position={[-14.55, 0.116, -3.55]} size={[0.16, 2.9]} color="#d3c5ad" height={0.08} />
      <LowPolySlab position={[-7.05, 0.116, -3.55]} size={[0.16, 2.9]} color="#d3c5ad" height={0.08} />

      {[-12.9, -11.7, -10.5, -9.3].map((x) => (
        <RoadMark key={`parking-${x}`} position={[x, 0.128, -2.85]} size={[0.08, 0.72]} color="#e4cfaa" opacity={0.48} />
      ))}

      {lotEdges.map((edge) => (
        <LowPolySlab
          key={`${edge.position[0]}-${edge.position[2]}`}
          position={edge.position}
          size={edge.size}
          color="#cfc0a4"
          height={0.055}
        />
      ))}

      {Array.from({ length: 11 }).map((_, index) => (
        <RoadMark key={`line-h-${index}`} position={[-15.5 + index * 3.1, 0.092, 0]} size={[1.1, 0.08]} />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <RoadMark key={`line-v-${index}`} position={[4.6, 0.093, -11 + index * 3.1]} size={[0.08, 1.1]} />
      ))}

      {Array.from({ length: 15 }).map((_, index) => (
        <RoadMark
          key={`crack-h-${index}`}
          position={[-16 + index * 2.35, 0.096, (index % 2 === 0 ? -1 : 1) * (0.55 + (index % 3) * 0.32)]}
          size={[0.55, 0.035]}
          color="#27313b"
          opacity={0.5}
        />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <RoadMark
          key={`crack-v-${index}`}
          position={[4.6 + (index % 2 === 0 ? -0.6 : 0.65), 0.097, -10.4 + index * 2.9]}
          size={[0.035, 0.5]}
          color="#27313b"
          opacity={0.45}
        />
      ))}

      <LowPolySlab position={[-1.0, 0.02, 9.7]} size={[6.8, 5.0]} color="#92aa73" height={0.07} />
      <LowPolySlab position={[-11.0, 0.05, -3.75]} size={[5.9, 2.4]} color="#3f4b59" height={0.08} />
    </group>
  );
}
