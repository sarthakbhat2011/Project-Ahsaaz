import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Heart, Sparkles } from 'lucide-react';

interface PlainPreloaderProps {
  onComplete: () => void;
}

const calmingQuotes = [
  "Awakening silent empathy...",
  "Nourishing deep connections...",
  "Restoring human dignity, step by step..."
];

export default function PlainPreloader({ onComplete }: PlainPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Smooth loading progress simulation
  useEffect(() => {
    const duration = 2400; // 2.4 seconds total loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Update quotes during loading
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % calmingQuotes.length);
    }, 800);

    return () => clearInterval(quoteTimer);
  }, []);

  // When progress reaches 100%, trigger completion with a tiny delay for a smooth fade out transition
  useEffect(() => {
    if (progress >= 100) {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(completionTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#fff8f5] text-[#1e1b18] p-8 md:p-12 overflow-hidden select-none" id="plain-app-preloader">
      {/* Background radial ambient blur */}
      <div className="absolute inset-0 bg-radial from-[rgba(155,69,28,0.06)] via-transparent to-transparent pointer-events-none" />

      {/* Top Brand metadata */}
      <div className="w-full max-w-5xl mx-auto flex justify-between items-center relative z-10">
        <span className="font-serif text-sm font-semibold tracking-wide text-[#442a22]">Project Ahsaaz</span>
        <span className="font-mono text-[9px] tracking-widest text-[#827470] uppercase">Empathy Awakening</span>
      </div>

      {/* Centerpiece Pulsing Sprout Icon and Progress */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10">
        <div className="relative mb-8">
          {/* Pulsing ring aura */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-full bg-radial from-[#ffdbce] to-transparent blur-md"
          />

          <div className="w-16 h-16 rounded-full bg-[#fbf2ed] border border-[#efe6e2] flex items-center justify-center text-[#9b451c] shadow-sm relative z-10">
            <Sprout size={28} className="animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-[#442a22] font-bold tracking-tight mb-2 text-center"
        >
          Project Ahsaaz
        </motion.h1>

        {/* Dynamic, soothing message fade */}
        <div className="h-6 overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-sans text-xs md:text-sm text-[#827470] tracking-wide font-medium text-center italic"
            >
              {calmingQuotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Sleek Minimalist Loading Bar */}
        <div className="w-full max-w-xs bg-[#e9e1dc] h-1 rounded-full overflow-hidden relative border border-[#fff8f5]">
          <motion.div
            className="bg-gradient-to-r from-[#9b451c] to-[#fe9162] h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[10px] text-[#827470] mt-3 tracking-widest">{Math.round(progress)}%</span>
      </div>

      {/* Soothing Footer quote */}
      <div className="w-full max-w-md mx-auto text-center relative z-10">
        <p className="font-serif text-[11px] text-[#827470] leading-relaxed italic">
          "Ahsaaz is the moment your heart moves, and your hands follow."
        </p>
      </div>
    </div>
  );
}
