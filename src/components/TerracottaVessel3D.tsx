import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, Sparkles } from 'lucide-react';

export default function TerracottaVessel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive states
  const [warmthLevel, setWarmthLevel] = useState<number>(60);
  
  // Refs to allow the high-frequency WebGL loop to access state and register input without causing component rebuilds
  const warmthRef = useRef<number>(60);
  const mouseRef = useRef({ 
    x: 0, 
    y: 0, 
    targetX: 0, 
    targetY: 0, 
    hoverActive: false,
    lastX: 0,
    lastY: 0
  });

  // Keep warmthRef in sync
  useEffect(() => {
    warmthRef.current = warmthLevel;
  }, [warmthLevel]);

  // Click handler to trigger explosive embers & audio feedback
  const triggerClickExplosionRef = useRef<() => void>(() => {});

  const handleContainerClick = () => {
    // Elevate warmth level by 15% on each gentle click
    setWarmthLevel((prev) => Math.min(100, prev + 15));
    
    // Trigger the WebGL explosion particles
    if (triggerClickExplosionRef.current) {
      triggerClickExplosionRef.current();
    }

    // Gentle organic audio synth feedback (soothing clay tap resonant note)
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        // Elegant low resonant earthy frequency
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Safely ignore if audio context is blocked by user browser policy
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    
    let width = container.clientWidth;
    let height = container.clientHeight || 360;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 5.2); 
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // 3. Dynamic Lighting (representing warm flickering firelight)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.3);
    scene.add(ambientLight);

    // Main central embers glow point light
    const fireLight = new THREE.PointLight(0xfe9162, 5.0, 10);
    fireLight.position.set(0, 0.4, 0);
    scene.add(fireLight);

    // Secondary directional light for gorgeous ceramic highlight
    const rimHighlightLight = new THREE.DirectionalLight(0xffedd5, 2.0);
    rimHighlightLight.position.set(3, 3, 2);
    scene.add(rimHighlightLight);

    // 4. Create the "Terracotta Empathy Vessel" (Indian Clay Heritage style)
    const vesselGroup = new THREE.Group();
    scene.add(vesselGroup);

    const points: THREE.Vector2[] = [];
    // Profile of a traditional broad-bottomed warming vessel
    points.push(new THREE.Vector2(0, -0.9));       // base center
    points.push(new THREE.Vector2(0.65, -0.9));    // base outer ring
    points.push(new THREE.Vector2(0.8, -0.75));    // foot taper
    points.push(new THREE.Vector2(1.3, -0.15));    // broad rounded belly
    points.push(new THREE.Vector2(1.1, 0.45));     // waist necking
    points.push(new THREE.Vector2(1.15, 0.75));    // flared upper rim
    points.push(new THREE.Vector2(1.12, 0.78));    // outer lip
    points.push(new THREE.Vector2(1.02, 0.72));    // inner lip
    points.push(new THREE.Vector2(0.98, 0.35));    // inner chamber neck
    points.push(new THREE.Vector2(1.08, -0.15));   // inner broad chamber
    points.push(new THREE.Vector2(0, -0.7));       // inner bottom
    
    const vesselGeo = new THREE.LatheGeometry(points, 48);

    // Matte organic terracotta material with clearcoat sheen representing artisan glaze
    const vesselMat = new THREE.MeshPhysicalMaterial({
      color: 0x9b451c, // earthy terracotta orange-brown
      roughness: 0.62,
      metalness: 0.08,
      clearcoat: 0.25,
      clearcoatRoughness: 0.45,
      flatShading: false,
    });

    const vesselMesh = new THREE.Mesh(vesselGeo, vesselMat);
    vesselGroup.add(vesselMesh);

    // 5. Golden Engraved Heritage Geometric Bands & Glowing Kintsugi cracks
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xd29d53,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0xfe9162,
      emissiveIntensity: 0.5, // glowing kintsugi
    });

    const bandGroup = new THREE.Group();
    vesselGroup.add(bandGroup);

    // Decorative relief rings
    const ringGeo1 = new THREE.RingGeometry(1.22, 1.25, 32);
    const ring1 = new THREE.Mesh(ringGeo1, goldMat);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = -0.15;
    bandGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(1.11, 1.13, 32);
    const ring2 = new THREE.Mesh(ringGeo2, goldMat);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.45;
    bandGroup.add(ring2);

    // Elegant cracks of Division mended in Gold representing restoration
    const crackPoints = [
      new THREE.Vector3(0, -0.6, 0.8),
      new THREE.Vector3(0.2, -0.3, 1.1),
      new THREE.Vector3(-0.1, 0.1, 1.0),
      new THREE.Vector3(0.1, 0.4, 1.02),
    ];
    const crackCurve = new THREE.CatmullRomCurve3(crackPoints);
    const crackGeo = new THREE.TubeGeometry(crackCurve, 16, 0.02, 6, false);
    const crackMesh = new THREE.Mesh(crackGeo, goldMat);
    bandGroup.add(crackMesh);

    // Extra branching crack for additional aesthetic detail
    const branchPoints = [
      new THREE.Vector3(0.2, -0.3, 1.1),
      new THREE.Vector3(0.45, -0.1, 0.95),
      new THREE.Vector3(0.6, 0.15, 0.8),
    ];
    const branchCurve = new THREE.CatmullRomCurve3(branchPoints);
    const branchGeo = new THREE.TubeGeometry(branchCurve, 12, 0.015, 6, false);
    const branchMesh = new THREE.Mesh(branchGeo, goldMat);
    bandGroup.add(branchMesh);

    // 6. Radiant Ambient Embers rising continuously
    const ambientParticleCount = 80;
    const ambientParticleGeo = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientParticleCount * 3);
    const ambientVelocities = new Float32Array(ambientParticleCount * 3);
    const ambientLives = new Float32Array(ambientParticleCount);

    for (let i = 0; i < ambientParticleCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 0.7;
      ambientPositions[i * 3 + 1] = -0.4 + Math.random() * 0.5;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;

      ambientVelocities[i * 3] = (Math.random() - 0.5) * 0.012;
      ambientVelocities[i * 3 + 1] = 0.006 + Math.random() * 0.015;
      ambientVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;

      ambientLives[i] = Math.random();
    }

    ambientParticleGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));

    const ambientParticleMat = new THREE.PointsMaterial({
      color: 0xfe9162,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const ambientEmberPoints = new THREE.Points(ambientParticleGeo, ambientParticleMat);
    vesselGroup.add(ambientEmberPoints);

    // 7. Interactive Click-Explosion Sparkle system
    const clickParticleCount = 50;
    const clickParticleGeo = new THREE.BufferGeometry();
    const clickPositions = new Float32Array(clickParticleCount * 3);
    const clickVelocities = new Float32Array(clickParticleCount * 3);
    const clickLives = new Float32Array(clickParticleCount); // 0 (dormant) to 1.0 (dead)

    // Initially hide click particles deep inside
    for (let i = 0; i < clickParticleCount; i++) {
      clickPositions[i * 3] = 0;
      clickPositions[i * 3 + 1] = -5.0; // hidden
      clickPositions[i * 3 + 2] = 0;
      clickLives[i] = 1.0; // fully dead
    }

    clickParticleGeo.setAttribute('position', new THREE.BufferAttribute(clickPositions, 3));

    const clickParticleMat = new THREE.PointsMaterial({
      color: 0xffe2b7, // Bright incandescent white-yellow
      size: 0.08,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
    });

    const clickEmberPoints = new THREE.Points(clickParticleGeo, clickParticleMat);
    vesselGroup.add(clickEmberPoints);

    // Connect trigger click explosion to the React component scope
    triggerClickExplosionRef.current = () => {
      const posArr = clickParticleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < clickParticleCount; i++) {
        // Spawn right at the glowing fire core inside the pot
        posArr[i * 3] = (Math.random() - 0.5) * 0.3;
        posArr[i * 3 + 1] = 0.1; // surface level
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

        // Fast upward spraying trajectory
        clickVelocities[i * 3] = (Math.random() - 0.5) * 0.05;
        clickVelocities[i * 3 + 1] = 0.04 + Math.random() * 0.06;
        clickVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

        clickLives[i] = 0; // awaken!
      }
      clickParticleGeo.attributes.position.needsUpdate = true;
    };

    // 8. Interactive Pointer/Touch Motion Events (Friction mechanic)
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current.targetX = Math.max(-1.5, Math.min(1.5, x));
      mouseRef.current.targetY = Math.max(-1.5, Math.min(1.5, y));
      mouseRef.current.hoverActive = true;

      // Friction heat calculation: more sweeping movements generate more warmth
      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 0.005) {
        setWarmthLevel((prev) => Math.min(100, prev + speed * 135));
      }

      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.hoverActive = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 9. Intersection Observer to only render when visible in viewport
    let isElementVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isElementVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (container) {
      observer.observe(container);
    }

    // 10. Animation & Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isElementVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const currentWarmth = warmthRef.current; // Real-time warmth value

      // Smooth damping transition for cursor rotation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Spin showcase based on cursor movement
      vesselGroup.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.5;
      vesselGroup.rotation.x = 0.12 + Math.sin(elapsedTime * 0.7) * 0.04 + mouseRef.current.y * -0.25;

      // Scale pulses in breathing pattern, pulse faster if warmth is high
      const pulseSpeed = 1.2 + (currentWarmth / 100) * 1.8;
      const pulseAmplitude = 0.01 + (currentWarmth / 100) * 0.015;
      const scaleAmt = 1.0 + Math.sin(elapsedTime * pulseSpeed) * pulseAmplitude;
      vesselGroup.scale.set(scaleAmt, scaleAmt, scaleAmt);

      // Embers light intensity reflects heat level directly + flicker noise
      const baseIntensity = 3.0 + (currentWarmth / 100) * 4.5;
      fireLight.intensity = baseIntensity + Math.sin(elapsedTime * 14) * 0.75;

      // Make Kintsugi gold seams glow dynamically matching warmth heat
      goldMat.emissiveIntensity = 0.1 + (currentWarmth / 100) * 0.95 + Math.sin(elapsedTime * 6) * 0.1;

      // A. Update Ambient rising embers
      const ambPos = ambientParticleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientParticleCount; i++) {
        // Particles rise faster if heat is higher
        const speedMultiplier = 1.0 + (currentWarmth / 100) * 1.5;
        ambPos[i * 3 + 1] += ambientVelocities[i * 3 + 1] * speedMultiplier;
        ambPos[i * 3] += ambientVelocities[i * 3] + Math.sin(elapsedTime + i) * 0.002;
        ambPos[i * 3 + 2] += ambientVelocities[i * 3 + 2] + Math.cos(elapsedTime + i) * 0.002;

        ambientLives[i] += 0.006 + (currentWarmth / 100) * 0.008;

        // Reset particle if it floats past the mouth or expires
        if (ambPos[i * 3 + 1] > 2.0 || ambientLives[i] > 1.0) {
          ambPos[i * 3] = (Math.random() - 0.5) * 0.5;
          ambPos[i * 3 + 1] = -0.4;
          ambPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
          ambientLives[i] = 0;
        }
      }
      ambientParticleGeo.attributes.position.needsUpdate = true;

      // B. Update Click-Explosion Sparkles
      const clickPos = clickParticleGeo.attributes.position.array as Float32Array;
      let hasActiveSparks = false;

      for (let i = 0; i < clickParticleCount; i++) {
        if (clickLives[i] < 1.0) {
          hasActiveSparks = true;
          // Apply velocity
          clickPos[i * 3] += clickVelocities[i * 3];
          clickPos[i * 3 + 1] += clickVelocities[i * 3 + 1];
          clickPos[i * 3 + 2] += clickVelocities[i * 3 + 2];

          // Add a bit of drag & gravity sway
          clickVelocities[i * 3] *= 0.96;
          clickVelocities[i * 3 + 1] -= 0.0015; // gentle gravity falloff
          clickVelocities[i * 3 + 2] *= 0.96;

          clickLives[i] += 0.015; // age the sparkle

          // Hide once fully aged/dead
          if (clickLives[i] >= 1.0) {
            clickPos[i * 3 + 1] = -5.0; 
          }
        }
      }
      
      if (hasActiveSparks) {
        clickParticleGeo.attributes.position.needsUpdate = true;
        // Sparkles slowly fade out
        clickParticleMat.opacity = 1.0;
      }

      // Dynamically alter particle color warmth depending on heat levels
      if (currentWarmth > 80) {
        ambientParticleMat.color.setHex(0xffbc8c); // brilliant amber white
      } else if (currentWarmth > 45) {
        ambientParticleMat.color.setHex(0xfe9162); // hot burning orange
      } else {
        ambientParticleMat.color.setHex(0xbf5426); // slow dim deep red
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. ResizeObserver to maintain aspect ratio on any screensize change
    let resizeFrameId: number;
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        const w = container.clientWidth;
        const h = container.clientHeight || 360;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      observer.disconnect();
      renderer.dispose();
      vesselGeo.dispose();
      vesselMat.dispose();
      goldMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      crackGeo.dispose();
      branchGeo.dispose();
      ambientParticleGeo.dispose();
      ambientParticleMat.dispose();
      clickParticleGeo.dispose();
      clickParticleMat.dispose();
    };
  }, []);

  // Organic heat dissipation over time
  useEffect(() => {
    const interval = setInterval(() => {
      setWarmthLevel((prev) => {
        // Slow cooling: cools quicker if it's very hot
        const step = prev > 75 ? 3 : 1;
        return Math.max(30, prev - step);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-stretch bg-white/60 p-5 rounded-3xl border border-[#efe6e2] shadow-xl relative backdrop-blur-sm">
      {/* Vessel Header */}
      <div className="flex justify-between items-center mb-1 z-20 pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-[#9b451c] font-black uppercase">
            Artisanal WebGL Active Vessel
          </span>
          <h3 className="font-serif text-base font-bold text-[#442a22] leading-tight">
            Terracotta Vessel of Shared Warmth
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-[#ffdbce]/75 px-3 py-1 rounded-full border border-[#fe9162]/20">
          <Flame className="w-3.5 h-3.5 text-[#9b451c] animate-pulse" />
          <span className="font-mono text-[10px] font-black text-[#9b451c]">
            {warmthLevel}% WARMTH
          </span>
        </div>
      </div>

      {/* Main interactive stage container */}
      <div 
        ref={containerRef} 
        onClick={handleContainerClick}
        className="w-full min-h-[300px] md:min-h-[340px] relative select-none cursor-grab active:cursor-grabbing flex-1"
      >
        {/* Soft atmospheric golden flare under the vessel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[180px] h-[180px] rounded-full bg-radial from-[#fe9162]/12 via-[#d29d53]/4 to-transparent blur-2xl animate-pulse" />
        </div>

        <canvas ref={canvasRef} className="w-full h-full relative z-10 block pointer-events-auto" id="threejs-terracotta-vessel" />
      </div>

      {/* Interactive Description Footer */}
      <div className="mt-2 pt-3 border-t border-[#efe6e2]/80 text-center z-20 relative">
        <p className="text-[11px] text-[#827470] leading-relaxed flex items-center justify-center gap-1.5 px-2">
          <Sparkles className="w-3.5 h-3.5 text-[#fe9162] animate-pulse shrink-0" />
          <span>
            <strong>Sweep the cursor</strong> across the clay to warm it with friction. 
            <strong> Tap or click</strong> the vessel to release sparkling waves of communal dignity.
          </span>
        </p>
      </div>
    </div>
  );
}
