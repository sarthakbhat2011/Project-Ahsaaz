import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Heart, Sparkles } from 'lucide-react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function BreathingResonanceCircle() {
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-breathing cycle loop: 4s Inhale, 4s Hold, 4s Exhale, 4s Rest
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const runCycle = () => {
      setBreathPhase('Inhale');
      timer = setTimeout(() => {
        setBreathPhase('Hold');
        timer = setTimeout(() => {
          setBreathPhase('Exhale');
          setBreathCount(prev => prev + 1);
          timer = setTimeout(() => {
            setBreathPhase('Rest');
            timer = setTimeout(runCycle, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    };

    runCycle();
    return () => clearTimeout(timer);
  }, []);

  const handleCircleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1200);
  };

  const getPhaseText = () => {
    switch (breathPhase) {
      case 'Inhale': return 'Breathe In';
      case 'Hold': return 'Suspend & Feel';
      case 'Exhale': return 'Let Go Slowly';
      case 'Rest': return 'Rest in Silence';
    }
  };

  const getPhaseInstruction = () => {
    switch (breathPhase) {
      case 'Inhale': return 'Draw in local warmth & hope';
      case 'Hold': return 'Embrace the silent connection';
      case 'Exhale': return 'Sow Empathy.';
      case 'Rest': return 'Stillness before the next wave';
    }
  };

  return (
    <div className="relative aspect-square w-full rounded-3xl border border-[#efe6e2] shadow-xl flex flex-col items-center justify-between bg-white/60 p-6 md:p-8 overflow-hidden backdrop-blur-md select-none">
      {/* Background soft color matching the breathing cycle */}
      <motion.div
        animate={{
          backgroundColor: breathPhase === 'Inhale' ? '#fff1eb' : breathPhase === 'Hold' ? '#ffebdf' : breathPhase === 'Exhale' ? '#fbf2ed' : '#fff8f5'
        }}
        transition={{ duration: 4.0, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-[#827470] tracking-widest uppercase">
        Resonance Circle
      </div>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-[#9b451c] font-bold">
        🌿 Grounding Rhythm
      </div>

      {/* Top micro content */}
      <div className="relative z-10 text-center w-full pt-4">
        <span className="text-[10px] font-mono text-[#827470] uppercase tracking-widest font-bold">
          Active Mindfulness Module
        </span>
        <h4 className="font-serif text-lg font-bold text-[#442a22] mt-1">
          The Breathing Gate
        </h4>
      </div>

      {/* Main Breathing Circle */}
      <div 
        onClick={handleCircleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center cursor-pointer z-10"
      >
        {/* Animated ripples from tap */}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute rounded-full bg-[#9b451c]/30 pointer-events-none"
            style={{
              width: '40px',
              height: '40px',
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
          />
        ))}

        {/* Outer glowing pulsing aura */}
        <motion.div
          animate={{
            scale: breathPhase === 'Inhale' ? [1, 1.35] : breathPhase === 'Hold' ? 1.35 : breathPhase === 'Exhale' ? [1.35, 1] : 1,
            opacity: breathPhase === 'Inhale' ? [0.4, 0.8] : breathPhase === 'Hold' ? 0.8 : breathPhase === 'Exhale' ? [0.8, 0.4] : 0.4,
          }}
          transition={{ duration: 4.0, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-radial from-[#ffdbce] to-transparent blur-xl pointer-events-none"
        />

        {/* Secondary secondary harmonic ring */}
        <motion.div
          animate={{
            scale: breathPhase === 'Inhale' ? [1.05, 1.45] : breathPhase === 'Hold' ? 1.45 : breathPhase === 'Exhale' ? [1.45, 1.05] : 1.05,
            opacity: breathPhase === 'Inhale' ? [0.15, 0.4] : breathPhase === 'Hold' ? 0.4 : breathPhase === 'Exhale' ? [0.4, 0.15] : 0.15,
          }}
          transition={{ duration: 4.0, ease: 'easeInOut', delay: 0.3 }}
          className="absolute inset-0 rounded-full border border-[#9b451c]/20 pointer-events-none"
        />

        {/* Core breathing sphere */}
        <motion.div
          animate={{
            scale: breathPhase === 'Inhale' ? [1, 1.3] : breathPhase === 'Hold' ? 1.3 : breathPhase === 'Exhale' ? [1.3, 1] : 1,
            boxShadow: isHovered 
              ? '0 12px 30px rgba(155, 69, 28, 0.2)' 
              : '0 8px 20px rgba(155, 69, 28, 0.1)'
          }}
          transition={{ duration: 4.0, ease: 'easeInOut' }}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white border border-[#efe6e2] flex flex-col items-center justify-center text-center p-4 relative z-10 select-none hover:border-[#9b451c]/40 transition-colors duration-500"
        >
          <motion.div
            animate={{ rotate: breathPhase === 'Inhale' ? 360 : 0 }}
            transition={{ duration: 8.0, repeat: Infinity, ease: 'linear' }}
            className="text-[#9b451c]"
          >
            <Wind size={20} className="animate-pulse" />
          </motion.div>

          <span className="font-serif text-xs md:text-sm font-bold text-[#442a22] mt-1.5 block h-auto leading-tight px-1 text-center">
            {getPhaseText()}
          </span>

          <span className="font-mono text-[9px] text-[#827470] mt-1 tracking-wider uppercase block">
            Phase: {breathPhase}
          </span>
        </motion.div>
      </div>

      {/* Bottom instructions and metrics */}
      <div className="relative z-10 text-center w-full pb-2">
        <p className="font-serif text-xs italic text-[#504441] h-8 flex items-center justify-center px-4 leading-relaxed">
          "{getPhaseInstruction()}"
        </p>

        <div className="flex justify-center items-center gap-4 mt-4 pt-4 border-t border-[#f5ece7] font-mono text-[10px] text-[#827470]">
          <div className="flex items-center gap-1">
            <Heart size={11} className="text-[#9b451c]" />
            <span>Shared Pulse: <strong className="text-[#9b451c]">Synced</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Breaths Sown: <strong className="text-[#442a22]">{breathCount}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
