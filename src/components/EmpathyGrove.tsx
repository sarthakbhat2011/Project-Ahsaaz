import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Heart, Compass, Sparkles, RefreshCw, Trash2 } from 'lucide-react';
import { Signup } from '../types';

interface EmpathyGroveProps {
  signups: Signup[];
  onRefresh: () => void;
  isDeveloper?: boolean;
}

export default function EmpathyGrove({ signups, onRefresh, isDeveloper }: EmpathyGroveProps) {
  const [selectedPlant, setSelectedPlant] = useState<Signup | null>(null);

  const handleDeleteSprout = async (signup: Signup, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Developer Authority: Are you sure you want to delete the sprout entry for "${signup.name}" from the Seed of Hope Grove?`)) return;

    try {
      const devToken = localStorage.getItem('project_ahsaaz_dev_token');
      const response = await fetch(`/api/signups/${encodeURIComponent(signup.timestamp)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${devToken || ''}`
        }
      });

      if (response.ok) {
        if (selectedPlant?.timestamp === signup.timestamp) {
          setSelectedPlant(null);
        }
        onRefresh();
      }
    } catch (err) {
      console.error("Error deleting sprout entry:", err);
    }
  };

  return (
    <section className="py-20 bg-white border-t border-[#e9e1dc]" id="impact-grove">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-full bg-[#fbf2ed] text-[#9b451c] mb-4">
            <Compass className="animate-spin-slow" size={24} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold mb-3">
            The Seed of Hope Grove
          </h2>
          <p className="font-sans text-sm md:text-base text-[#827470] max-w-xl mx-auto">
            Every signed-up volunteer plants a unique digital sprout in our shared empathy garden. Click on any seedling below to read their message and the AI-generated reflection!
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d4c3be] text-[#827470] hover:text-[#9b451c] hover:bg-[#fff8f5] text-xs font-mono transition-all cursor-pointer shadow-xs"
            >
              <RefreshCw size={12} />
              <span>Sync Live Empathy Grove</span>
            </button>

            {isDeveloper && (
              <span className="text-[10px] font-mono text-[#9b451c] font-bold bg-[#ffdbce]/50 px-3 py-1.5 rounded-2xl border border-[#9b451c]/30">
                ⚡ Developer Sprout Deletion Authority Active
              </span>
            )}
          </div>
        </div>

        {/* The Sprout garden grid */}
        {signups.length === 0 ? (
          <div className="text-center py-12 px-6 bg-[#fff8f5] rounded-3xl border border-[#e9e1dc] max-w-xl mx-auto space-y-3 shadow-xs">
            <div className="inline-flex p-3 rounded-full bg-[#fbf2ed] text-[#9b451c]">
              <Sprout size={28} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#442a22]">The Seed of Hope Grove is Ready to Bloom</h3>
            <p className="text-xs text-[#827470] leading-relaxed max-w-md mx-auto">
              No volunteer seeds have been planted in this garden yet. Be the first hand of support to submit your assessment on the <strong className="text-[#9b451c]">Join Us</strong> page!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center max-w-4xl mx-auto">
            {signups.map((signup, i) => {
              const delay = i * 0.05;
              const isSelected = selectedPlant?.name === signup.name && selectedPlant?.timestamp === signup.timestamp;

              return (
                <motion.div
                  key={signup.timestamp || i}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPlant(isSelected ? null : signup)}
                  className={`flex flex-col items-center p-4 rounded-2xl border cursor-pointer transition-all relative group/sprout ${
                    isSelected 
                      ? 'bg-[#ffdbce] border-[#9b451c] shadow-md' 
                      : 'bg-[#fff8f5] border-[#e9e1dc] hover:border-[#fe9162]/50 hover:shadow-sm'
                  }`}
                >
                  {/* Developer Delete Icon */}
                  {isDeveloper && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSprout(signup, e)}
                      className="absolute top-2 right-2 text-[#827470] hover:text-red-500 transition-colors p-1 rounded hover:bg-white/80 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover/sprout:opacity-100"
                      title="Delete sprout entry (Developer)"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}

                  {/* Sprout Icon */}
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
                    <div className="absolute -top-1 -right-1 bg-[#fe9162] text-white p-0.5 rounded-full">
                      <Sparkles size={8} />
                    </div>
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
        )}

        {/* Sprout Details Overlay / Slide in */}
        <AnimatePresence>
          {selectedPlant && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-2xl mx-auto mt-12 bg-[#fbf2ed] rounded-2xl p-6 md:p-8 border border-[#e9e1dc] relative shadow-lg"
            >
              {/* Close & Delete buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-3">
                {isDeveloper && (
                  <button
                    onClick={(e) => handleDeleteSprout(selectedPlant, e)}
                    className="text-xs font-mono text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer bg-red-100 px-2.5 py-1 rounded-lg border border-red-200"
                  >
                    <Trash2 size={12} />
                    <span>Delete Sprout (Dev)</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="text-[#827470] hover:text-[#442a22] font-mono text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

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
