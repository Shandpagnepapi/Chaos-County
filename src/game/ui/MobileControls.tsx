import { useRef, useState } from 'react';
import { useGameStore } from '../state/gameStore';

const maxDistance = 34;

export function MobileControls() {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const setMobileInput = useGameStore((state) => state.setMobileInput);
  const interact = useGameStore((state) => state.interact);
  const nearestNpcId = useGameStore((state) => state.nearestNpcId);
  const nearestZoneId = useGameStore((state) => state.nearestZoneId);
  const label = nearestNpcId ? 'Talk' : nearestZoneId ? 'Use' : 'Interact';

  const updatePointer = (clientX: number, clientY: number) => {
    const element = joystickRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawX = clientX - centerX;
    const rawY = clientY - centerY;
    const distance = Math.min(maxDistance, Math.hypot(rawX, rawY));
    const angle = Math.atan2(rawY, rawX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    setKnob({ x, y });
    setMobileInput({ x: x / maxDistance, z: y / maxDistance });
  };

  const release = () => {
    setKnob({ x: 0, y: 0 });
    setMobileInput({ x: 0, z: 0 });
  };

  return (
    <div className="mobile-controls" data-testid="mobile-controls">
      <div
        ref={joystickRef}
        className="joystick"
        data-testid="mobile-joystick"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePointer(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => {
          if (event.buttons > 0) {
            updatePointer(event.clientX, event.clientY);
          }
        }}
        onPointerUp={release}
        onPointerCancel={release}
      >
        <div
          className="joystick-knob"
          style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
        />
      </div>
      <button className="touch-interact" data-testid="mobile-interact-button" disabled={!nearestNpcId && !nearestZoneId} onClick={interact}>
        {label}
      </button>
    </div>
  );
}
