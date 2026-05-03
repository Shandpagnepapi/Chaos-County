import { useEffect, useRef } from 'react';
import type { Vec2 } from '../config/world';
import { useGameStore } from '../state/gameStore';

const keys = new Set<string>();

export function useKeyboardInput() {
  const interact = useGameStore((state) => state.interact);
  const closeDialogue = useGameStore((state) => state.closeDialogue);
  const dialogue = useGameStore((state) => state.dialogue);
  const inputRef = useRef<Vec2>({ x: 0, z: 0 });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keys.add(event.key.toLowerCase());
      if (event.key.toLowerCase() === 'e') {
        interact();
      }
      if (event.key === 'Escape' || event.key === 'Tab') {
        event.preventDefault();
        if (dialogue) {
          closeDialogue();
        }
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.delete(event.key.toLowerCase());
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [closeDialogue, dialogue, interact]);

  inputRef.current = {
    x: Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft')),
    z: Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'))
  };

  return inputRef;
}
