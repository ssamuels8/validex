'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BW = 1.4;
const BH = 2.8;
const BD = 1.4;
const COLS = 3;
const ROWS = 6;
const PANEL_W = BW / COLS - 0.04;
const PANEL_H = BH / ROWS - 0.04;
const FALL_START = 2.0;
const ROTATE_START = 4.8;

function rng(seed: number): number {
  const s = Math.sin(seed + 1.5) * 43758.5453;
  return s - Math.floor(s);
}

interface PanelDef {
  initPos: [number, number, number];
  initRot: [number, number, number];
  vx: number;
  vy0: number;
  vRx: number;
  vRz: number;
  delay: number;
}

function buildPanelDefs(): PanelDef[] {
  const defs: PanelDef[] = [];
  let s = 0;

  const makePanels = (
    positionFn: (r: number, c: number) => [number, number, number],
    rotFn: () => [number, number, number],
    cCount: number,
    vxSign: number,
  ) => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < cCount; c++) {
        defs.push({
          initPos: positionFn(r, c),
          initRot: rotFn(),
          vx: (rng(s++) - 0.5) * 2 * vxSign,
          vy0: rng(s++) * 0.4,
          vRx: (rng(s++) - 0.5) * 9,
          vRz: (rng(s++) - 0.5) * 6,
          delay: rng(s++) * 1.0,
        });
      }
    }
  };

  // Front face
  makePanels(
    (r, c) => [
      -BW / 2 + (c + 0.5) * (BW / COLS),
      -BH / 2 + (r + 0.5) * (BH / ROWS),
      BD / 2 + 0.007,
    ],
    () => [0, 0, 0],
    COLS,
    0,
  );

  // Left face
  makePanels(
    (r, c) => [
      -BW / 2 - 0.007,
      -BH / 2 + (r + 0.5) * (BH / ROWS),
      -BD / 2 + (c + 0.5) * (BD / 3),
    ],
    () => [0, Math.PI / 2, 0],
    3,
    -1,
  );

  // Right face
  makePanels(
    (r, c) => [
      BW / 2 + 0.007,
      -BH / 2 + (r + 0.5) * (BH / ROWS),
      -BD / 2 + (c + 0.5) * (BD / 3),
    ],
    () => [0, -Math.PI / 2, 0],
    3,
    1,
  );

  return defs;
}

function Scene() {
  const groupRef  = useRef<THREE.Group>(null);
  const panelDefs = useMemo(buildPanelDefs, []);
  const panelRefs = useRef<(THREE.Mesh | null)[]>(new Array(panelDefs.length).fill(null));

  useFrame((state, delta) => {
    const t     = state.clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    // Phase 1 — rise from below
    if (t < 1.5) {
      const ease = 1 - Math.pow(1 - t / 1.5, 3);
      group.position.y = (ease - 1) * 3.0;
    } else {
      group.position.y = 0;
    }

    // Phase 2 — facade shatters
    if (t >= FALL_START) {
      panelDefs.forEach((def, i) => {
        const mesh = panelRefs.current[i];
        if (!mesh) return;
        const ft = Math.max(0, t - FALL_START - def.delay);
        if (ft === 0) return;

        mesh.position.x = def.initPos[0] + def.vx * ft;
        mesh.position.y = def.initPos[1] + def.vy0 * ft - 4.5 * ft * ft;
        mesh.position.z = def.initPos[2];
        mesh.rotation.x = def.initRot[0] + def.vRx * ft;
        mesh.rotation.z = def.initRot[2] + def.vRz * ft;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 1 - ft * 0.85);
      });
    }

    // Phase 3 — slow rotation
    if (t >= ROTATE_START) {
      group.rotation.y += delta * 0.16;
    }

    // Subtle breathing scale
    if (t >= ROTATE_START) {
      const breathe = 1 + Math.sin(t * 0.8) * 0.005;
      group.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dark industrial core */}
      <mesh>
        <boxGeometry args={[BW, BH, BD]} />
        <meshStandardMaterial color="#0e110f" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Edge highlight lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(BW, BH, BD)]} />
        <lineBasicMaterial color="#1a261e" />
      </lineSegments>

      {/* Green facade panels */}
      {panelDefs.map((def, i) => (
        <mesh
          key={i}
          ref={(el) => { panelRefs.current[i] = el; }}
          position={def.initPos}
          rotation={def.initRot}
        >
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshStandardMaterial
            color="#2D5A42"
            roughness={0.6}
            metalness={0.4}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const ref   = useRef<THREE.Points>(null);
  const count = 220;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.018;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.014} color="#ECE7DD" transparent opacity={0.12} />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[4, 5, 4]} color="#4FAE7E" intensity={3} decay={2} />
      <pointLight position={[-5, 3, -2]} color="#ECE7DD" intensity={0.12} decay={2} />
      <pointLight position={[0, -4, 3]} color="#142019" intensity={1} decay={2} />
      <Scene />
      <Particles />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, -0.6, 6.5], fov: 48 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
