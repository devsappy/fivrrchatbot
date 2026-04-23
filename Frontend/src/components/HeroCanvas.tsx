import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = { reducedMotion?: boolean };

const HeroCanvas: React.FC<Props> = ({ reducedMotion = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w() / h(), 0.1, 100);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Translucent core sphere — gives body to the orb
    const coreGeo = new THREE.SphereGeometry(1.25, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfafaf7,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Dense outer wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.4, 3);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.28,
    });
    const outerLines = new THREE.LineSegments(outerEdges, outerMat);
    group.add(outerLines);

    // Constellation dots at outer icosahedron vertices (amber)
    const vertexPos = outerGeo.attributes.position.array as Float32Array;
    const vertGeo = new THREE.BufferGeometry();
    vertGeo.setAttribute('position', new THREE.BufferAttribute(vertexPos.slice(), 3));
    const vertMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const vertPoints = new THREE.Points(vertGeo, vertMat);
    group.add(vertPoints);

    // Inner wireframe — amber accent
    const innerGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.55,
    });
    const innerLines = new THREE.LineSegments(innerEdges, innerMat);
    group.add(innerLines);

    // Orbiting ring 1 — thin torus, tilted
    const ring1Geo = new THREE.TorusGeometry(2.9, 0.006, 8, 160);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.4;
    ring1.rotation.z = Math.PI / 6;
    scene.add(ring1);

    // Orbiting ring 2 — amber, tilted opposite
    const ring2Geo = new THREE.TorusGeometry(3.2, 0.005, 8, 160);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Orbit-traveling satellite points on each ring
    const satCount = 3;
    const satellites: { mesh: any; ring: any; radius: number; speed: number; phase: number }[] = [];
    const makeSatellite = (ring: any, radius: number, speed: number, phase: number) => {
      const satGeo = new THREE.SphereGeometry(0.055, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const mesh = new THREE.Mesh(satGeo, satMat);
      ring.add(mesh);
      satellites.push({ mesh, ring, radius, speed, phase });
    };
    for (let i = 0; i < satCount; i++) {
      makeSatellite(ring1, 2.9, 0.6 + i * 0.1, (i / satCount) * Math.PI * 2);
    }
    for (let i = 0; i < satCount - 1; i++) {
      makeSatellite(ring2, 3.2, -0.45 - i * 0.1, (i / (satCount - 1)) * Math.PI * 2);
    }

    // Dense dust halo
    const dustCount = 320;
    const dustPos = new Float32Array(dustCount * 3);
    const dustSize = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = r * Math.cos(phi);
      dustSize[i] = 0.012 + Math.random() * 0.024;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Inner sparkle dust (inside the orb)
    const sparkCount = 90;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const r = Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sparkPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sparkPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sparkPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.028,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    group.add(sparks);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      if (!reducedMotion) {
        group.rotation.y = t * 0.1 + current.x * 0.35;
        group.rotation.x = Math.sin(t * 0.12) * 0.15 + current.y * 0.25;

        innerLines.rotation.y = -t * 0.25;
        innerLines.rotation.x = t * 0.18;
        innerLines.rotation.z = t * 0.08;
        const pulse = 1 + Math.sin(t * 1.4) * 0.04;
        innerLines.scale.setScalar(pulse);

        outerLines.rotation.z = t * 0.04;
        vertPoints.rotation.z = t * 0.04;

        ring1.rotation.y = t * 0.15;
        ring2.rotation.y = -t * 0.12;

        // satellites travel along their ring (local circle in XY plane of the ring)
        for (const s of satellites) {
          const a = t * s.speed + s.phase;
          s.mesh.position.set(Math.cos(a) * s.radius, Math.sin(a) * s.radius, 0);
        }

        dust.rotation.y = t * 0.03;
        dust.rotation.x = t * 0.02;

        sparks.rotation.y = -t * 0.2;
        sparks.rotation.x = t * 0.15;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      coreGeo.dispose(); coreMat.dispose();
      outerGeo.dispose(); outerEdges.dispose(); outerMat.dispose();
      vertGeo.dispose(); vertMat.dispose();
      innerGeo.dispose(); innerEdges.dispose(); innerMat.dispose();
      ring1Geo.dispose(); ring1Mat.dispose();
      ring2Geo.dispose(); ring2Mat.dispose();
      satellites.forEach((s) => {
        s.mesh.geometry.dispose();
        s.mesh.material.dispose();
      });
      dustGeo.dispose(); dustMat.dispose();
      sparkGeo.dispose(); sparkMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

export default HeroCanvas;
