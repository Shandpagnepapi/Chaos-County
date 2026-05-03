import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface SceneReadyProbeProps {
  onReady: () => void;
  stableFrames?: number;
}

// Mounted inside a Suspense boundary so it only starts counting after GLTF assets resolve.
export function SceneReadyProbe({ onReady, stableFrames = 8 }: SceneReadyProbeProps) {
  const frameCount = useRef(0);
  const ready = useRef(false);

  useFrame(() => {
    if (ready.current) {
      return;
    }

    frameCount.current += 1;
    if (frameCount.current >= stableFrames) {
      ready.current = true;
      onReady();
    }
  });

  return null;
}
