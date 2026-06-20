"use client";

import React, { Component, Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "/models/robot.glb";

// Error Boundary to catch GLTF loading errors
class RobotErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      console.error("Robot loading error:", this.state.error);
      return (
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}

function RobotModel({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  
  const [scale, setScale] = React.useState(1.0);
  const [offset, setOffset] = React.useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const { scene, animations } = gltf;

    // Reset transform to get accurate bounds
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    console.log("Robot loaded - original size:", size, "center:", center);

    // Target a normalized height of 2.6 units in the 3D space
    const targetHeight = 2.6;
    const computedScale = targetHeight / (size.y || 1);
    setScale(computedScale);

    // Center on X and Z, align bottom of the model with Y = 0
    setOffset([-center.x, -box.min.y, -center.z]);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);

    if (group.current) {
      const t = state.clock.getElapsedTime();
      // Base idle floating
      group.current.position.y = -1.6 + Math.sin(t * 1.5) * 0.05;

      const targetRotY = mouse.current.x * 0.4;
      const targetRotX = mouse.current.y * 0.15;
      
      // Face slightly left towards the text by default, then track mouse
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.3 + targetRotY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    // Positioned on the right side: x=1.6
    <group ref={group} position={[1.6, -1.6, 0]} dispose={null} name="robot-group">
      <group scale={scale} position={offset}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

function LoadingState() {
  return (
    <mesh position={[1.6, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
}

function CinematicCameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#smooth-content",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Camera positions orchestrating the journey
      tl.to(camera.position, { x: 2.0, y: 0.5, z: 4.5 }, "about")
        .to(camera.position, { x: -1.0, y: 1.0, z: 6.0 }, "skills")
        .to(camera.position, { x: 1.5, y: 0.2, z: 4.0 }, "projects")
        .to(camera.position, { x: 0, y: 0.5, z: 3.5 }, "contact");
    });
    return () => ctx.revert();
  }, [camera]);

  return null;
}

function PremiumLighting() {
  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      {/* Key Light (Electric Violet) */}
      <SpotLight
        position={[3, 5, 4]}
        angle={0.4}
        penumbra={0.5}
        intensity={4}
        color="#8B5CF6"
        castShadow
      />
      {/* Fill Light (Deep Indigo) */}
      <pointLight position={[-4, 2, -1]} intensity={2.5} color="#4338CA" />
      {/* Rim Light (Soft Cyan) for cinematic edge glow */}
      <pointLight position={[2, 1, -5]} intensity={3} color="#06B6D4" />
      {/* Soft frontal highlight */}
      <pointLight position={[1, 1, 3]} intensity={1} color="#ffffff" />
    </>
  );
}

function Particles() {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = Math.random() * 0.04;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function GlobalCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none h-full w-full bg-transparent">
      <Canvas
        shadows
        // Base camera framed nicely on the right side of the screen
        camera={{ position: [0, 0.4, 4.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["#03050C", 5, 12]} />
        <PremiumLighting />
        <Particles />
        
        <RobotErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <RobotModel mouse={mouse} />
          </Suspense>
        </RobotErrorBoundary>

        <CinematicCameraRig />
        <ContactShadows position={[1.6, -1.8, 0]} opacity={0.7} scale={5} blur={2.5} color="#000000" />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
