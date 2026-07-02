import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Heart, Users, MapPin, CheckCircle2, ChevronLeft, ChevronRight, 
  ExternalLink, Sparkles, Map, Leaf, Coffee, Smile, Star, ArrowRight, Home,
  Flame, Sun, Sprout, Share2, Eye
} from 'lucide-react';

interface GuideStep {
  title: string;
  tagline: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  animationType: 'radar' | 'nourish' | 'circles' | 'nodes';
  checklist: string[];
  actionTips: string[];
  bgImage: string;
}

export default function LocalityGuide({ isStandalone = false }: { isStandalone?: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse hover reaction for backdrop parallax glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const steps: GuideStep[] = [
    {
      title: "1. Locate & Coordinate Silent Distress",
      tagline: "EMPATHETIC VULNERABILITY MAPPING",
      description: "You cannot cure loneliness until you find it. In every street, there are elders or individuals living behind closed doors, struggling with illness or lack of warm companionship. Slowly walk your neighborhood to index these quiet doorsteps.",
      color: "from-orange-500 to-amber-500",
      icon: <MapPin className="text-[#9b451c]" size={24} />,
      animationType: 'radar',
      bgImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80", // quiet streets, golden dusk glow
      checklist: [
        "Take a slow, unhurried walk of your immediate residential block.",
        "Identify homes where elderly folks live alone or rarely step outside.",
        "Politely introduce yourself and share a warm, friendly gesture.",
        "Coordinate with nearby neighbors to catalog vulnerable contacts."
      ],
      actionTips: [
        "Tip: Do not ask intrusive questions. Start with simple gestures like checking on their well-being.",
        "Caution: Respect privacy but maintain consistent, daily observation of changes (e.g., mail piling up)."
      ]
    },
    {
      title: "2. Reclaim Dignity in Nourishment",
      tagline: "AESTHETIC HOSPITALITY & SUSTENANCE",
      description: "Charity must never feel like a cold transaction. When preparing or delivering meals, the presentation and materials represent your respect. Rebuild self-esteem with organic clay pots and personalized details.",
      color: "from-[#9b451c] to-[#fe9162]",
      icon: <Coffee className="text-[#9b451c]" size={24} />,
      animationType: 'nourish',
      bgImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80", // handmade pottery, clay bowls
      checklist: [
        "Prepare wholesome, nutritious meals (like warm lentil soups or regional grain bowls).",
        "Pack meals using reusable earthen pots or fine ceramics—banish paper plates and plastic trays.",
        "Add a personalized, hand-written note wishing them deep peacefulness.",
        "Deliver at consistent, reliable hours to build a rhythm of security."
      ],
      actionTips: [
        "Tip: Source fresh, organic ingredients from local growers to support community micro-economies.",
        "Dignity Rule: Never photograph the recipient or make them feel like an object of pity."
      ]
    },
    {
      title: "3. Host Unhurried Listening Gatherings",
      tagline: "EMPATHETIC CIRCLES & DEEP STORYTELLING",
      description: "Mental and emotional isolation is as painful as physical starvation. Hold deep, therapeutic listening sessions on doorsteps where elders can share historic memories without feeling rushed.",
      color: "from-amber-500 to-yellow-500",
      icon: <Smile className="text-[#9b451c]" size={24} />,
      animationType: 'circles',
      bgImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80", // peaceful companion interaction, hands holding, elder
      checklist: [
        "Schedule a comfortable 45-minute sitting window on their porch or doorstep.",
        "Remove all distractions—fully turn off your cellular devices.",
        "Prompt gentle memory-sharing by asking open-ended questions about their youth.",
        "Actively listen to understand, not to answer or give quick advice."
      ],
      actionTips: [
        "Tip: Sitting at the exact eye level or on the same rug breaks down subconscious power dynamics.",
        "Listening Mantra: 'Your stories have infinite value to our community.'"
      ]
    },
    {
      title: "4. Mobilize Mutual Action Networks",
      tagline: "COMMUNITY-HELD CO-CREATIVE SANCTUARY",
      description: "One volunteer is a blessing, but a neighborhood network is a durable shield. Link neighbors, local youths, and community leaders together into a permanent care shift.",
      color: "from-cyan-500 to-[#9b451c]",
      icon: <Users className="text-[#9b451c]" size={24} />,
      animationType: 'nodes',
      bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80", // mutual community help, laughing together outdoors
      checklist: [
        "Create a simple local communication loop (like a chat group or pinboard).",
        "Establish rotating shifts for groceries, medicine runs, and weekend chats.",
        "Enlist local youths to teach elders basic digital connection tools.",
        "Pool tiny community contributions (micro-donations) to cover emergency medical bills."
      ],
      actionTips: [
        "Tip: Involve the elders in organizing. Their years of wisdom are the community's greatest resource.",
        "Sustainability Rule: Consistency beats scale. A tiny group caring for 3 elders permanently is a triumph."
      ]
    }
  ];

  const handleToggleCheck = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const currentStepChecklist = steps[currentStep].checklist;
  const completedCount = currentStepChecklist.filter(item => checkedItems[item]).length;
  const stepProgressPercentage = (completedCount / currentStepChecklist.length) * 100;

  return (
    <div className={`w-full relative overflow-hidden ${isStandalone ? 'min-h-screen bg-[#fffcfb] py-12 px-4 md:px-8' : 'py-6'}`}>
      
      {/* RICH CROSS-FADING BACKGROUND IMAGES FOR THE ACTIVE STEPS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={steps[currentStep].bgImage} 
              alt="Sanctuary Field Context" 
              className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-110"
              referrerPolicy="no-referrer"
            />
            {/* Soft Warm overlay and glass blur mask */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#120a08]/90 via-[#fffbf9]/85 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 backdrop-blur-[4px]" />
          </motion.div>
        </AnimatePresence>

        {/* NON-STOP AMBIENT ORBITING LIGHT GLOWS (Interactive with user movement) */}
        <motion.div 
          animate={{ 
            x: [mousePos.x - 20, mousePos.x + 20, mousePos.x - 20],
            y: [mousePos.y + 40, mousePos.y - 40, mousePos.y + 40],
            rotate: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#fe9162]/15 via-amber-300/10 to-transparent blur-3xl"
        />

        <motion.div 
          animate={{ 
            x: [mousePos.x + 30, mousePos.x - 30, mousePos.x + 30],
            y: [mousePos.y - 30, mousePos.y + 30, mousePos.y - 30],
            rotate: [360, 0],
            scale: [1.1, 0.9, 1.1]
          }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#9b451c]/15 via-orange-400/10 to-transparent blur-3xl"
        />

        {/* Dynamic micro particles drifting continuously in the background */}
        <div className="absolute inset-0 z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 1200, 
                y: Math.random() * 900 + 100, 
                opacity: Math.random() * 0.4 + 0.1 
              }}
              animate={{ 
                y: [-50, 1000], 
                x: [0, (Math.random() - 0.5) * 80, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 15 + 20, 
                ease: 'linear',
                delay: i * -2 
              }}
              className="absolute text-[#9b451c]/25 select-none pointer-events-none text-sm font-serif"
            >
              🌱
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Standalone Navigation/Back Header */}
        {isStandalone && (
          <div className="flex justify-between items-center border-b border-[#e9e1dc]/60 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-black tracking-tight text-[#442a22]">Project <span className="text-[#9b451c]">Ahsaaz</span></span>
                <span className="text-[10px] font-mono uppercase text-[#9b451c] tracking-widest font-extrabold flex items-center gap-1">
                  <Compass size={10} className="animate-spin-slow" /> Locality Care Protocol Manual
                </span>
              </div>
            </div>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/80 border border-[#efe6e2] text-xs font-mono font-bold text-[#504441] hover:bg-white shadow-sm transition-all hover:scale-103 cursor-pointer"
            >
              <Home size={14} className="text-[#9b451c]" />
              <span>Back to Home Portal</span>
            </a>
          </div>
        )}

        {/* GLOSSY INTRO HEADER CARD - HIGHER VIBRANCY & INTERACTIVE PARALLAX */}
        <motion.div 
          style={{ transform: `translate3d(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px, 0)` }}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] text-center space-y-5 shadow-[0_20px_50px_rgba(155,69,28,0.06)] border border-white/60 relative overflow-hidden group"
        >
          {/* Subtle background context indicator inside the header card */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-b from-[#fe9162]/10 to-transparent pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-[#9b451c] text-[10px] font-mono tracking-widest uppercase font-extrabold border border-amber-200/50 shadow-2xs">
            <Sparkles size={12} className="animate-spin-slow text-amber-500" />
            <span>Interactive Grassroots Activator</span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-5xl text-[#442a22] font-black tracking-tight leading-none">
            Heal Your Locality
          </h1>
          
          <p className="font-sans text-xs md:text-sm text-[#504441] max-w-2xl mx-auto leading-relaxed">
            Empathy is not a sentiment; it is a physical craft. This step-by-step interactive manual empowers you with real, actionable protocols to dissolve extreme isolation and hunger right inside your own neighborhood.
          </p>

          {/* Quick Progress Indicator */}
          <div className="flex justify-center items-center gap-3 pt-3">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`group relative h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentStep === idx 
                    ? 'w-14 bg-[#9b451c]' 
                    : idx < currentStep 
                      ? 'w-3.5 bg-emerald-500' 
                      : 'w-3.5 bg-[#e9e1dc] hover:bg-[#d4c3be]'
                }`}
                title={`Step ${idx + 1}`}
                type="button"
              >
                {/* Micro tooltip label for each step dot */}
                <span className="absolute -top-8 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#442a22] text-white font-mono text-[9px] px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap shadow-md">
                  Step 0{idx + 1} // {step.tagline.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* MAIN INTERACTIVE STEP DECK CARD - WITH FLOATING GLASS EFFECT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white/75 shadow-[0_30px_70px_rgba(68,42,34,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative"
          >
            {/* Neon active outline badge on the container */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#fe9162] via-[#9b451c] to-amber-500" />
            
            {/* LEFT COLUMN: Animated Interactive Visual Sandbox */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#fffaf8]/80 to-[#fdf4f0]/90 p-8 md:p-10 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#e9e1dc]/50 relative">
              <div className="absolute inset-0 retro-grid opacity-15 pointer-events-none" />
              
              <div className="w-full text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffeedc] text-[#9b451c] text-[9px] font-mono font-extrabold uppercase tracking-wider shadow-2xs border border-[#ffdbb5]/60 mb-3">
                  <Sun size={10} className="animate-spin-slow text-[#fe9162]" />
                  <span>{steps[currentStep].tagline}</span>
                </div>
                <div className="flex items-center gap-3.5 mt-2 justify-center md:justify-start">
                  <div className="p-3.5 bg-white rounded-2xl shadow-md border border-[#efe6e2] transform hover:rotate-6 transition-transform">
                    {steps[currentStep].icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#442a22]">
                    Step 0{currentStep + 1} <span className="text-[#827470] text-sm block font-sans">of 04 Core Protocols</span>
                  </h3>
                </div>
              </div>

              {/* DYNAMIC PROCEDURAL ANIMATIONS (Vibrant continuously running interactive panels) */}
              <div className="w-full h-56 my-6 flex items-center justify-center relative bg-white/70 rounded-3xl border border-[#efe6e2] shadow-inner overflow-hidden group">
                {/* Background active image watermarked inside canvas */}
                <div className="absolute inset-0 opacity-10 scale-105 group-hover:scale-100 transition-transform duration-700">
                  <img src={steps[currentStep].bgImage} alt="" className="w-full h-full object-cover filter saturate-150" referrerPolicy="no-referrer" />
                </div>
                
                {/* 1. RADAR SCANNER ANIMATION */}
                {steps[currentStep].animationType === 'radar' && (
                  <div className="relative w-40 h-40 flex items-center justify-center z-10">
                    <div className="absolute inset-0 rounded-full border border-[#9b451c]/15 animate-pulse" />
                    <div className="absolute inset-5 rounded-full border border-[#9b451c]/25" />
                    <div className="absolute inset-12 rounded-full border border-[#9b451c]/35" />
                    
                    {/* Rotating Radar Line */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#9b451c]/25 to-transparent"
                    />

                    {/* Highlighted Coordinates */}
                    <div className="absolute top-5 left-7 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                    <div className="absolute top-5 left-7 w-3 h-3 bg-[#9b451c] rounded-full shadow-[0_0_10px_#9b451c]" />
                    
                    <div className="absolute bottom-12 right-5 w-3.5 h-3.5 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-12 right-5 w-3.5 h-3.5 bg-[#fe9162] rounded-full shadow-[0_0_10px_#fe9162]" />

                    {/* Infinite rotating navigation compass in center */}
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                      className="text-4xl filter drop-shadow-md cursor-pointer hover:scale-110 transition-transform"
                    >
                      🧭
                    </motion.div>
                  </div>
                )}

                {/* 2. NOURISHMENT PLATING ANIMATION */}
                {steps[currentStep].animationType === 'nourish' && (
                  <div className="relative flex flex-col items-center justify-center gap-2 z-10">
                    {/* Steam bubbles rising */}
                    <div className="flex gap-3 mb-2">
                      {[0, 0.3, 0.6, 0.9].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [10, -45], opacity: [0, 0.9, 0], scale: [0.6, 1.4, 0.6] }}
                          transition={{ repeat: Infinity, duration: 2.2, delay, ease: 'easeOut' }}
                          className="w-2.5 h-5 bg-[#fe9162]/40 rounded-full blur-[1px]"
                        />
                      ))}
                    </div>

                    {/* Earthen Bowl floating continuously */}
                    <motion.div 
                      animate={{ 
                        y: [0, -6, 0],
                        rotate: [-1, 2, -1]
                      }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                      className="relative w-32 h-18 bg-[#a04e25] rounded-b-[2.5rem] border-t-[8px] border-[#9b451c] flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing hover:brightness-105"
                    >
                      {/* Grains Porridge Level */}
                      <div className="absolute inset-x-2 top-0 h-3 bg-amber-100 rounded-b-xl" />
                      <div className="absolute -top-3 text-3xl">🍲</div>
                    </motion.div>

                    {/* Premium Ceramic Underplate */}
                    <div className="w-40 h-3.5 bg-gradient-to-r from-amber-500/10 via-amber-200/50 to-amber-500/10 rounded-full shadow-md border-t border-white" />
                  </div>
                )}

                {/* 3. LISTENING RESONANCE ANIMATION (Vibrant dialogue waves) */}
                {steps[currentStep].animationType === 'circles' && (
                  <div className="relative flex items-center justify-center gap-10 z-10 w-full px-4">
                    
                    {/* Elder */}
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <div className="text-4xl filter drop-shadow-md">👵</div>
                      <span className="text-[9px] font-mono text-[#9b451c] font-bold bg-[#ffdbce]/50 px-2 py-0.5 rounded-md">Elderly Soul</span>
                    </motion.div>

                    {/* Infinite radiating voice wave circles */}
                    <div className="relative flex items-center justify-center h-14 w-16 shrink-0">
                      {[1, 2, 3, 4].map((idx) => (
                        <motion.div
                          key={idx}
                          animate={{ scale: [0.5, 1.8], opacity: [0.95, 0] }}
                          transition={{ repeat: Infinity, duration: 2.4, delay: idx * 0.6, ease: 'easeOut' }}
                          className="absolute w-12 h-12 rounded-full border-2 border-[#9b451c]/50"
                        />
                      ))}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Heart className="text-[#9b451c] fill-[#9b451c]/20" size={24} />
                      </motion.div>
                    </div>

                    {/* Active Listener */}
                    <motion.div 
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: 'easeInOut' }}
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <div className="text-4xl filter drop-shadow-md">🤝</div>
                      <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Listener</span>
                    </motion.div>

                  </div>
                )}

                {/* 4. MUTUAL CARE CONSTELLATION NODES */}
                {steps[currentStep].animationType === 'nodes' && (
                  <div className="relative w-44 h-44 z-10">
                    {/* Connected Network Dots with sparkles */}
                    <svg className="absolute inset-0 w-full h-full" overflow="visible">
                      <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="#fe9162" strokeWidth="1.5" strokeDasharray="4" className="animate-pulse" />
                      <line x1="20%" y1="20%" x2="50%" y2="80%" stroke="#9b451c" strokeWidth="1.5" strokeDasharray="4" />
                      <line x1="80%" y1="20%" x2="50%" y2="80%" stroke="#9b451c" strokeWidth="1.5" strokeDasharray="4" />
                      <line x1="50%" y1="80%" x2="50%" y2="40%" stroke="#fe9162" strokeWidth="2.5" />
                    </svg>

                    {/* Pulsing rotating node signals */}
                    {[
                      { top: '20%', left: '20%', label: 'Medicines', emoji: "🩺" },
                      { top: '20%', left: '80%', label: 'Food Box', emoji: "🍱" },
                      { top: '80%', left: '50%', label: 'Presence', emoji: "🗣️" },
                      { top: '40%', left: '50%', label: 'Sanctuary', emoji: "💖" }
                    ].map((node, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.15, 1],
                          y: [0, i % 2 === 0 ? -3 : 3, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.4 }}
                        className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white border border-[#efe6e2] shadow-lg flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-[#fe9162] transition-colors"
                        style={{ top: node.top, left: node.left }}
                      >
                        <span className="text-lg">
                          {node.emoji}
                        </span>
                        <span className="text-[6.5px] font-mono uppercase font-black text-[#504441] tracking-wider">{node.label}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

              </div>



            </div>

            {/* RIGHT COLUMN: Protocols, Interactive Checklists & Practical Tips */}
            <div className="md:col-span-7 p-8 md:p-10 space-y-7 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fe9162] animate-ping" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#9b451c] uppercase">Neighborhood Action Protocol</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#442a22] font-black tracking-tight leading-none">
                  {steps[currentStep].title}
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                  {steps[currentStep].description}
                </p>

                {/* INTERACTIVE CHECKLIST */}
                <div className="space-y-3 pt-3">
                  <span className="text-[10px] font-mono text-[#827470] uppercase font-extrabold tracking-widest block border-b border-[#f5ece7] pb-1.5">
                    Interactive Field Protocol (Check as you complete):
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {steps[currentStep].checklist.map((item, idx) => {
                      const isChecked = !!checkedItems[item];
                      return (
                        <button
                          key={idx}
                          onClick={() => handleToggleCheck(item)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center gap-3.5 cursor-pointer hover:translate-x-1 duration-200 ${
                            isChecked 
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold shadow-xs' 
                              : 'bg-white border-[#efe6e2] text-[#442a22] hover:border-[#9b451c]/40 hover:shadow-xs'
                          }`}
                          type="button"
                        >
                          <CheckCircle2 size={18} className={isChecked ? 'text-emerald-600 fill-emerald-100 shrink-0 animate-bounce' : 'text-[#d4c3be] shrink-0'} />
                          <span className="leading-normal">{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ACTION TIPS PANEL */}
              <div className="p-5 bg-[#fff8f5] rounded-3xl border border-[#efe6e2]/80 space-y-2 shadow-2xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#fe9162]/5 rounded-bl-full pointer-events-none" />
                <span className="text-[10px] font-mono text-[#9b451c] uppercase font-extrabold tracking-widest block flex items-center gap-1">
                  <Leaf size={10} className="text-[#fe9162]" /> Ahsaaz Field Advice:
                </span>
                {steps[currentStep].actionTips.map((tip, index) => (
                  <p key={index} className="text-[11px] md:text-xs text-[#504441] font-serif italic leading-relaxed">
                    {tip}
                  </p>
                ))}
              </div>

              {/* ACTION ROW BUTTONS */}
              <div className="flex justify-between items-center pt-5 border-t border-[#f5ece7]">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-5 py-3 border border-[#efe6e2] bg-white rounded-2xl text-[10px] font-mono font-bold uppercase tracking-wider text-[#504441] hover:bg-[#fff8f5] disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs"
                  type="button"
                >
                  <ChevronLeft size={14} />
                  <span>Prev Step</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-6 py-3 bg-[#442a22] text-white rounded-2xl text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-black cursor-pointer flex items-center gap-1.5 transition-all hover:scale-103 shadow-md"
                    type="button"
                  >
                    <span>Next Step</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowSuccessBanner(true);
                      if (!isStandalone) {
                        const el = document.getElementById('sandbox-creator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-6 py-3 bg-[#9b451c] text-white rounded-2xl text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#b04f20] cursor-pointer flex items-center gap-1.5 transition-all hover:scale-103 shadow-lg"
                    type="button"
                  >
                    <span>Complete Manual</span>
                    <Star size={14} className="text-amber-300 fill-amber-300 animate-spin-slow" />
                  </button>
                )}
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* CUSTOM IN-PAGE SUCCESS BANNER WITH RADICAL GLOW */}
        <AnimatePresence>
          {showSuccessBanner && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.95 }}
              className="p-8 bg-gradient-to-r from-emerald-500 via-[#9b451c] to-amber-500 text-white rounded-[2rem] space-y-5 shadow-2xl border border-white/20 relative overflow-hidden"
            >
              {/* Vibrant glowing core */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-mono tracking-widest uppercase font-extrabold shadow-sm">
                    <Sparkles size={11} className="animate-spin-slow" />
                    Protocol Mastery Completed
                  </div>
                  <h4 className="font-serif text-2xl font-black tracking-tight">✨ Magnificent! Protocol Fully Engaged</h4>
                  <p className="font-sans text-xs md:text-sm text-white/90 leading-relaxed max-w-2xl">
                    You have successfully completed the neighborhood action protocol walk-through! This framework is actively deployed in our neighborhood pilot circles across India. Share your live logs or post your street plans in our co-creative sandbox below.
                  </p>
                </div>
                <button 
                  onClick={() => setShowSuccessBanner(false)}
                  className="bg-white text-[#9b451c] hover:bg-white/90 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider cursor-pointer shadow-md transition-transform active:scale-95 shrink-0"
                  type="button"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROMPT ACTION BLOCK WITH GRAPHIC BACKGROUND WRAPPING */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 text-center space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe6e2]/10 via-[#efe6e2]/20 to-[#efe6e2]/10 pointer-events-none" />
          <h4 className="font-serif text-base font-extrabold text-[#442a22] flex items-center justify-center gap-2">
            <Sprout size={16} className="text-[#9b451c] animate-bounce" /> 
            <span>Empathy is a Decentralized Force</span>
          </h4>
          <p className="font-sans text-xs text-[#504441] leading-relaxed max-w-2xl mx-auto">
            You don't need a heavy central office or immense wealth to start. A single clay plate, a warm bowl of grains, and 30 minutes of uninterrupted listening are enough to anchor a soul. Start with one street today.
          </p>
          
          {!isStandalone && (
            <a 
              href="?mode=guide" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#9b451c] text-white rounded-2xl text-[10px] font-mono font-extrabold uppercase tracking-wider hover:bg-[#b04f20] hover:shadow-lg transition-all cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Open Protocol Guide in Fullscreen Tab</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
