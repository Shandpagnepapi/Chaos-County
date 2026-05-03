import { GoblinHat } from './GoblinHat';

interface EventCosmeticProps {
  cosmeticId?: string;
}

function TinFoilCap() {
  return (
    <group position={[0, 1.92, 0.01]} scale={0.62}>
      <mesh castShadow>
        <coneGeometry args={[0.42, 0.42, 5]} />
        <meshStandardMaterial color="#dfe7e8" metalness={0.28} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 10]} />
        <meshStandardMaterial color="#f2fbfa" metalness={0.22} roughness={0.3} />
      </mesh>
    </group>
  );
}

function BargainHunterVisor() {
  return (
    <group position={[0, 1.88, 0.05]} scale={0.62}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.72, 0.14, 0.18]} />
        <meshStandardMaterial color="#ffbd68" roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0, -0.02, 0.28]}>
        <boxGeometry args={[0.62, 0.08, 0.38]} />
        <meshStandardMaterial color="#f28f53" roughness={0.6} />
      </mesh>
    </group>
  );
}

function TrashKingCrown() {
  return (
    <group position={[0, 1.94, 0.01]} scale={0.62}>
      <mesh castShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.18, 6]} />
        <meshStandardMaterial color="#f0c75e" metalness={0.18} roughness={0.38} />
      </mesh>
      {[-0.28, 0, 0.28].map((x) => (
        <mesh key={x} castShadow position={[x, 0.12, 0]}>
          <coneGeometry args={[0.12, 0.32, 4]} />
          <meshStandardMaterial color="#ffd86e" metalness={0.16} roughness={0.36} />
        </mesh>
      ))}
    </group>
  );
}

function InfluencerShades() {
  return (
    <group position={[0, 1.66, 0.27]} scale={0.62}>
      <mesh castShadow position={[-0.17, 0, 0]}>
        <boxGeometry args={[0.24, 0.14, 0.05]} />
        <meshStandardMaterial color="#15171d" roughness={0.38} />
      </mesh>
      <mesh castShadow position={[0.17, 0, 0]}>
        <boxGeometry args={[0.24, 0.14, 0.05]} />
        <meshStandardMaterial color="#15171d" roughness={0.38} />
      </mesh>
      <mesh castShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[0.12, 0.04, 0.04]} />
        <meshStandardMaterial color="#15171d" roughness={0.38} />
      </mesh>
    </group>
  );
}

function HazardVest() {
  return (
    <group position={[0, 1.04, 0.08]} scale={0.62}>
      <mesh castShadow position={[0, 0, 0.22]}>
        <boxGeometry args={[0.72, 0.7, 0.05]} />
        <meshStandardMaterial color="#f47c42" roughness={0.62} />
      </mesh>
      <mesh castShadow position={[-0.19, 0, 0.255]}>
        <boxGeometry args={[0.07, 0.72, 0.035]} />
        <meshStandardMaterial color="#ffd86e" roughness={0.48} />
      </mesh>
      <mesh castShadow position={[0.19, 0, 0.255]}>
        <boxGeometry args={[0.07, 0.72, 0.035]} />
        <meshStandardMaterial color="#ffd86e" roughness={0.48} />
      </mesh>
    </group>
  );
}

export function EventCosmetic({ cosmeticId }: EventCosmeticProps) {
  if (cosmeticId === 'goblin_hat') {
    return <GoblinHat position={[0, 1.92, 0.01]} scale={0.62} />;
  }
  if (cosmeticId === 'tin_foil_cap') {
    return <TinFoilCap />;
  }
  if (cosmeticId === 'bargain_hunter_visor') {
    return <BargainHunterVisor />;
  }
  if (cosmeticId === 'trash_king_crown') {
    return <TrashKingCrown />;
  }
  if (cosmeticId === 'influencer_shades') {
    return <InfluencerShades />;
  }
  if (cosmeticId === 'hazard_vest') {
    return <HazardVest />;
  }
  return null;
}
