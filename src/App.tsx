import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { GameScene } from './game/world/GameScene';
import { StartMenu } from './game/start/StartMenu';
import { StartScene3D } from './game/start/StartScene3D';
import { MobileControls } from './game/ui/MobileControls';
import { HUD } from './game/ui/HUD';
import { useGameStore } from './game/state/gameStore';

function LoadingOverlay() {
  return (
    <div className="start-ui panel">
      <p className="eyebrow">Loading</p>
      <h1 className="title">Chaos County</h1>
      <p className="subtitle">Warming the streetlights and checking the snack shelves...</p>
    </div>
  );
}

export default function App() {
  const screen = useGameStore((state) => state.screen);

  return (
    <div className="app-shell">
      <Canvas
        className="game-canvas"
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 43, near: 0.1, far: 90, position: [7, 8, 9] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>{screen === 'start' ? <StartScene3D /> : <GameScene />}</Suspense>
      </Canvas>
      <div className="ui-layer">
        <Suspense fallback={<LoadingOverlay />}>
          {screen === 'start' ? <StartMenu /> : <HUD />}
          {screen === 'playing' ? <MobileControls /> : null}
        </Suspense>
      </div>
    </div>
  );
}
