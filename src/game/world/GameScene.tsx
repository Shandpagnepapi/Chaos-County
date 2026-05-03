import { useEffect } from 'react';
import { Collectibles } from '../items/Collectibles';
import { NPCs } from '../npc/NPCs';
import { FollowCamera } from '../camera/FollowCamera';
import { GuidanceMarker } from '../ui/GuidanceMarker';
import { Player } from '../player/Player';
import { useGameStore } from '../state/gameStore';
import { WorldScene } from './WorldScene';

export function GameScene() {
  const saveNow = useGameStore((state) => state.saveNow);

  useEffect(() => {
    const id = window.setInterval(() => saveNow(), 1600);
    return () => window.clearInterval(id);
  }, [saveNow]);

  return (
    <>
      <WorldScene />
      <NPCs />
      <Collectibles />
      <GuidanceMarker />
      <Player />
      <FollowCamera />
    </>
  );
}
