'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── PARTICLE GALAXY ─── */
function ParticleGalaxy({ count = 6000 }) {
  const points = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const goldColor = new THREE.Color(0xC9A84C);
    const cyanColor = new THREE.Color(0x00D4FF);
    const dimColor = new THREE.Color(0x8892AA);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = Math.random() * 12 + 0.5;
      const spinAngle = radius * 2.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randomX = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 4;
      const randomY = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 2;
      const randomZ = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 4;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color based on distance from center
      const mixRatio = radius / 12;
      const rand = Math.random();
      let color;
      if (rand < 0.6) color = goldColor.clone().lerp(dimColor, mixRatio * 0.5);
      else if (rand < 0.9) color = cyanColor.clone().lerp(dimColor, mixRatio * 0.3);
      else color = dimColor.clone();

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      siz[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, col, siz];
  }, [count]);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.05;

    // Subtle mouse-driven tilt
    const targetX = mouseRef.current.y * 0.1;
    const targetZ = mouseRef.current.x * 0.1;
    points.current.rotation.x += (targetX - points.current.rotation.x) * 0.02;
    points.current.rotation.z += (targetZ - points.current.rotation.z) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── FLOATING GEOMETRY ─── */
function FloatingGeometry() {
  const icoRef = useRef();
  const torusRef = useRef();
  const octaRef = useRef();

  useFrame((state, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.15;
      icoRef.current.rotation.y += delta * 0.2;
      icoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.1;
      torusRef.current.rotation.z += delta * 0.15;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.4;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.25;
      octaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.35;
    }
  });

  const wireframeMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: 0xC9A84C,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    }),
    []
  );

  const cyanMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: 0x00D4FF,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    }),
    []
  );

  return (
    <>
      <mesh ref={icoRef} position={[-5, 1, -3]} material={wireframeMaterial}>
        <icosahedronGeometry args={[1.2, 1]} />
      </mesh>
      <mesh ref={torusRef} position={[5.5, -0.5, -4]} material={cyanMaterial}>
        <torusGeometry args={[1, 0.3, 8, 24]} />
      </mesh>
      <mesh ref={octaRef} position={[3, 2.5, -6]} material={wireframeMaterial}>
        <octahedronGeometry args={[0.8, 0]} />
      </mesh>
    </>
  );
}

/* ─── CAMERA CONTROLLER ─── */
function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(0, 0, 8);
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [camera]);

  useFrame(() => {
    // Subtle parallax camera tilt
    const targetX = mouseRef.current.y * 0.3;
    const targetY = mouseRef.current.x * 0.3;
    camera.position.x += (targetY - camera.position.x) * 0.02;
    camera.position.y += (-targetX - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── HERO 3D SCENE ─── */
export default function HeroScene() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
    }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 8] }}
      >
        <CameraController />
        <ambientLight intensity={0.1} />
        <ParticleGalaxy />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
