"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedWaveSurface({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create a grid geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 50, 50);
    return geo;
  }, []);

  // Custom shader for wave effect
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Wave animation
      float wave1 = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
      float wave2 = sin(pos.y * 0.5 + uTime * 0.3) * 0.5;
      
      // Mouse interaction
      float distanceToMouse = distance(vec2(pos.x, pos.y), uMouse * 10.0);
      float mouseInfluence = smoothstep(5.0, 0.0, distanceToMouse) * 2.0;
      
      pos.z = wave1 + wave2 + mouseInfluence;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      // Color gradient based on elevation
      vec3 color1 = vec3(0.02, 0.02, 0.05); // Dark blue
      vec3 color2 = vec3(0.34, 0.36, 0.79); // Purple
      vec3 color3 = vec3(0.02, 0.71, 0.83); // Cyan
      
      float mixValue = (vElevation + 1.0) * 0.5;
      vec3 color = mix(color1, color2, mixValue);
      color = mix(color, color3, mixValue * 0.3);
      
      // Add grid lines
      float gridX = abs(fract(vUv.x * 50.0) - 0.5) * 2.0;
      float gridY = abs(fract(vUv.y * 50.0) - 0.5) * 2.0;
      float grid = min(gridX, gridY);
      grid = smoothstep(0.0, 0.05, grid);
      
      color = mix(vec3(0.4, 0.5, 1.0), color, grid);
      
      gl_FragColor = vec4(color, 0.8);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);
    }

    if (meshRef.current) {
      // Gentle rotation based on mouse
      meshRef.current.rotation.x = -Math.PI / 3 + mousePosition.y * 0.3;
      meshRef.current.rotation.z = mousePosition.x * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -5]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating particles
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#06B6D4" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function ParallaxBackground() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#03050C"]} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

        {/* Animated wave surface */}
        <AnimatedWaveSurface mousePosition={mousePosition} />

        {/* Floating particles */}
        <Particles />

        {/* Fog for depth */}
        <fog attach="fog" args={["#03050C", 5, 25]} />
      </Canvas>
    </div>
  );
}
