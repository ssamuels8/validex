'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

function upgradeMaterial(mat: THREE.Material) {
  if (mat instanceof THREE.MeshStandardMaterial) {
    const phys = mat as THREE.MeshPhysicalMaterial;
    if (mat.name === 'Glass' || mat.transparent || mat.name === 'Material') {
      phys.transmission   = 0.88;
      phys.roughness      = 0.04;
      phys.ior            = 1.45;
      phys.thickness      = 0.5;
      phys.iridescence    = 0.45;
      phys.iridescenceIOR = 1.3;
      phys.color          = new THREE.Color('#a8f0cc');
      phys.transparent    = true;
      phys.opacity        = 0.85;
      phys.side           = THREE.FrontSide;
      phys.needsUpdate    = true;
    }
    if (mat.name === 'Edge') {
      mat.color             = new THREE.Color('#4FAE7E');
      (mat as THREE.MeshStandardMaterial).emissive = new THREE.Color('#2A6B4A');
      (mat as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
    }
    if (mat.name === 'Veg') {
      mat.color             = new THREE.Color('#1a5c35');
      (mat as THREE.MeshStandardMaterial).emissive = new THREE.Color('#2A6B4A');
      (mat as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
      mat.roughness         = 0.8;
    }
  }
}

interface ModelProps {
  isDraggingRef: React.MutableRefObject<boolean>;
  manualRotRef:  React.MutableRefObject<{ x: number; y: number }>;
}

function ValidexModel({ isDraggingRef, manualRotRef }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(-0.4);
  const rotX = useRef(0.2);

  const { scene } = useGLTF('/hero-object.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material;
        if (Array.isArray(mat)) mat.forEach(upgradeMaterial);
        else upgradeMaterial(mat as THREE.Material);
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    if (isDraggingRef.current) {
      rotY.current += manualRotRef.current.y;
      rotX.current += manualRotRef.current.x;
      manualRotRef.current.x = 0;
      manualRotRef.current.y = 0;
    } else {
      rotY.current += delta * 0.2;
    }
    g.rotation.y = rotY.current;
    g.rotation.x = THREE.MathUtils.clamp(rotX.current, -0.5, 0.5);
    g.position.y = Math.sin(state.clock.getElapsedTime() * 0.65) * 0.06;
  });

  return (
    <group ref={groupRef} scale={0.36} rotation={[0.2, -0.4, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function HeroScene() {
  const isDragging  = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const manualRot   = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
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
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-3, 5, -2]} intensity={1.0} color="#4FAE7E" />
        <pointLight position={[3, -1, 4]} intensity={0.25} color="#8899ff" />
        <Environment preset="city" background={false} />
        <ValidexModel isDraggingRef={isDragging} manualRotRef={manualRot} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/hero-object.glb');
