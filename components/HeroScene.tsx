'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Material upgrade after GLTF load ───────────────────── */
function upgradeMat(mat: THREE.Material) {
  if (
    mat instanceof THREE.MeshStandardMaterial ||
    mat instanceof THREE.MeshPhysicalMaterial
  ) {
    const phys = mat as THREE.MeshPhysicalMaterial;
    if (mat.transparent || mat.name === 'GlassBox' || mat.name === 'Material') {
      phys.transmission   = 0.9;
      phys.roughness      = 0.04;
      phys.ior            = 1.45;
      phys.thickness      = 0.5;
      phys.iridescence    = 0.4;
      phys.iridescenceIOR = 1.3;
      phys.color          = new THREE.Color('#aaffcc');
      phys.transparent    = true;
      phys.opacity        = 0.88;
      phys.side           = THREE.FrontSide;
      phys.needsUpdate    = true;
    }
    if (mat.name === 'EdgeGlow') {
      const std = mat as THREE.MeshStandardMaterial;
      std.color             = new THREE.Color('#4FAE7E');
      std.emissive          = new THREE.Color('#4FAE7E');
      std.emissiveIntensity = 0.4;
    }
    if (mat.name === 'Vegetation') {
      const std = mat as THREE.MeshStandardMaterial;
      std.color             = new THREE.Color('#2D5A42');
      std.emissive          = new THREE.Color('#4FAE7E');
      std.emissiveIntensity = 0.45;
    }
  }
}

/* ── Model ───────────────────────────────────────────────── */
interface ModelProps {
  isDraggingRef: React.MutableRefObject<boolean>;
  manualRotRef:  React.MutableRefObject<{ x: number; y: number }>;
}

function ValidexModel({ isDraggingRef, manualRotRef }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotY = useRef(-0.35);
  const autoRotX = useRef(0.18);

  const { scene } = useGLTF('/hero-object.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material;
        if (Array.isArray(mat)) mat.forEach(upgradeMat);
        else upgradeMat(mat as THREE.Material);
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (isDraggingRef.current) {
      autoRotY.current  += manualRotRef.current.y;
      autoRotX.current  += manualRotRef.current.x;
      manualRotRef.current.x = 0;
      manualRotRef.current.y = 0;
    } else {
      autoRotY.current += delta * 0.22;
    }

    group.rotation.y = autoRotY.current;
    group.rotation.x = THREE.MathUtils.clamp(autoRotX.current, -0.55, 0.55);
    group.position.y = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.07;
  });

  return (
    <group ref={groupRef} scale={0.38} rotation={[0.18, -0.35, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ── Canvas wrapper ──────────────────────────────────────── */
export default function HeroScene() {
  const isDragging  = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const manualRot   = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ position: 'absolute', inset: 0, cursor: 'grab' }}
      onPointerDown={(e) => {
        isDragging.current = true;
        prevPointer.current = { x: e.clientX, y: e.clientY };
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        manualRot.current.y += (e.clientX - prevPointer.current.x) * 0.008;
        manualRot.current.x += (e.clientY - prevPointer.current.y) * 0.004;
        prevPointer.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerLeave={() => {
        isDragging.current = false;
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 5.5], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.4}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-3, 5, -2]} intensity={1.2} color="#4FAE7E" />
        <pointLight position={[3, -1, 4]} intensity={0.3} color="#88aaff" />

        <Environment preset="city" background={false} />

        <ValidexModel isDraggingRef={isDragging} manualRotRef={manualRot} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/hero-object.glb');
