import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useGameStore } from '../state/gameStore';

const dragYawSensitivity = 0.006;
const dragPitchSensitivity = 0.0022;
const keyRotateSpeed = 1.55;

export function CameraOrbitControls() {
  const { gl, size } = useThree();
  const nudgeCameraOrbit = useGameStore((state) => state.nudgeCameraOrbit);
  const dragState = useRef({ active: false, pointerId: -1, lastX: 0, lastY: 0 });
  const yawVelocity = useRef(0);
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (event: PointerEvent) => {
      const state = useGameStore.getState();
      if (state.screen !== 'playing' || state.pausePanel || state.dialogue) {
        return;
      }

      const isTouchCameraArea = event.pointerType === 'touch' && event.clientX > window.innerWidth * 0.42;
      const isMouseDrag = event.pointerType !== 'touch' && (event.button === 0 || event.button === 2);
      if (!isTouchCameraArea && !isMouseDrag) {
        return;
      }

      dragState.current = { active: true, pointerId: event.pointerId, lastX: event.clientX, lastY: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragState.current.active || dragState.current.pointerId !== event.pointerId) {
        return;
      }

      const dx = event.clientX - dragState.current.lastX;
      const dy = event.clientY - dragState.current.lastY;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;

      const yawDelta = -dx * dragYawSensitivity;
      nudgeCameraOrbit({
        yaw: yawDelta,
        pitch: event.pointerType === 'touch' ? 0 : dy * dragPitchSensitivity
      });
      yawVelocity.current = yawDelta * 8;
    };

    const stopDrag = (event: PointerEvent) => {
      if (dragState.current.pointerId === event.pointerId) {
        dragState.current.active = false;
      }
    };

    const onWheel = (event: WheelEvent) => {
      const state = useGameStore.getState();
      if (state.screen !== 'playing' || state.pausePanel || state.dialogue) {
        return;
      }
      event.preventDefault();
      nudgeCameraOrbit({ distance: event.deltaY * 0.006 });
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      keys.current.add(event.key.toLowerCase());
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.key.toLowerCase());
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', stopDrag);
    canvas.addEventListener('pointercancel', stopDrag);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', stopDrag);
      canvas.removeEventListener('pointercancel', stopDrag);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gl.domElement, nudgeCameraOrbit]);

  useFrame((_, delta) => {
    const state = useGameStore.getState();
    if (state.screen !== 'playing' || state.pausePanel || state.dialogue) {
      return;
    }

    const keyDirection = Number(keys.current.has('c')) - Number(keys.current.has('z') || keys.current.has('q'));
    if (keyDirection !== 0) {
      nudgeCameraOrbit({ yaw: keyDirection * keyRotateSpeed * delta });
    }

    if (!dragState.current.active && Math.abs(yawVelocity.current) > 0.0004) {
      nudgeCameraOrbit({ yaw: yawVelocity.current * delta });
      yawVelocity.current *= Math.pow(0.035, delta);
    }

    if (size.width < 760 && state.cameraOrbit.distance < 11) {
      nudgeCameraOrbit({ distance: (11 - state.cameraOrbit.distance) * 0.35 * delta });
    }
  });

  return null;
}
