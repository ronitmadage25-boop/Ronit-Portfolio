"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  useGLTF, 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float,
  Text3D,
  Center
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Robot Model Component
function RobotModel({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/robot.glb");

  useEffect(() => {
    if (scene) {
      // Auto-scale robot
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDimension;
      scene.scale.setScalar(scale);

      // Enhance materials
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          if (mesh.material && (mesh.material as any).isMeshStandardMaterial) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.roughness = 0.3;
            material.metalness = 0.8;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} position={position}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Computer/Laptop Model (using primitive geometries)
function ComputerModel({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.2) * 0.05;
      group.current.position.y = position[1] + Math.sin(t * 0.4 + 1) * 0.08;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={group} position={position}>
        {/* Laptop Base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Laptop Screen */}
        <mesh position={[0, 0.4, -0.35]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.75, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Screen Display */}
        <mesh position={[0, 0.41, -0.34]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[1.0, 0.6, 0.01]} />
          <meshStandardMaterial 
            color="#0066ff" 
            emissive="#0044aa" 
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Keyboard */}
        <mesh position={[0, 0.03, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.02, 0.4]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Geometric Tech Elements
function FloatingElements() {
  const elements = [
    { position: [-4, 2, -2], color: "#8B5CF6", shape: "cube" },
    { position: [4, 3, -1], color: "#06B6D4", shape: "sphere" },
    { position: [-3, -1, 2], color: "#10B981", shape: "octahedron" },
    { position: [3, -2, 1], color: "#F59E0B", shape: "tetrahedron" },
    { position: [0, 4, -3], color: "#EF4444", shape: "torus" },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.3}
          floatIntensity={0.2}
        >
          <mesh position={element.position as [number, number, number]} castShadow receiveShadow>
            {element.shape === "cube" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {element.shape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
            {element.shape === "octahedron" && <octahedronGeometry args={[0.25]} />}
            {element.shape === "tetrahedron" && <tetrahedronGeometry args={[0.25]} />}
            {element.shape === "torus" && <torusGeometry args={[0.2, 0.08, 8, 16]} />}
            <meshStandardMaterial 
              color={element.color}
              metalness={0.8}
              roughness={0.2}
              emissive={element.color}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Holographic Code Panels
function CodePanels() {
  return (
    <>
      {/* Left Panel */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <group position={[-5, 1, -1]} rotation={[0, 0.3, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.8}
              emissive="#00ff00"
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Code lines */}
          {[0.6, 0.3, 0, -0.3, -0.6].map((y, i) => (
            <mesh key={i} position={[-0.5, y, 0.01]}>
              <planeGeometry args={[Math.random() * 1 + 0.5, 0.05]} />
              <meshStandardMaterial 
                color="#00ff00"
                emissive="#00ff00"
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Right Panel */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
        <group position={[5, 0.5, -0.5]} rotation={[0, -0.3, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.8}
              emissive="#ff0080"
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Code lines */}
          {[0.6, 0.3, 0, -0.3, -0.6].map((y, i) => (
            <mesh key={i} position={[-0.5, y, 0.01]}>
              <planeGeometry args={[Math.random() * 1 + 0.5, 0.05]} />
              <meshStandardMaterial 
                color="#ff0080"
                emissive="#ff0080"
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  );
}

// Particle System
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06B6D4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Preload the robot model
useGLTF.preload("/models/robot.glb");

// Main 3D Scene Component
function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ 
          position: [0, 2, 8], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={["transparent"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06B6D4" intensity={0.5} />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* 3D Models */}
        <Suspense fallback={null}>
          <RobotModel position={[2, 0, 2]} />
          <RobotModel position={[-3, -1, -2]} />
        </Suspense>
        
        <ComputerModel position={[4, 0, -1]} />
        <ComputerModel position={[-2, 1, 3]} />
        
        <FloatingElements />
        <CodePanels />
        <ParticleField />

        {/* Ground plane with grid */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial 
            color="#03050C"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.2}
          enableDamping={true}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Contact Shadows */}
        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={10}
        />
      </Canvas>
    </div>
  );
}

export default Scene3D;