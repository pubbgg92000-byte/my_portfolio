"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function OrbitalForm() {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18;
      mesh.current.rotation.y += delta * 0.24;
    }
  });

  return (
    <Float speed={1.25} rotationIntensity={0.45} floatIntensity={0.7}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.55, 3]} />
        <MeshDistortMaterial
          color="#4fd1c5"
          distort={0.2}
          speed={1.4}
          roughness={0.52}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function HeroOrbit() {
  return (
    <div className="h-[22rem] w-full overflow-hidden rounded-[2rem] border border-border bg-elevated/40 shadow-card">
      <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 4]} intensity={2.2} />
        <pointLight position={[-3, -2, 3]} intensity={1.1} color="#f5b15b" />
        <OrbitalForm />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}
