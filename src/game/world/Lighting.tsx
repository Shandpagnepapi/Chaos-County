import { ContactShadows, Sky } from '@react-three/drei';

export function Lighting() {
  return (
    <>
      <color attach="background" args={['#40445a']} />
      <fog attach="fog" args={['#5b5b68', 20, 52]} />
      <Sky sunPosition={[7, 4.2, -9]} turbidity={5.5} rayleigh={1.15} mieCoefficient={0.006} mieDirectionalG={0.72} />
      <hemisphereLight args={['#ffe3b0', '#566978', 1.72]} />
      <directionalLight
        castShadow
        position={[-8, 10, 7]}
        intensity={2.55}
        color="#ffb66f"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      <pointLight position={[-10.8, 3.1, -3.8]} intensity={1.25} color="#ffd28d" distance={8} />
      <pointLight position={[3.5, 2.8, 1.2]} intensity={0.62} color="#f3a26d" distance={10} />
      <pointLight position={[14.4, 2.9, 2.2]} intensity={0.44} color="#86c7c2" distance={8} />
      <ContactShadows position={[0, 0.02, 0]} scale={42} blur={2.8} opacity={0.42} far={13} />
    </>
  );
}
