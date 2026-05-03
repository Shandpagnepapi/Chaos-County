import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '../state/gameStore';

const cameraOffsetDesktop = new Vector3(6.6, 7.6, 8.6);
const cameraOffsetMobile = new Vector3(6.9, 8.2, 9.6);
const lookOffset = new Vector3(0, 0.9, 0);

export function FollowCamera() {
  const { camera, size } = useThree();
  const playerPosition = useGameStore((state) => state.playerPosition);

  useFrame((_, delta) => {
    const mobile = size.width < 760;
    const offset = mobile ? cameraOffsetMobile : cameraOffsetDesktop;
    const target = new Vector3(playerPosition.x, 0, playerPosition.z);
    const desired = target.clone().add(offset);
    camera.position.lerp(desired, 1 - Math.pow(0.001, delta));
    camera.lookAt(target.add(lookOffset));
  });

  return null;
}
