"use client";

import { Component, Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "/models/robot.glb";

/**
 * Loads the GLB robot. If the file is missing or fails to parse,
 * the parent <ModelBoundary> below catches it and renders instructions
 * instead of a fake primitive robot.
 */
function RobotModel({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    // Tint emissive-looking materials toward the violet accent without
    // destroying the model's own PBR textures.
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      // Play the first animation (commonly an idle/breathing clip) on loop.
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);

    if (group.current) {
      // Idle breathing bob if no built-in animation drives Y position.
      const t = state.clock.getElapsedTime();
      group.current.position.y = -1.4 + Math.sin(t * 1.1) * 0.04;

      // Subtle head/body tracking toward the cursor.
      const targetRotY = mouse.current.x * 0.35;
      const targetRotX = mouse.current.y * 0.12;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotY,
        0.04
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotX,
        0.04
      );
    }
  });

  return (
    <group ref={group} position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]} dispose={null}>
      <primitive object={scene} scale={1.2} />
    </group>
  );
}

function CameraScrollRig() {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#smooth-content",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
        .to(camera.position, { x: 1.1, y: 0.4, z: 4.2 }, "about")
        .to(camera.position, { x: -1.2, y: 0.8, z: 5.5 }, "skills")
        .to(camera.position, { x: 0.6, y: 0.2, z: 3.6 }, "projects")
        .to(camera.position, { x: 0, y: 0.1, z: 3.2 }, "contact");
    });
    return () => ctx.revert();
  }, [camera]);

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.35}
        penumbra={0.6}
        intensity={2.2}
        color="#A855F7"
        castShadow
      />
      <pointLight position={[-3, 1, -2]} intensity={1.1} color="#8B5CF6" />
      <pointLight position={[0, -1, 3]} intensity={0.4} color="#ffffff" />
    </>
  );
}

function MissingModelNotice() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
      <p className="font-heading text-lg text-ink">Robot model not found</p>
      <p className="max-w-xs text-sm text-ink-muted">
        Place a <code className="text-accent-bright">robot.glb</code> file at{" "}
        <code className="text-accent-bright">/public/models/robot.glb</code>{" "}
        — see README.md for download links.
      </p>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <MissingModelNotice />;
    return this.props.children;
  }
}

export default function RobotScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="h-full w-full">
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center text-sm text-ink-muted">
              Loading robot…
            </div>
          }
        >
          <Canvas
            shadows
            camera={{ position: [0, 0.2, 3.4], fov: 32 }}
            gl={{ antialias: true, alpha: true }}
          >
            <fog attach="fog" args={["#050816", 4, 12]} />
            <Lights />
            <RobotModel mouse={mouse} />
            <CameraScrollRig />
            <ContactShadows
              position={[0, -1.6, 0]}
              opacity={0.45}
              scale={6}
              blur={2.6}
              color="#8B5CF6"
            />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
