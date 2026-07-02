import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Heart, Compass, Sparkles, RefreshCw } from 'lucide-react';
import { Signup } from '../types';

interface EmpathyGroveProps {
  signups: Signup[];
  onRefresh: () => void;
}

export default function EmpathyGrove({ signups, onRefresh }: EmpathyGroveProps) {
  const [selectedPlant, setSelectedPlant] = useState<Signup | null>(null);

  // Pre-seed mock values just in case no actual records exist yet, to avoid any empty state
  const defaultSignups: Signup[] = [
    {
      name: "Siddharth Nair",
      email: "sid@nair.com",
      message: "Empathy means waking up at 4 AM to brew ginger tea for elders in shelters.",
      reflection: "Siddharth, your ginger tea brews warmth both in cups and hearts. Waking up in the quiet dark shows a gentle courage that bridges physical hunger with beautiful, silent companionship.",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      name: "Aanya Verma",
      email: "aanya@verma.org",
      message: "I want to help design maps of locations with the highest rate of isolated seniors.",
      reflection: "Aanya, charting maps with data guides compassion to its exact coordinate. You are showing that empathy is both a feeling and a systematic, precise shield for those who are forgotten.",
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      name: "Devanshu Mehta",
      email: "dev@mehta.net",
      message: "Dignified starvation relief starts by serving meals in fine bone-china plates, not paper cups.",
      reflection: "Devanshu, replacing sterile charity with bone-china is a profound statement of equality. You are reminding us that eating is a ceremony of absolute dignity, not an act of pity.",
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ];

  const activeSignups = signups.length > 0 ? signups : defaultSignups;

  return (
    <section className="py-20 bg-white border-t border-[#e9e1dc]" id="impact-grove">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-full bg-[#fbf2ed] text-[#9b451c] mb-4">
            <Compass className="animate-spin-slow" size={24} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold mb-3">
            The Seed of Hope Grove
          </h2>
          <p className="font-sans text-sm md:text-base text-[#827470] max-w-xl mx-auto">
            Every signed-up volunteer plants a unique digital sprout in our shared empathy garden. Click on any seedling below to read their message and the AI-generated reflection!
          </p>

          <button
            onClick={onRefresh}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d4c3be] text-[#827470] hover:text-[#9b451c] hover:bg-[#fff8f5] text-xs font-mono transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw size={12} />
            <span>Sync Live Empathy Grove</span>
          </button>
        </div>

        {/* The Sprout garden grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center max-w-4xl mx-auto">
          {activeSignups.map((signup, i) => {
            // Determine sprout color based on name/length
            const isDefault = signups.length === 0;
            const delay = i * 0.1;
            const isSelected = selectedPlant?.name === signup.name && selectedPlant?.timestamp === signup.timestamp;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => setSelectedPlant(isSelected ? null : signup)}
                className={`flex flex-col items-center p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#ffdbce] border-[#9b451c] shadow-md' 
                    : 'bg-[#fff8f5] border-[#e9e1dc] hover:border-[#fe9162]/50 hover:shadow-sm'
                }`}
              >
                {/* Sprout Icon and animation */}
                <div className="relative mb-2">
                  <motion.div
                    animate={isSelected ? { rotate: [0, -8, 8, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`p-3 rounded-full ${
                      isSelected ? 'bg-[#9b451c] text-white' : 'bg-[#fbf2ed] text-[#9b451c]'
                    }`}
                  >
                    <Sprout size={24} />
                  </motion.div>
                  {/* Glowing star for real/new signups */}
                  {!isDefault && (
                    <div className="absolute -top-1 -right-1 bg-[#fe9162] text-white p-0.5 rounded-full">
                      <Sparkles size={8} />
                    </div>
                  )}
                </div>

                <span className="font-serif text-sm font-semibold text-[#442a22] text-center line-clamp-1">
                  {signup.name.split(' ')[0]}
                </span>
                <span className="text-[10px] font-mono text-[#827470] mt-0.5">
                  {new Date(signup.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Sprout Details Overlay / Slide in */}
        <AnimatePresence>
          {selectedPlant && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-2xl mx-auto mt-12 bg-[#fbf2ed] rounded-2xl p-6 md:p-8 border border-[#e9e1dc] relative shadow-lg"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 text-[#827470] hover:text-[#442a22] font-mono text-xs cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-2.5 rounded-full bg-[#9b451c] text-white">
                  <Heart className="fill-white" size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#442a22]">{selectedPlant.name}</h4>
                  <p className="text-xs font-mono text-[#827470]">Sowed Seed on {new Date(selectedPlant.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4 pt-3 border-t border-[#e9e1dc]">
                <div>
                  <h5 className="text-xs font-mono text-[#9b451c] uppercase font-bold tracking-wider mb-1">Empathetic Intent</h5>
                  <p className="font-sans text-sm text-[#504441] italic">
                    "{selectedPlant.message}"
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#e9e1dc]">
                  <h5 className="text-xs font-mono text-[#442a22] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles size={12} className="text-[#fe9162]" />
                    AI Guiding Spirit Reflection
                  </h5>
                  <p className="font-serif text-sm text-[#504441] leading-relaxed">
                    {selectedPlant.reflection}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
