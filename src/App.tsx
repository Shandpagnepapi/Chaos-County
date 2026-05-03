import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useState } from 'react';
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
  const [startSceneReady, setStartSceneReady] = useState(false);
  const [gameSceneReady, setGameSceneReady] = useState(false);
  const currentSceneReady = screen === 'start' ? startSceneReady : gameSceneReady;

  const markStartSceneReady = useCallback(() => setStartSceneReady(true), []);
  const markGameSceneReady = useCallback(() => setGameSceneReady(true), []);

  useEffect(() => {
    if (screen === 'start') {
      setGameSceneReady(false);
    } else {
      setStartSceneReady(false);
    }
  }, [screen]);

  return (
    <div className="app-shell">
      <Canvas
        className="game-canvas"
        data-testid="game-canvas"
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 46, near: 0.1, far: 90, position: [6, 5.2, 7.4] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {screen === 'start' ? <StartScene3D onReady={markStartSceneReady} /> : <GameScene onReady={markGameSceneReady} />}
        </Suspense>
      </Canvas>
      {startSceneReady ? <div className="scene-ready-marker" data-testid="start-scene-ready" aria-hidden="true" /> : null}
      {gameSceneReady ? <div className="scene-ready-marker" data-testid="scene-ready" aria-hidden="true" /> : null}
      <div className="ui-layer">
        {!currentSceneReady ? (
          <div className="scene-loading-overlay panel" role="status">
            <p className="eyebrow">Loading town scene</p>
            <span>Setting up Dale Mart, streetlights, and questionable snack evidence...</span>
          </div>
        ) : null}
        <Suspense fallback={<LoadingOverlay />}>
          {screen === 'start' ? <StartMenu /> : <HUD />}
          {screen === 'playing' ? <MobileControls /> : null}
        </Suspense>
      </div>
    </div>
  );
}
