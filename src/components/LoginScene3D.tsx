import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function FloatingBook() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.6, 2.2, 0.25]} />
        <meshStandardMaterial
          color="hsl(158, 35%, 55%)"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSphere({
  radius,
  speed,
  color,
  size,
  offset = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  size: number;
  offset?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.5;
  });

  return (
    <Sphere ref={ref} args={[size, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        distort={0.35}
        speed={2}
        roughness={0.2}
        metalness={0.6}
      />
    </Sphere>
  );
}

function GlowingRing() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    ref.current.rotation.x = Math.PI / 3;
  });

  return (
    <Torus ref={ref} args={[3.2, 0.03, 16, 100]}>
      <meshStandardMaterial
        color="hsl(38, 65%, 70%)"
        emissive="hsl(38, 65%, 60%)"
        emissiveIntensity={0.6}
      />
    </Torus>
  );
}

export const LoginScene3D = () => {
  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-4, -2, 3]} intensity={0.8} color="hsl(158, 45%, 65%)" />
        <pointLight position={[4, 3, -3]} intensity={0.6} color="hsl(38, 65%, 70%)" />

        <FloatingBook />
        <GlowingRing />

        <OrbitingSphere radius={2.6} speed={0.6} color="hsl(158, 45%, 60%)" size={0.22} />
        <OrbitingSphere radius={2.8} speed={-0.5} color="hsl(38, 55%, 65%)" size={0.18} offset={2} />
        <OrbitingSphere radius={3.0} speed={0.4} color="hsl(280, 40%, 65%)" size={0.15} offset={4} />
      </Canvas>
    </div>
  );
};
