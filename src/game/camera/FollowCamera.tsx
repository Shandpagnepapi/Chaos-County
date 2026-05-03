import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
import { useRef } from 'react';
import { useGameStore } from '../state/gameStore';

const cameraOffsetDesktop = new Vector3(5.9, 3.95, 8.7);
const cameraOffsetMobile = new Vector3(6.7, 4.45, 9.6);
const lookOffset = new Vector3(0, 0.55, 0);

export function FollowCamera() {
  const { camera, size } = useThree();
  const playerPosition = useGameStore((state) => state.playerPosition);
  const lastPosition = useRef(new Vector3(playerPosition.x, 0, playerPosition.z));
  const lookAhead = useRef(new Vector3());

  useFrame((_, delta) => {
    const mobile = size.width < 760;
    const offset = mobile ? cameraOffsetMobile : cameraOffsetDesktop;
    const target = new Vector3(playerPosition.x, 0, playerPosition.z);
    const velocity = target.clone().sub(lastPosition.current);
    lastPosition.current.copy(target);

    if (velocity.lengthSq() > 0.000001) {
      lookAhead.current.lerp(velocity.normalize().multiplyScalar(mobile ? 1.05 : 1.25), 1 - Math.pow(0.0008, delta));
    } else {
      lookAhead.current.lerp(new Vector3(), 1 - Math.pow(0.03, delta));
    }

    const desired = target.clone().add(offset).add(lookAhead.current.clone().multiplyScalar(0.42));
    camera.position.lerp(desired, 1 - Math.pow(0.004, delta));
    camera.lookAt(target.clone().add(lookOffset).add(lookAhead.current));

    if (camera instanceof PerspectiveCamera) {
      const desiredFov = mobile ? 52 : 50;
      camera.fov = MathUtils.lerp(camera.fov, desiredFov, 1 - Math.pow(0.02, delta));
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
