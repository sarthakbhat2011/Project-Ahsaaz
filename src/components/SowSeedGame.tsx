import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sprout, Heart, Flame } from 'lucide-react';

interface SowSeedGameProps {
  onComplete: () => void;
}

export default function SowSeedGame({ onComplete }: SowSeedGameProps) {
  const [gameState, setGameState] = useState<'intro' | 'planted' | 'growing' | 'bloomed'>('intro');
  const [seedCoords, setSeedCoords] = useState({ x: 50, y: 80 }); // Percentages
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger ambient seed floating particles when growing
  useEffect(() => {
    if (gameState === 'growing' && isPressing) {
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        x: seedCoords.x + (Math.random() * 20 - 10),
        y: seedCoords.y - (Math.random() * 40 + 10),
        delay: Math.random() * 1.5,
      }));
      setParticles(prev => [...prev, ...newParticles].slice(-40));
    }
  }, [progress, isPressing, gameState, seedCoords.x, seedCoords.y]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'intro') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Keep seed in a sensible central/bottom area
    const safeX = Math.max(25, Math.min(x, 75));
    const safeY = Math.max(65, Math.min(y, 85));

    setSeedCoords({ x: safeX, y: safeY });
    setGameState('planted');
  };

  const startNurturing = () => {
    if (gameState !== 'planted' && gameState !== 'growing') return;
    setIsPressing(true);
    setGameState('growing');

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          setIsPressing(false);
          setGameState('bloomed');
          return 100;
        }
        return prev + 1.25; // Grow speed
      });
    }, 30);
  };

  const stopNurturing = () => {
    setIsPressing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1b18] text-[#fff8f5] flex flex-col justify-between p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial from-[rgba(155,69,28,0.15)] via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex justify-between items-center py-4">
        <span className="font-serif text-lg font-bold tracking-wide text-white">Project Ahsaaz</span>
        <span className="font-mono text-xs tracking-widest text-[#d4c3be] uppercase">Empathy Awakening</span>
      </header>

      {/* Interactivity Area */}
      <div
        className="relative flex-grow w-full max-w-4xl mx-auto rounded-3xl border border-[#d4c3be]/10 bg-black/40 my-4 flex items-center justify-center cursor-crosshair overflow-hidden"
        onClick={handleContainerClick}
        onMouseDown={gameState === 'planted' || gameState === 'growing' ? startNurturing : undefined}
        onMouseUp={stopNurturing}
        onMouseLeave={stopNurturing}
        onTouchStart={gameState === 'planted' || gameState === 'growing' ? startNurturing : undefined}
        onTouchEnd={stopNurturing}
      >
        <AnimatePresence>
          {gameState === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center p-8 max-w-lg pointer-events-none z-10"
            >
              <div className="inline-flex p-3 rounded-full bg-[#9b451c]/10 text-[#fe9162] mb-6 animate-pulse">
                <Heart size={28} className="fill-[#fe9162]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
                Empathy begins with a single, silent realization.
              </h2>
              <p className="font-sans text-sm text-[#d4c3be]/80 leading-relaxed mb-8">
                In Hindi and Urdu, <span className="text-[#fe9162] font-semibold">Ahsaaz (अहसास / एहसास)</span> represents the exact moment you feel another's quiet struggle.
              </p>
              <div className="inline-block px-5 py-2.5 rounded-full border border-[#fe9162]/30 bg-[#9b451c]/10 text-[#fe9162] text-xs font-mono tracking-wider uppercase animate-bounce mt-4">
                Click anywhere on the soil below to plant your seed of hope
              </div>
            </motion.div>
          )}

          {(gameState === 'planted' || gameState === 'growing') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-x-0 top-12 text-center pointer-events-none z-10 px-4"
            >
              <h2 className="font-serif text-2xl text-white mb-2">
                {gameState === 'planted' ? "The Seed is Sown." : "Nurturing Empathy..."}
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#d4c3be]/80 max-w-md mx-auto">
                {gameState === 'planted' 
                  ? "Now, press and hold anywhere on the screen to shower the seed with warmth and watch it bloom."
                  : "Keep holding! The warm light of your care is causing the stem of support to sprout."
                }
              </p>

              {/* Progress Indicator */}
              <div className="mt-6 max-w-xs mx-auto bg-[#34302c] h-1.5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="bg-gradient-to-r from-[#fe9162] to-[#ffdbd0] h-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="font-mono text-xs text-[#fe9162] mt-1">{Math.floor(progress)}% Nurtured</div>
            </motion.div>
          )}

          {gameState === 'bloomed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 max-w-md z-10 bg-[#34302c]/90 rounded-2xl border border-[#fe9162]/20 backdrop-blur-md shadow-2xl pointer-events-auto"
            >
              <div className="inline-flex p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
                <Sparkles size={24} className="animate-spin" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
                A Haven of Empathy has Bloomed
              </h2>
              <p className="font-sans text-sm text-[#d4c3be] leading-relaxed mb-6">
                Your action sowed a sanctuary. Project Ahsaaz turns this beautiful realization into hot meals, active dialogue, and restored human dignity.
              </p>
              <button
                onClick={onComplete}
                className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-[0_8px_24px_rgba(155,69,28,0.4)] cursor-pointer"
              >
                Enter Project Ahsaaz
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Growth Illustration via SVGs */}
        {gameState !== 'intro' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* The "Soil" indicator */}
            <div 
              className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/50 to-transparent border-t border-[#d4c3be]/5"
            />

            {/* Glowing Seed Spot */}
            <div
              className="absolute transition-all duration-300"
              style={{
                left: `${seedCoords.x}%`,
                top: `${seedCoords.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulsing Light Aura */}
              <motion.div
                animate={{
                  scale: isPressing ? [1, 2.5, 1.8] : [1, 1.3, 1],
                  opacity: isPressing ? [0.6, 0.9, 0.7] : [0.4, 0.7, 0.4],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute w-24 h-24 rounded-full bg-radial from-[#fe9162] to-transparent -translate-x-1/2 -translate-y-1/2"
              />

              {/* Seed dot */}
              <motion.div
                className="w-4 h-4 rounded-full bg-[#ffb598] border border-white shadow-[0_0_15px_#fe9162] relative z-10"
                animate={isPressing ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />

              {/* Growing Vine Stem */}
              {progress > 0 && (
                <svg
                  className="absolute bottom-2 overflow-visible left-1/2 -translate-x-1/2"
                  width="120"
                  height="300"
                  viewBox="0 0 120 300"
                  style={{
                    transform: 'scaleY(-1) translateX(-50%)', // Grow upwards
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Stem path */}
                  <motion.path
                    d={`M 60 0 C ${60 + Math.sin(progress/5)*15} ${75 * (progress/100)} ${60 - Math.sin(progress/5)*15} ${150 * (progress/100)} 60 ${300 * (progress/100)}`}
                    fill="none"
                    stroke="#fe9162"
                    strokeWidth={isPressing ? "4" : "3"}
                    strokeDasharray="1000"
                    strokeDashoffset="0"
                    className="transition-all duration-300"
                  />

                  {/* Little sprouting leaves */}
                  {progress > 20 && (
                    <motion.path
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      d="M 60 60 Q 30 50 25 70 Q 45 80 60 60"
                      fill="#9b451c"
                    />
                  )}
                  {progress > 50 && (
                    <motion.path
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      d="M 60 140 Q 90 130 95 150 Q 75 160 60 140"
                      fill="#9b451c"
                    />
                  )}
                  {progress > 80 && (
                    <motion.path
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      d="M 60 220 Q 30 210 25 230 Q 45 240 60 220"
                      fill="#ffb598"
                    />
                  )}
                </svg>
              )}

              {/* Blooming Flower on top */}
              {progress >= 100 && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="absolute -translate-x-1/2"
                  style={{
                    bottom: '120px', // Matches stem height
                  }}
                >
                  {/* Glowing Lotus / Flower of Hope */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Petal layers */}
                    <div className="absolute w-12 h-12 rounded-full bg-[#9b451c]/80 border border-[#fe9162] rotate-0 transform origin-center scale-x-50" />
                    <div className="absolute w-12 h-12 rounded-full bg-[#9b451c]/80 border border-[#fe9162] rotate-45 transform origin-center scale-x-50" />
                    <div className="absolute w-12 h-12 rounded-full bg-[#9b451c]/80 border border-[#fe9162] rotate-90 transform origin-center scale-x-50" />
                    <div className="absolute w-12 h-12 rounded-full bg-[#9b451c]/80 border border-[#fe9162] rotate-135 transform origin-center scale-x-50" />
                    {/* Golden Core */}
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-[#fe9162] to-yellow-300 shadow-[0_0_20px_#fe9162] flex items-center justify-center">
                      <Sprout size={12} className="text-[#442a22]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Rising Sparkle Particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0.8, y: `${p.y}%`, x: `${p.x}%`, scale: 0.6 }}
                animate={{ opacity: 0, y: `${p.y - 40}%`, scale: 1.4 }}
                transition={{ duration: 2, ease: "easeOut", delay: p.delay }}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#fe9162] shadow-[0_0_6px_#ffdbd0]"
              />
            ))}
          </div>
        )}
      </div>

      {/* Guide Footer */}
      <footer className="relative z-10 w-full max-w-xl mx-auto text-center pb-4">
        <p className="font-sans text-xs text-[#d4c3be]/50">
          {gameState === 'intro' && "Select a point in the rich dark soil to plant the seed."}
          {(gameState === 'planted' || gameState === 'growing') && (isPressing ? "Showering warm compassion. Let it bloom..." : "Place your finger or mouse cursor, then PRESS AND HOLD to nurture.")}
          {gameState === 'bloomed' && "Click the button above to join the circle of empathy."}
        </p>
      </footer>
    </div>
  );
}
