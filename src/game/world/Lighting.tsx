import { ContactShadows, Sky } from '@react-three/drei';

export function Lighting() {
  return (
    <>
      <color attach="background" args={['#343140']} />
      <fog attach="fog" args={['#343140', 24, 58]} />
      <Sky sunPosition={[8, 5, -8]} turbidity={6} rayleigh={1.5} mieCoefficient={0.005} mieDirectionalG={0.7} />
      <hemisphereLight args={['#ffdca8', '#3d4658', 1.55]} />
      <directionalLight
        castShadow
        position={[-8, 12, 8]}
        intensity={2.35}
        color="#ffc27d"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      <pointLight position={[-10.8, 3.1, -3.8]} intensity={1.2} color="#ffd08a" distance={8} />
      <pointLight position={[3.5, 2.8, 1.2]} intensity={0.55} color="#ffb179" distance={10} />
      <ContactShadows position={[0, 0.02, 0]} scale={42} blur={2.4} opacity={0.34} far={13} />
    </>
  );
}
