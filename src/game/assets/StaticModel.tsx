import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import type { Group, Material, Mesh, Object3D } from 'three';

interface StaticModelProps {
  src: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export function StaticModel({ src, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, opacity = 1 }: StaticModelProps) {
  const gltf = useGLTF(src);
  const clone = useMemo(() => {
    const instance = gltf.scene.clone(true) as Group;
    instance.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) {
        return;
      }

      const material = mesh.material as Material | Material[];
      mesh.material = Array.isArray(material) ? material.map((item) => item.clone()) : material.clone();
    });
    return instance;
  }, [gltf.scene]);

  useEffect(() => {
    clone.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) {
        return;
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const material = mesh.material as Material | Material[];
      const materials = Array.isArray(material) ? material : [material];
      for (const item of materials) {
        item.transparent = opacity < 1;
        item.opacity = opacity;
        item.depthWrite = opacity >= 1;
        item.needsUpdate = true;
      }
    });
  }, [clone, opacity]);

  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />;
}
