import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Camera3DSettings, PbrMaterial, LightSetting } from "../types";

interface ThreeDViewportProps {
  camera: Camera3DSettings;
  material: PbrMaterial;
  lights: LightSetting[];
  isOrbitMode: boolean;
}

export function ThreeDViewport({
  camera: cameraSettings,
  material,
  lights,
  isOrbitMode,
}: ThreeDViewportProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Mouse orbit state
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const spherical = useRef({ radius: 4.5, theta: 0.8, phi: 1.2 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);
    scene.fog = new THREE.FogExp2(0x060911, 0.15);

    const aspect = container.clientWidth / container.clientHeight;
    const cam = new THREE.PerspectiveCamera(cameraSettings.focalLengthMm || 35, aspect, 0.1, 100);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Grid & Ground Shadow Plane
    const grid = new THREE.GridHelper(16, 24, 0x3b82f6, 0x1e2638);
    grid.position.y = -1.2;
    scene.add(grid);

    // 4. Lights
    const ambient = new THREE.AmbientLight(0x0f172a, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Central Hero Product Mesh (Sleek Geometric Tech Form)
    const geometry = new THREE.TorusKnotGeometry(0.75, 0.24, 128, 32);
    const standardMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: material.metalness,
      roughness: material.roughness,
      envMapIntensity: 1.0,
    });

    const mesh = new THREE.Mesh(geometry, standardMaterial);
    mesh.position.y = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // Camera Positioning
    const updateCameraPos = () => {
      const { radius, theta, phi } = spherical.current;
      cam.position.x = radius * Math.sin(phi) * Math.sin(theta);
      cam.position.y = radius * Math.cos(phi);
      cam.position.z = radius * Math.sin(phi) * Math.cos(theta);
      cam.lookAt(0, 0, 0);
    };
    updateCameraPos();

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isOrbitMode && !isDragging.current && meshRef.current) {
        meshRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, cam);
    };
    animate();

    // 7. Mouse Orbit Handlers
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      spherical.current.theta -= dx * 0.008;
      spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi - dy * 0.008));
      updateCameraPos();
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.current.radius = Math.max(2.0, Math.min(10.0, spherical.current.radius + e.deltaY * 0.005));
      updateCameraPos();
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    dom.addEventListener("wheel", handleWheel, { passive: false });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      dom.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      if (dom.parentNode) dom.parentNode.removeChild(dom);
      geometry.dispose();
      standardMaterial.dispose();
      renderer.dispose();
    };
  }, [cameraSettings.focalLengthMm, isOrbitMode]);

  // Live PBR Material sync
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.metalness = material.metalness;
      meshRef.current.material.roughness = material.roughness;
      meshRef.current.material.needsUpdate = true;
    }
  }, [material.metalness, material.roughness]);

  // Live Lights sync
  useEffect(() => {
    if (keyLightRef.current && lights[0]) {
      keyLightRef.current.intensity = (lights[0].intensityPercent / 100) * 3.0;
    }
    if (rimLightRef.current && lights[1]) {
      rimLightRef.current.intensity = (lights[1].intensityPercent / 100) * 3.5;
    }
  }, [lights]);

  return (
    <div className="flex-1 bg-[#060911] p-4 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Left Camera Meta */}
      <div className="text-[11px] text-slate-400 font-mono tracking-wide z-10 flex items-center gap-3">
        <span>Perspective · {cameraSettings.focalLengthMm} mm · {cameraSettings.aperture}</span>
        <span className="text-[#3B82F6] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          WebGL 60 FPS · Three.js
        </span>
      </div>

      {/* Center 3D Canvas Host */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Hint */}
      <div className="text-[11px] text-slate-500 font-mono z-10 pointer-events-none">
        Drag to orbit · Scroll to zoom
      </div>
    </div>
  );
}
