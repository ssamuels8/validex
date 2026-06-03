'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Constants ───────────────────────────────────────────── */
const COLS  = 4;
const ROWS  = 2;
const DEPTH = 8;
const BOX_W = 1.0;
const BOX_H = 0.6;
const BOX_D = 1.2;
const GAP   = 0.08;

const STRIDE_X = BOX_W + GAP;
const STRIDE_Y = BOX_H + GAP;
const STRIDE_Z = BOX_D + GAP;

const TOTAL_W = COLS  * STRIDE_X - GAP;
const TOTAL_H = ROWS  * STRIDE_Y - GAP;
const TOTAL_D = DEPTH * STRIDE_Z - GAP;

const TOP_Y   = TOTAL_H / 2;   // top face y (structure centred at origin)

const PARTICLE_COUNT = 2000;
const ASSEMBLE_DURATION = 2.0;

/* ── Box position array ──────────────────────────────────── */
interface BoxDef { x: number; y: number; z: number; idx: number }

function buildBoxDefs(): BoxDef[] {
  const defs: BoxDef[] = [];
  let idx = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      for (let d = 0; d < DEPTH; d++) {
        defs.push({
          x: (col - (COLS  - 1) / 2) * STRIDE_X,
          y: (row - (ROWS  - 1) / 2) * STRIDE_Y,
          z: (d   - (DEPTH - 1) / 2) * STRIDE_Z,
          idx: idx++,
        });
      }
    }
  }
  return defs;
}

/* ── Scene (inside Canvas) ───────────────────────────────── */
interface SceneProps {
  isDragging:    React.MutableRefObject<boolean>;
  prevPointer:   React.MutableRefObject<{ x: number; y: number }>;
  manualRot:     React.MutableRefObject<{ x: number; y: number }>;
}

function Scene({ isDragging, manualRot }: SceneProps) {
  const groupRef      = useRef<THREE.Group>(null);
  const vegRef        = useRef<THREE.Points>(null);
  const vegGeoRef     = useRef<THREE.BufferGeometry>(null);

  const boxes = useMemo(buildBoxDefs, []);
  const meshRefs = useRef<(THREE.Mesh | null)[]>(new Array(boxes.length).fill(null));

  /* shared geometry + materials */
  const boxGeo = useMemo(
    () => new THREE.BoxGeometry(BOX_W, BOX_H, BOX_D),
    [],
  );
  const edgeGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(BOX_W, BOX_H, BOX_D)),
    [],
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission:   0.95,
        roughness:      0.05,
        thickness:      0.5,
        ior:            1.5,
        color:          new THREE.Color('#88ffaa'),
        iridescence:    0.3,
        iridescenceIOR: 1.3,
        transparent:    true,
        opacity:        0.85,
        side:           THREE.FrontSide,
      }),
    [],
  );
  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color:       new THREE.Color('#4FAE7E'),
        transparent: true,
        opacity:     0.4,
      }),
    [],
  );

  /* vegetation particle positions */
  const vegPositions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * TOTAL_W;
      pos[i * 3 + 1] = TOP_Y + Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * TOTAL_D;
    }
    return pos;
  }, []);

  /* base rotations so the structure starts at the nice angle */
  const baseRotX = useRef(0.18);
  const baseRotY = useRef(-0.35);

  useFrame((state, delta) => {
    const t     = state.clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    /* ── Assembly animation ── */
    boxes.forEach((box, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const delay    = box.idx * 0.055;
      const localT   = Math.max(0, t - delay);
      if (localT < ASSEMBLE_DURATION) {
        const p    = localT / ASSEMBLE_DURATION;
        const ease = 1 - Math.pow(1 - p, 3);
        mesh.position.y = box.y + (ease - 1) * 8;
      } else {
        mesh.position.y = box.y;
      }
    });

    /* ── Vegetation drift ── */
    if (vegGeoRef.current) {
      const pos  = vegGeoRef.current.getAttribute('position') as THREE.BufferAttribute;
      const arr  = pos.array as Float32Array;
      const speed = 0.012;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3 + 1] += speed * delta * 60 * 0.016;
        if (arr[i * 3 + 1] > TOP_Y + 2.5) {
          arr[i * 3 + 1] = TOP_Y;
        }
      }
      pos.needsUpdate = true;

      /* fade in vegetation */
      if (vegRef.current) {
        const mat = vegRef.current.material as THREE.PointsMaterial;
        if (t < 1.5) {
          mat.opacity = 0;
        } else if (t < 2.5) {
          mat.opacity = (t - 1.5);
        }
      }
    }

    /* ── Rotation ── */
    if (isDragging.current) {
      /* apply accumulated manual rotation */
      baseRotY.current += manualRot.current.y;
      baseRotX.current += manualRot.current.x;
      manualRot.current.x = 0;
      manualRot.current.y = 0;
    } else {
      /* slow auto-spin when not dragging */
      baseRotY.current += delta * 0.0015 * 60 * 0.016;
    }

    group.rotation.y = baseRotY.current;
    group.rotation.x = THREE.MathUtils.clamp(baseRotX.current, -0.6, 0.6);

    /* ── Breathing float ── */
    group.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[baseRotX.current, baseRotY.current, 0]}>
      {/* Glass boxes */}
      {boxes.map((box, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el.children[0] as THREE.Mesh;
          }}
          position={[box.x, box.y - 8, box.z]}
        >
          <mesh geometry={boxGeo} material={glassMat} />
          <lineSegments geometry={edgeGeo} material={edgeMat} />
        </group>
      ))}

      {/* Vegetation particles */}
      <points ref={vegRef}>
        <bufferGeometry ref={vegGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[vegPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4FAE7E"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function HeroScene() {
  const isDragging  = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const manualRot   = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ position: 'absolute', inset: 0 }}
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
        camera={{ position: [8, 6, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 4, -2]} intensity={0.8} color="#4FAE7E" />
        <pointLight position={[3, -2, 4]} intensity={0.4} color="#88aaff" />
        <Environment preset="city" />
        <Scene
          isDragging={isDragging}
          prevPointer={prevPointer}
          manualRot={manualRot}
        />
      </Canvas>
    </div>
  );
}
