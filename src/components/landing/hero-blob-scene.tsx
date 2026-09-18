"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { GradientTexture, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function FluidBlob({
  position,
  scale,
  distort,
  speed,
  colors,
}: {
  position: [number, number, number];
  scale: number;
  distort: number;
  speed: number;
  colors: [string, string, string];
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    const meshNode = mesh.current;
    if (!meshNode) return;
    const t = state.clock.elapsedTime;
    meshNode.rotation.x = Math.sin(t * 0.12) * 0.12;
    meshNode.rotation.y = t * 0.05;
    meshNode.position.y = position[1] + Math.sin(t * 0.18 + position[0]) * 0.08;
  });

  return (
    <Sphere ref={mesh} args={[1, 48, 48]} position={position} scale={scale}>
      <MeshDistortMaterial
        distort={distort}
        speed={speed}
        roughness={0.42}
        metalness={0.08}
        transparent
        opacity={0.92}
      >
        <GradientTexture stops={[0, 0.45, 1]} colors={colors} size={64} />
      </MeshDistortMaterial>
    </Sphere>
  );
}

export function HeroBlobScene() {
  return (
    <Canvas
      className="absolute inset-0 !h-full !w-full"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      frameloop="always"
    >
      <color attach="background" args={["#0a2b20"]} />
      <ambientLight intensity={0.55} color="#1a5c45" />
      <directionalLight position={[4, 3, 6]} intensity={1.05} color="#d7efe4" />
      <pointLight position={[-5, -2, -2]} intensity={0.7} color="#0f3d2e" />
      <FluidBlob
        position={[-0.6, 0.15, 0]}
        scale={3.15}
        distort={0.38}
        speed={0.85}
        colors={["#0a2b20", "#0f3d2e", "#1a5c45"]}
      />
      <FluidBlob
        position={[1.8, -0.7, -1.1]}
        scale={1.85}
        distort={0.46}
        speed={0.7}
        colors={["#0f3d2e", "#1a5c45", "#0a2b20"]}
      />
      <FluidBlob
        position={[-2.2, 1.1, -0.8]}
        scale={1.35}
        distort={0.32}
        speed={0.6}
        colors={["#0a2b20", "#0f3d2e", "#0a2b20"]}
      />
    </Canvas>
  );
}
