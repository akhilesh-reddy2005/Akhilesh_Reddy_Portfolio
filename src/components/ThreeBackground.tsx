import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x38bdf8, 1.6, 80);
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x8b5cf6, 1.0, 80);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const neonLight = new THREE.PointLight(0x22d3ee, 0.9, 100);
    neonLight.position.set(0, 8, 8);
    scene.add(neonLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(0, 6, 10);
    scene.add(dirLight);

    const objects: THREE.Mesh[] = [];
    const basePositions = new Map<THREE.Mesh, THREE.Vector3>();
    const cursorSeeds = new Map<THREE.Mesh, THREE.Vector2>();
    const mouse = new THREE.Vector2(0, 0);
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.95,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.6,
    });
    const purpleMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.5,
    });
    const pinkMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
      emissive: 0xf472b6,
      emissiveIntensity: 0.45,
    });
    const cyanMaterial = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.55,
    });
    const chipMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.95,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
    });
    const chipGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.6,
    });


    const createParticleField = () => {
      const count = 800;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 18;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = -2 - Math.random() * 10;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return { points, geometry, material };
    };

    // Create backdrop
    const backdrop = new THREE.GridHelper(40, 40, 0x38bdf8, 0x38bdf8);
    backdrop.material.transparent = true;
    backdrop.material.opacity = 0.04;
    backdrop.rotation.x = Math.PI / 2;
    backdrop.position.set(0, 0, -10);
    scene.add(backdrop);

    const particleField = createParticleField();

    const createBox = (x: number, y: number, z: number, size = 0.7) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), wireframeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createSphere = (x: number, y: number, z: number, radius = 0.45) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), purpleMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createTorus = (x: number, y: number, z: number, radius = 0.45, tube = 0.15) => {
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 32), pinkMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createIcosahedron = (x: number, y: number, z: number, radius = 0.5) => {
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 0), wireframeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createOctahedron = (x: number, y: number, z: number, radius = 0.5) => {
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(radius, 0), purpleMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createCone = (x: number, y: number, z: number, radius = 0.35, height = 0.8) => {
      const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 18), pinkMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createTorusKnot = (x: number, y: number, z: number, radius = 0.35, tube = 0.12) => {
      const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(radius, tube, 80, 12), cyanMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createDodecahedron = (x: number, y: number, z: number, radius = 0.5) => {
      const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), wireframeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createTetrahedron = (x: number, y: number, z: number, radius = 0.45) => {
      const mesh = new THREE.Mesh(new THREE.TetrahedronGeometry(radius, 0), purpleMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createRing = (x: number, y: number, z: number, inner = 0.2, outer = 0.5) => {
      const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 24), pinkMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.x = Math.PI / 2.4;
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createHexPrism = (x: number, y: number, z: number, radius = 0.35, height = 0.6) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 6), wireframeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createPanel = (x: number, y: number, z: number, w = 0.9, h = 0.45, d = 0.08) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cyanMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.z = Math.PI / 6;
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createRod = (x: number, y: number, z: number, radius = 0.12, height = 1.0) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 12), purpleMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.x = Math.PI / 3.5;
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createChipBlock = (x: number, y: number, z: number, size = 0.9) => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.55, size), chipMaterial);
      base.position.set(x, y, z);

      const top = new THREE.Mesh(new THREE.BoxGeometry(size * 0.7, size * 0.3, size * 0.7), chipGlowMaterial);
      top.position.set(x, y + size * 0.35, z);

      const ring = new THREE.Mesh(new THREE.BoxGeometry(size * 0.9, size * 0.08, size * 0.9), cyanMaterial);
      ring.position.set(x, y + size * 0.52, z);

      group.add(base, top, ring);
      scene.add(group);

      objects.push(base, top, ring);
      basePositions.set(base, base.position.clone());
      basePositions.set(top, top.position.clone());
      basePositions.set(ring, ring.position.clone());
      cursorSeeds.set(base, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
      cursorSeeds.set(top, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
      cursorSeeds.set(ring, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createDNAHelix = (x: number, y: number, z: number, height = 1.2) => {
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 4;
        const y1 = y + (i / segments - 0.5) * height;
        const x1 = x + Math.cos(angle) * 0.3;
        const z1 = z + Math.sin(angle) * 0.3;
        
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), cyanMaterial);
        sphere.position.set(x1, y1, z1);
        scene.add(sphere);
        objects.push(sphere);
        basePositions.set(sphere, sphere.position.clone());
        cursorSeeds.set(sphere, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
      }
    };

    const createCrystalCluster = (x: number, y: number, z: number, size = 0.6) => {
      const count = 5;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const offset = size * 0.4;
        const cx = x + Math.cos(angle) * offset;
        const cz = z + Math.sin(angle) * offset;
        const crystal = new THREE.Mesh(new THREE.ConeGeometry(size * 0.2, size * 0.8, 6), purpleMaterial);
        crystal.position.set(cx, y, cz);
        crystal.rotation.z = Math.PI;
        scene.add(crystal);
        objects.push(crystal);
        basePositions.set(crystal, crystal.position.clone());
        cursorSeeds.set(crystal, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
      }
    };

    const createFloatingOrb = (x: number, y: number, z: number, radius = 0.4) => {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 24), chipGlowMaterial);
      orb.position.set(x, y, z);
      
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.3, radius * 0.08, 12, 24), cyanMaterial);
      ring1.position.set(x, y, z);
      ring1.rotation.x = Math.PI / 3;
      
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.5, radius * 0.08, 12, 24), pinkMaterial);
      ring2.position.set(x, y, z);
      ring2.rotation.y = Math.PI / 3;
      
      scene.add(orb, ring1, ring2);
      objects.push(orb, ring1, ring2);
      basePositions.set(orb, orb.position.clone());
      basePositions.set(ring1, ring1.position.clone());
      basePositions.set(ring2, ring2.position.clone());
      const seed = new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
      cursorSeeds.set(orb, seed);
      cursorSeeds.set(ring1, seed);
      cursorSeeds.set(ring2, seed);
    };

    const createCapsule = (x: number, y: number, z: number, radius = 0.25, length = 0.8) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 6, 12), cyanMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    const createCylinder = (x: number, y: number, z: number, radiusTop = 0.25, radiusBottom = 0.35, height = 0.8) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 14), wireframeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push(mesh);
      basePositions.set(mesh, mesh.position.clone());
      cursorSeeds.set(mesh, new THREE.Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
    };

    // Corner + border anchors (fewer shapes, spread across edges)
    createTorusKnot(-8.6, 4.8, -4.6, 0.36, 0.12);
    createHexPrism(8.6, 4.8, -4.8, 0.45, 0.7);
    createRing(-8.6, -4.8, -5.4, 0.2, 0.55);
    createPanel(8.6, -4.8, -5.8, 0.9, 0.5, 0.08);

    createDodecahedron(0, 5.2, -5.6, 0.45);
    createCapsule(0, -5.2, -6.2, 0.25, 0.9);
    createCylinder(-9.2, 0, -6.4, 0.2, 0.32, 0.9);
    createRod(9.2, 0, -6.0, 0.12, 0.95);
    createTetrahedron(-6.4, 0, -4.8, 0.38);
    createOctahedron(6.4, 0, -5.2, 0.36);

    // Unique 3D elements
    createDNAHelix(-7.5, 1.5, -5.8, 1.4);
    createDNAHelix(7.5, -1.8, -6.2, 1.2);
    createCrystalCluster(-4.5, 3.8, -6.5, 0.65);
    createCrystalCluster(4.8, -3.5, -7.0, 0.6);
    createFloatingOrb(0, 2.2, -7.5, 0.42);
    createFloatingOrb(-6.2, -1.5, -8.0, 0.38);
    createFloatingOrb(6.4, 0.8, -8.5, 0.4);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationFrameId = 0;
    const animate = () => {
      const time = Date.now() * 0.001;
      camera.position.x = mouse.x * 0.4;
      camera.position.y = mouse.y * 0.28;
      camera.lookAt(0, 0, -4);

      if (particleField) {
        particleField.points.rotation.y += 0.00025;
        particleField.points.rotation.x += 0.0001;
      }

      objects.forEach((mesh, index) => {
        mesh.rotation.x += 0.0016 + index * 0.00015;
        mesh.rotation.y += 0.0022 + index * 0.00012;

        const base = basePositions.get(mesh);
        const seed = cursorSeeds.get(mesh) || new THREE.Vector2(0, 0);
        if (base) {
          const floatY = Math.sin(time + index) * 0.045;
          const floatX = Math.cos(time * 0.8 + index) * 0.03;
          const cursorOffsetX = mouse.x * (0.1 + seed.x * 0.12);
          const cursorOffsetY = mouse.y * (0.1 + seed.y * 0.12);
          mesh.position.x = base.x + floatX + cursorOffsetX;
          mesh.position.y = base.y + floatY + cursorOffsetY;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (particleField) {
        particleField.geometry.dispose();
        particleField.material.dispose();
        scene.remove(particleField.points);
      }
      backdrop.geometry.dispose();
      (backdrop.material as THREE.Material).dispose();
      objects.forEach((mesh) => {
        mesh.geometry.dispose();
      });
      wireframeMaterial.dispose();
      purpleMaterial.dispose();
      pinkMaterial.dispose();
      cyanMaterial.dispose();
      chipMaterial.dispose();
      chipGlowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
