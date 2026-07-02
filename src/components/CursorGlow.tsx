import React, { useEffect, useState, useRef } from 'react';

export default function CursorGlow() {
  const [active, setActive] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch-only devices to avoid unnecessary overhead
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!active) setActive(true);
    };

    const handleMouseLeave = () => {
      setActive(false);
    };

    const handleMouseEnter = () => {
      setActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerping Loop for the Warm Sanctuary Glow Aura
    let animationFrameId: number;
    const updateGlow = () => {
      const dx = targetRef.current.x - positionRef.current.x;
      const dy = targetRef.current.y - positionRef.current.y;
      
      // Smooth lerp (0.12 speed for fluid organic lag)
      positionRef.current.x += dx * 0.12;
      positionRef.current.y += dy * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateGlow);
    };

    updateGlow();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 select-none overflow-hidden">
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full pointer-events-none transition-opacity duration-300 ease-out flex items-center justify-center"
        style={{
          opacity: active ? 0.95 : 0,
          willChange: 'transform',
        }}
      >
        {/* Tight, high-contrast warm glow background */}
        <div className="absolute inset-0 rounded-full bg-radial from-[rgba(254,145,98,0.7)] via-[rgba(155,69,28,0.25)] to-transparent blur-[3px]" />
        {/* High-visibility warm core dot */}
        <div className="w-2 h-2 rounded-full bg-[#fe9162] shadow-[0_0_10px_#fe9162] border border-white/50" />
      </div>
    </div>
  );
}
