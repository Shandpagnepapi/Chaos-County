import { useEffect } from 'react';
import { Collectibles } from '../items/Collectibles';
import { NPCs } from '../npc/NPCs';
import { CameraOrbitControls } from '../camera/CameraOrbitControls';
import { FollowCamera } from '../camera/FollowCamera';
import { GuidanceMarker } from '../ui/GuidanceMarker';
import { Player } from '../player/Player';
import { useGameStore } from '../state/gameStore';
import { SceneReadyProbe } from '../utils/SceneReadyProbe';
import { WorldScene } from './WorldScene';

interface GameSceneProps {
  onReady: () => void;
}

export function GameScene({ onReady }: GameSceneProps) {
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
      <CameraOrbitControls />
      <FollowCamera />
      <SceneReadyProbe onReady={onReady} />
    </>
  );
}
