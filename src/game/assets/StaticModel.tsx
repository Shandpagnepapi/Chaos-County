import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import type { Group, Mesh, MeshStandardMaterial, Object3D } from 'three';

interface StaticModelProps {
  src: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export function StaticModel({ src, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, opacity = 1 }: StaticModelProps) {
  const gltf = useGLTF(src);
  const clone = useMemo(() => gltf.scene.clone(true) as Group, [gltf.scene]);

  useEffect(() => {
    clone.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) {
        return;
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const material = mesh.material as MeshStandardMaterial | MeshStandardMaterial[];
      const materials = Array.isArray(material) ? material : [material];
      for (const item of materials) {
        item.transparent = opacity < 1;
        item.opacity = opacity;
        item.needsUpdate = true;
      }
    });
  }, [clone, opacity]);

  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />;
}
