import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Seed Particles structure
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      speedModifier: number;
      angle: number;
      spin: number;
    }

    const particles: Particle[] = [];
    const particleCount = 45; // Clean density that doesn't clutter

    const colors = [
      'rgba(155, 69, 28, ',  // Deep Terracotta
      'rgba(254, 145, 98, ',  // Gentle Peach/Amber
      'rgba(217, 119, 6, ',   // Gold Ochre
      'rgba(16, 185, 129, ',  // Sprout Green (representing organic seeds)
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.4 - 0.15, // Drifts upwards continuously
        alpha: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedModifier: Math.random() * 0.4 + 0.6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
      });
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      particles.forEach((p) => {
        // Continuous movement
        p.y += p.vy * p.speedModifier;
        p.x += p.vx * p.speedModifier;
        p.angle += p.spin;

        // Wrap around borders gracefully with smooth re-entry
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Interactive mouse repellent force (smooth displacement)
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist; // Stronger force as distance gets smaller
            const forceX = (dx / dist) * force * 1.8;
            const forceY = (dy / dist) * force * 1.8;

            p.x += forceX;
            p.y += forceY;
          }
        }

        // Draw elegant organic seed/leaf shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        
        // Draw double-quadratic curved seed
        ctx.moveTo(0, -p.size * 1.6);
        ctx.quadraticCurveTo(p.size, 0, 0, p.size * 1.6);
        ctx.quadraticCurveTo(-p.size, 0, 0, -p.size * 1.6);
        
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = '#fe9162';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 select-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
