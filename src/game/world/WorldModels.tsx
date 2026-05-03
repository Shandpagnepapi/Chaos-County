import { Html } from '@react-three/drei';
import { useMemo } from 'react';
import { StaticModel } from '../assets/StaticModel';
import { groundDecor, treeDecor, worldModels } from '../config/world';
import { useGameStore } from '../state/gameStore';

export function WorldModels() {
  const playerPosition = useGameStore((state) => state.playerPosition);

  const models = useMemo(() => [...groundDecor, ...worldModels, ...treeDecor], []);

  return (
    <group>
      {models.map((model) => {
        const distanceToPlayer = Math.hypot(playerPosition.x - model.position[0], playerPosition.z - model.position[2]);
        const opacity = model.fadeWhenOccluding && distanceToPlayer < 2.3 ? 0.48 : 1;

        return (
          <group key={model.id}>
            <StaticModel
              src={model.model}
              position={model.position}
              rotation={[0, model.rotationY ?? 0, 0]}
              scale={model.scale}
              opacity={opacity}
            />
            {model.label ? (
              <Html
                center
                position={[model.position[0], model.labelHeight ?? 2.4, model.position[2]]}
                distanceFactor={13}
                zIndexRange={[2, 0]}
              >
                <div className="world-label">{model.label}</div>
              </Html>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}
