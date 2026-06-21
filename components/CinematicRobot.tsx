"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RobotModelProps {
  scrollProgress: number;
  currentSection: string;
}

function RobotModel({ scrollProgress, currentSection }: RobotModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions, names, mixer } = useAnimations(animations, groupRef);
  const [modelReady, setModelReady] = useState(false);
  const [animationPlaying, setAnimationPlaying] = useState(false);

  useEffect(() => {
    if (scene && groupRef.current) {
      // Calculate bounding box for proper centering and scaling
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      console.log("📦 Model bounding box:", {
        size: { x: size.x.toFixed(2), y: size.y.toFixed(2), z: size.z.toFixed(2) },
        center: { x: center.x.toFixed(2), y: center.y.toFixed(2), z: center.z.toFixed(2) }
      });

      // Auto-scale to 40-50% of viewport height
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetHeight = 2.5; // Target height in 3D space
      const scale = targetHeight / maxDimension;
      
      console.log(`📏 Scaling model: ${scale.toFixed(3)}x`);

      // Apply scale and centering to the scene directly
      scene.scale.setScalar(scale);
      scene.position.x = -center.x * scale;
      scene.position.y = -center.y * scale - 1; // Lower position for better framing
      scene.position.z = -center.z * scale;

      // Enhance materials for premium look
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material && (mesh.material as any).isMeshStandardMaterial) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.roughness = 0.4;
            material.metalness = 0.9;
            material.envMapIntensity = 1.5;
          }
        }
      });

      setModelReady(true);
      console.log("✅ Model setup complete");
    }
  }, [scene]);

  useEffect(() => {
    if (!modelReady || animationPlaying) return;

    console.log("\n🎬 === ANIMATION DETECTION ===");
    console.log(`📊 Total animation clips found: ${animations.length}`);
    
    if (animations.length === 0) {
      console.warn("⚠️ No animation clips found in GLB.");
      return;
    }

    console.log("🎭 Available animations:");
    animations.forEach((clip, index) => {
      console.log(`  ${index + 1}. "${clip.name}" - Duration: ${clip.duration.toFixed(2)}s - Tracks: ${clip.tracks.length}`);
    });

    console.log("\n🔍 Action names from useAnimations:");
    names.forEach((name, index) => {
      console.log(`  ${index + 1}. "${name}"`);
    });

    // Priority list for locomotion animations
    const locomotionKeywords = [
      "walk", "walking", "run", "running", "idle", "locomotion", 
      "movement", "cycle", "animation", "armature"
    ];

    let selectedAction = null;
    let selectedName = "";

    // Try to find a locomotion animation
    for (const keyword of locomotionKeywords) {
      for (const name of names) {
        if (name.toLowerCase().includes(keyword)) {
          selectedAction = actions[name];
          selectedName = name;
          console.log(`\n✅ Found locomotion animation: "${name}"`);
          break;
        }
      }
      if (selectedAction) break;
    }

    // If no locomotion found, use the first animation
    if (!selectedAction && names.length > 0) {
      selectedName = names[0];
      selectedAction = actions[selectedName];
      console.log(`\n🎬 Using first available animation: "${selectedName}"`);
    }

    // Play the animation
    if (selectedAction) {
      try {
        selectedAction.reset();
        selectedAction.setLoop(THREE.LoopRepeat, Infinity);
        selectedAction.clampWhenFinished = false;
        selectedAction.play();
        
        console.log(`▶️ Playing animation: "${selectedName}"`);
        console.log(`🔁 Loop mode: LoopRepeat (Infinity)`);
        console.log(`⏱️ Animation duration: ${selectedAction.getClip().duration.toFixed(2)}s`);
        console.log(`✅ Animation started successfully`);
        
        setAnimationPlaying(true);
      } catch (error) {
        console.error("❌ Error playing animation:", error);
      }
    } else {
      console.warn("❌ No suitable animation found to play");
    }

    console.log("=== END ANIMATION DETECTION ===\n");

    return () => {
      // Cleanup: stop all actions
      if (selectedAction) {
        selectedAction.stop();
      }
    };
  }, [actions, names, animations, modelReady, animationPlaying]);

  // Update mixer manually if needed
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    if (!groupRef.current || !modelReady) return;

    const t = state.clock.getElapsedTime();

    // Only add subtle global movements (don't interfere with animations)
    if (animationPlaying) {
      // Very subtle floating effect while animation plays
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
    } else {
      // Manual idle animation if no animations are playing
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function CameraController({ currentSection }: { currentSection: string }) {
  const { camera } = useThree();

  useEffect(() => {
    // Camera positions for each section (moved back for full framing)
    const cameraPositions: Record<string, { position: [number, number, number]; lookAt: [number, number, number] }> = {
      hero: { position: [0, 0, 6], lookAt: [0, 0, 0] },
      about: { position: [-1.5, 0, 5.5], lookAt: [0, 0, 0] },
      experience: { position: [1.5, 0, 5.5], lookAt: [0, 0, 0] },
      skills: { position: [0, 1, 6], lookAt: [0, 0, 0] },
      impact: { position: [2, 0, 5.5], lookAt: [0, 0, 0] },
      contact: { position: [0, 0, 6], lookAt: [0, 0, 0] },
    };

    const target = cameraPositions[currentSection] || cameraPositions.hero;

    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 1.5,
      ease: "power2.inOut",
    });

    const lookAtTarget = new THREE.Vector3(...target.lookAt);
    gsap.to(camera, {
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(lookAtTarget);
      },
    });
  }, [currentSection, camera]);

  return null;
}

// Preload the model
useGLTF.preload("/models/robot.glb");

export default function CinematicRobot() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    console.log("🚀 CinematicRobot mounted");
    console.log("📂 Loading model from: /models/robot.glb");

    // Scroll-driven animation timeline
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);

      // Determine current section based on scroll position
      const sections = ["hero", "about", "experience", "skills", "impact", "contact"];
      const sectionIndex = Math.floor(progress * sections.length);
      const section = sections[Math.min(sectionIndex, sections.length - 1)];
      
      if (section !== currentSection) {
        console.log(`📍 Section changed: ${currentSection} → ${section}`);
        setCurrentSection(section);
      }
    };

    window.addEventListener("scroll", updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      console.log("🛑 CinematicRobot unmounted");
    };
  }, [currentSection]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        shadows
        style={{ background: "transparent" }}
      >
        {/* Transparent background - no white */}
        <color attach="background" args={["transparent"]} />

        {/* Premium Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.7} color="#8B5CF6" />
        <pointLight position={[5, 3, 5]} intensity={0.7} color="#06B6D4" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#ffffff"
        />

        {/* Rim lights for dramatic effect */}
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#4338CA" />

        <Suspense fallback={null}>
          <RobotModel scrollProgress={scrollProgress} currentSection={currentSection} />
          <Environment preset="city" />
        </Suspense>

        <CameraController currentSection={currentSection} />

        {/* Subtle fog for depth */}
        <fog attach="fog" args={["#03050C", 15, 40]} />
      </Canvas>

      {/* Section indicator (debug) */}
      <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-xs text-white/60 backdrop-blur-md">
        Section: {currentSection} | Progress: {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
}
