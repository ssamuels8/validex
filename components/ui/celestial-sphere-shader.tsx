'use client';

import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

// --- GLSL Shaders ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_cloud_density;
  uniform float u_glow_intensity;
  uniform float u_rot;

  float random(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898,78.233,151.7182))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f*f*(3.0 - 2.0*f);

    return mix(
      mix(mix(random(i+vec3(0,0,0)), random(i+vec3(1,0,0)), u.x),
          mix(random(i+vec3(0,1,0)), random(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(random(i+vec3(0,0,1)), random(i+vec3(1,0,1)), u.x),
          mix(random(i+vec3(0,1,1)), random(i+vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 6; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float d = 1.0 - dot(uv, uv);
    if (d < 0.0) discard;

    // fake-sphere normal from the disc (seam-free: no sphere UVs involved)
    vec3 pos = vec3(uv, sqrt(d));

    // slow in-shader spin of the cloud sample coord — replaces geometry rotation,
    // so the orb is a clean circle with no UV seam.
    float a = u_time * u_rot;
    mat2 R = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec3 spos = vec3(R * pos.xy, pos.z);

    // cloud / nebula
    vec3 coord = spos * u_cloud_density + u_time * 0.1;
    float c = fbm(coord);
    vec3 nebula = mix(u_color1, u_color2, smoothstep(0.4, 0.6, c));

    // Fresnel rim glow (on the static disc normal, so the rim stays put)
    float fresnel = pow(1.0 - dot(normalize(pos), vec3(0,0,1)), 2.0)
                    * u_glow_intensity;
    vec3 glow = fresnel * u_color2;

    gl_FragColor = vec4(nebula + glow, 1.0);
  }
`;

// Site warm near-black — used for clearColor + CSS fallback (NOT pure black).
const FALLBACK_BG = '#15130E';

export interface ShaderCanvasProps {
  color1?: THREE.Color | string | number;
  color2?: THREE.Color | string | number;
  cloudDensity?: number;
  glowIntensity?: number;
  rotationSpeed?: number;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = memo(({
  color1 = 0xff4444,
  color2 = 0x4444ff,
  cloudDensity = 2.0,
  glowIntensity = 1.0,
  rotationSpeed = 0.5,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect reduced-motion: freeze rotation + time, render a single static frame.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveRotation = prefersReduced ? 0 : rotationSpeed;

    // Size from the MOUNT DIV, not the window (keeps the shader inside the hero).
    const initW = container.clientWidth || 1;
    const initH = container.clientHeight || 1;

    // 1. Scene + Camera (sized to the mount, not the window)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, initW / initH, 0.1, 1000);
    camera.position.z = 1;

    // 2. Renderer — no alpha so the warm clearColor shows through. pixelRatio capped ~1.5.
    //    WebGLRenderer throws if no GL context can be created (headless / WebGL disabled);
    //    degrade gracefully to the CSS fallback background instead of crashing the hero.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      return; // mount div keeps its warm #15130E background
    }
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(new THREE.Color(FALLBACK_BG), 1); // warm near-black, not pure black
    container.appendChild(renderer.domElement);

    // 3. Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_color1: { value: new THREE.Color(color1) },
      u_color2: { value: new THREE.Color(color2) },
      u_cloud_density: { value: cloudDensity },
      u_glow_intensity: { value: glowIntensity },
      u_rot: { value: effectiveRotation },
    };

    // 4. Flat plane (no UV seam) — sized to ~fill the hero height. The shader
    //    fakes the spherical shading, so a plane reads as a clean round orb.
    const VISIBLE_H = 2 * Math.tan((75 * Math.PI) / 180 / 2) * camera.position.z;
    const ORB = VISIBLE_H * 0.92; // diameter ≈ 92% of hero height
    const geo = new THREE.PlaneGeometry(ORB, ORB);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: false,
    });
    const orb = new THREE.Mesh(geo, mat);
    scene.add(orb);

    const clock = new THREE.Clock();

    const renderFrame = () => renderer.render(scene, camera);

    // 5. Resize — observe the MOUNT element, not the window.
    const applySize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderFrame(); // keep a fresh frame even while the loop is paused / reduced
    };
    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(container);

    // 6. Animation loop — pausable. Only advances time/rotation when not reduced.
    let raf = 0;
    let running = false;
    let simTime = 0; // monotonic; only advances while running → no jump after pause

    const loop = () => {
      simTime += clock.getDelta();
      uniforms.u_time.value = simTime; // spin handled in-shader via u_rot
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      clock.getDelta(); // discard the wall-clock gap accumulated while paused
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // 7. Pause the loop when the hero scrolls offscreen; resume when back in view.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    // Render one frame immediately (covers reduced-motion + initial paint).
    renderFrame();
    if (!prefersReduced) start();

    // 8. Cleanup
    return () => {
      stop();
      io.disconnect();
      resizeObserver.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color1, color2, cloudDensity, glowIntensity, rotationSpeed]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: FALLBACK_BG, // warm near-black fallback, not pure black
      }}
    />
  );
});

ShaderCanvas.displayName = 'CelestialSphereShader';

export default ShaderCanvas;
