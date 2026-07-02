import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Heart, Sparkles, MapPin, Activity, Wind, Soup, Bookmark, Check, Send, ShieldAlert, Sparkle, Eye, Compass } from 'lucide-react';

export default function BentoGrid() {
  // 1. Starvation Relief State (converted entirely to high-dignity care hours pledged)
  const [pledgeHours, setPledgeHours] = useState(15); // Default 15 hours of care actions monthly

  // 2. Artisanal Sourcing Calculator State
  const [earthenBowls, setEarthenBowls] = useState(250);
  const [isEarthenPledged, setIsEarthenPledged] = useState(false);

  // 3. Preparation Sandbox Tab State
  const [activeSandboxTab, setActiveSandboxTab] = useState<'meals' | 'map' | 'breath'>('meals');

  // Interactive Meal Composer State
  const [selectedGrain, setSelectedGrain] = useState<'basmati' | 'dalia' | 'millet'>('basmati');
  const [selectedStew, setSelectedStew] = useState<'rajma' | 'dal' | 'vegetable'>('dal');
  const [selectedAroma, setSelectedAroma] = useState<'ghee' | 'turmeric' | 'coriander'>('ghee');
  const [selectedBlessing, setSelectedBlessing] = useState(0);
  const [isAssembling, setIsAssembling] = useState(false);
  const [assemblyComplete, setAssemblyComplete] = useState(false);

  const blessings = [
    "Dignity is your eternal birthright.",
    "A friend is here, walking beside you.",
    "You are loved, valued, and remembered."
  ];

  // Vulnerability Illuminator Map State (national pre-stage pilot homes)
  const [illuminatedHomes, setIlluminatedHomes] = useState<number[]>([]);
  const [activeHomeIndex, setActiveHomeIndex] = useState<number | null>(null);

  // Wisdom Spheres and Philosophy Compass (Replacing simulated/non-genuine names)
  const pilotHomes = [
    { 
      name: "Silence & Companioning", 
      area: "The Art of Listening", 
      desc: "Attention is the rarest and purest form of generosity. When sitting on an elder's porch, completely switch off your phone. Enter their silence before trying to fill it with your words.", 
      need: "Uninterrupted quiet listening assess sessions" 
    },
    { 
      name: "Absolute Human Dignity", 
      area: "Radical Hospitality", 
      desc: "The worst poverty is loneliness and the feeling of being unloved. Serve nourishing meals in native clay pots or fine reusable ceramics. Banish thin single-use plastic boxes.", 
      need: "Earthenware co-dining plate setup" 
    },
    { 
      name: "The Warm Threshold", 
      area: "Authentic Footprints", 
      desc: "You give but little when you give of your possessions. It is when you give of yourself that you truly give. Introduce yourself by name, not as an impersonal donor, but as a friendly neighbor.", 
      need: "Unrushed doorstep threshold greetings" 
    },
    { 
      name: "Earthen Alliance", 
      area: "Heritage Sourcing", 
      desc: "Keep your heart unhurried; the guest you seek is closer than your breath. Collaborate with local clay-potters across our regional outskirts to handcraft biodegradable porridge bowls, supporting traditional artisans.", 
      need: "Grassroots clay-potter sourcing alliances" 
    },
    { 
      name: "Sowing Compassion", 
      area: "The Root of Service", 
      desc: "I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy. A single plate and 30 minutes of deep presence can completely anchor an isolated soul.", 
      need: "Doorstep companionship care walks" 
    },
    { 
      name: "Mutual Care Shields", 
      area: "The Neighbor Shield", 
      desc: "The first duty of love is to listen. Link three local neighbors into a permanent rotating care shift. Consistency beats scale. Sourcing care for three elders permanently is a complete triumph.", 
      need: "3-Neighbor collaborative care networks" 
    }
  ];

  // Silent Companion Breath Connection State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold-out'>('inhale');
  const [breathScale, setBreathScale] = useState(1);



  // Run the breath cycle animation logic when active
  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % 4;
        if (step === 0) {
          setBreathPhase('inhale');
          setBreathScale(1.4);
        } else if (step === 1) {
          setBreathPhase('hold');
          setBreathScale(1.4);
        } else if (step === 2) {
          setBreathPhase('exhale');
          setBreathScale(0.95);
        } else {
          setBreathPhase('hold-out');
          setBreathScale(0.95);
        }
      }, 4000); // 4 seconds per phase
      
      // Start initial
      setBreathPhase('inhale');
      setBreathScale(1.4);
    } else {
      setBreathScale(1.0);
      setBreathPhase('inhale');
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  // Handle assembly animation
  const startMealAssembly = () => {
    setIsAssembling(true);
    setAssemblyComplete(false);
    setTimeout(() => {
      setIsAssembling(false);
      setAssemblyComplete(true);
    }, 2500);
  };

  const handleIlluminate = (index: number) => {
    if (!illuminatedHomes.includes(index)) {
      setIlluminatedHomes(prev => [...prev, index]);
    }
  };

  // Care and Listening hours calculations:
  const getPledgeImpactMessage = () => {
    if (pledgeHours <= 5) {
      return `This will support hand-stenciling custom care boxes and packing organic grain kits for our community pilot coordinates, providing initial unhurried dignity.`;
    } else if (pledgeHours <= 15) {
      return `This funds unhurried doorstep visits, allowing you to sit with isolated elders to offer warm, attentive active-listening sessions.`;
    } else if (pledgeHours <= 35) {
      return `This enables deep-mapping neighborhood walks, indexing forgotten doors and linking nearby households into a permanent, rotating care shift.`;
    } else {
      return `This anchors an entire local compassion hub, allowing you to coordinate regional clay potters, lead volunteer listening practice circles, and secure multi-neighborhood alliances.`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-fade-in" id="work">
      
      {/* 1. Pre-Stage Starvation Relief Card (8 Columns) - Completely Converted to High-Dignity Pledges */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#e9e1dc] shadow-[0_10px_40px_-10px_rgba(68,42,34,0.06)] relative overflow-hidden group flex flex-col justify-between min-h-[500px]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB140qtVjfSBDuq8zaJInJEnUf-kuTfLOl5L06KhG7oh20R-798iUxZuxHas1jwmCHVOxd7bd5wWqO_rIhizCppQ-XeC7F9d9YInD_OyU6M7gY1zS3wpjJmGegFu4kJEweLFZYKOo5oDl7hoFjacY4c7e7IuX4D7u7vXZP8crxScdpZWlZCtVBsd20eG2UXcT68M6v934MTrnObpP5g3dri19qmysRqkZEispLxHR5gLd44_VaSIZtiH4MKpDlo0pBLJSdgaF6c0qI"
            alt="Warm dignified meal distribution in India"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.05] group-hover:opacity-[0.09] transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#ffdbd0] flex items-center justify-center text-[#9b451c]">
              <Utensils size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#fbf2ed] text-[#9b451c] text-xs font-mono font-medium tracking-wide flex items-center gap-1">
              <Sparkle size={12} className="animate-pulse" />
              Pre-Stage Target Pilot Sourcing
            </span>
          </div>

          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#442a22] font-semibold mb-3">
              Starvation Relief &amp; Care (Pilot Prep)
            </h3>
            <p className="font-sans text-sm text-[#504441] max-w-xl leading-relaxed">
              We are preparing our first local compassion-sourcing network across various Indian community circles. Instead of cold, transactional handouts, we are sourcing pure copper pots and brassware plates to serve hot, nutrition-rich meals with dedicated companion circles.
            </p>
          </div>

          {/* Interactive Care Hours Impact Slider */}
          <div className="bg-[#fff8f5] rounded-2xl p-5 border border-[#efe6e2] max-w-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-[#827470] uppercase font-bold tracking-wider">Compassion &amp; Listening Pledge (Hours/Month)</span>
              <span className="font-serif text-xl font-bold text-[#9b451c]">{pledgeHours} Hours / Month</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={pledgeHours}
              onChange={(e) => setPledgeHours(Number(e.target.value))}
              className="w-full accent-[#9b451c] cursor-pointer h-1.5 bg-[#e9e1dc] rounded-lg appearance-none focus:outline-none"
            />
            
            {/* Impact Calculation Info */}
            <div className="mt-4 pt-4 border-t border-[#e9e1dc]/60 space-y-2">
              <p className="text-xs font-mono text-[#827470] uppercase font-semibold">Your Projected Companion Impact:</p>
              <p className="text-sm text-[#442a22] font-medium leading-relaxed italic">
                "{getPledgeImpactMessage()}"
              </p>
            </div>
          </div>
        </div>

        {/* Pre-Stage Roadmap Milestone */}
        <div className="relative z-10 mt-6 pt-4 border-t border-[#e9e1dc]/40">
          <div className="flex justify-between items-center text-xs text-[#827470] mb-2 font-mono">
            <span>Pilot Care Hub Prep Progress</span>
            <span className="text-[#9b451c] font-bold">Planning Phase // Gathering Hearts</span>
          </div>
          <div className="w-full bg-[#f5ece7] rounded-full h-2 overflow-hidden border border-[#efe6e2]">
            <motion.div
              initial={{ width: "15%" }}
              animate={{ width: "35%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="bg-gradient-to-r from-[#9b451c] to-[#fe9162] h-full rounded-full"
            />
          </div>
          <p className="text-[11px] text-[#827470] mt-2 italic flex items-center gap-1.5">
            <ShieldAlert size={12} className="text-[#fe9162]" />
            We have not served meals yet. We are completely in our pre-stage, securing supplies and volunteers.
          </p>
        </div>
      </div>

      {/* 2. Biodegradable Sourcing Card (4 Columns) */}
      <div className="lg:col-span-4 bg-[#ffdbce] rounded-3xl p-6 border border-[#e9e1dc] shadow-[0_10px_40px_-10px_rgba(68,42,34,0.06)] flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-[#7c2e05]">
              <Soup size={24} className="text-[#7c2e05]" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono tracking-wide text-[#7c2e05]/80 uppercase font-bold">Zero-Plastic Initiative</span>
              {isEarthenPledged && (
                <button
                  type="button"
                  onClick={() => setIsEarthenPledged(false)}
                  className="text-[10px] font-mono text-[#9b451c] hover:text-red-700 transition-colors cursor-pointer mt-1 font-semibold"
                >
                  Reset Pledge
                </button>
              )}
            </div>
          </div>

          <h3 className="font-serif text-2xl text-[#370e00] font-semibold mb-2">
            Sustainable Sourcing
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#7c2e05]/90 leading-relaxed mb-4">
            Instead of single-use plastics, we use handcrafted, biodegradable clay bowls (Kulhads) for serving hot meals. This ensures that every serving is completely organic and returns to the soil without leaving any microplastic footprint.
          </p>
        </div>

        {/* Sourcing Calculator Panel */}
        <div className="flex-grow bg-white/75 rounded-2xl p-4 border border-[#ffb598]/30 flex flex-col justify-between my-4 max-h-[220px]">
          <div className="space-y-3.5 text-xs text-[#504441]">
            <div className="flex justify-between items-center">
              <span className="font-mono uppercase font-bold text-[#827470] text-[10px]">Eco-Bowls Pledged:</span>
              <span className="font-serif text-base font-bold text-[#9b451c]">{earthenBowls} Bowls</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={earthenBowls}
              disabled={isEarthenPledged}
              onChange={(e) => setEarthenBowls(Number(e.target.value))}
              className="w-full accent-[#9b451c] cursor-pointer h-1 bg-[#e9e1dc] rounded-lg appearance-none focus:outline-none"
            />
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#efe6e2]">
              <div>
                <span className="text-[10px] font-mono text-[#827470] block uppercase">Plastic Avoided:</span>
                <span className="font-sans font-bold text-[#370e00]">{(earthenBowls * 0.05).toFixed(1)} kg</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#827470] block uppercase">CO₂e Reduced:</span>
                <span className="font-sans font-bold text-[#370e00]">{(earthenBowls * 0.12).toFixed(1)} kg</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-mono text-[#827470] block uppercase">Biodegradation:</span>
                <span className="font-sans font-bold text-[#370e00]">Decomposes naturally in &lt; 30 Days</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-[#efe6e2]">
            <button
              onClick={() => setIsEarthenPledged(true)}
              disabled={isEarthenPledged}
              className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                isEarthenPledged
                  ? 'bg-emerald-600 text-white shadow-xs cursor-default flex items-center justify-center gap-1.5'
                  : 'bg-[#9b451c] text-white hover:bg-[#b04f20] cursor-pointer shadow-xs hover:shadow-md'
              }`}
            >
              {isEarthenPledged ? (
                <>
                  <Check size={14} />
                  Eco Sourcing Pledged
                </>
              ) : (
                'Support Zero-Plastic'
              )}
            </button>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#7c2e05]/70 italic text-center mt-1">
          Each earthen bowl is 100% organic and returned to the soil.
        </div>
      </div>

      {/* 3. BRAND NEW: "Preparation Sandbox & Empathy Simulator" Card (12 Columns) */}
      <div className="lg:col-span-12 bg-[#efe6e2] rounded-3xl p-6 md:p-8 border border-[#d4c3be]/40 shadow-[0_10px_40px_-10px_rgba(68,42,34,0.05)]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fff8f5] flex items-center justify-center text-[#442a22]">
              <Activity className="animate-pulse text-[#9b451c]" size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl text-[#442a22] font-semibold">
                Interactive Empathy Sandbox
              </h3>
              <p className="font-sans text-xs text-[#827470]">
                We haven't served meals yet. Use our real-time simulation sandbox to explore how we map vulnerability, compose high-dignity meals, and train for unhurried attention.
              </p>
            </div>
          </div>

          {/* Toggle Sandbox Tabs */}
          <div className="flex bg-[#fff8f5] p-1.5 rounded-2xl border border-[#d4c3be] self-stretch lg:self-auto justify-between overflow-x-auto gap-1">
            <button
              onClick={() => setActiveSandboxTab('meals')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSandboxTab === 'meals' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
              }`}
            >
              1. Compose Dignity Plate
            </button>
            <button
              onClick={() => setActiveSandboxTab('map')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSandboxTab === 'map' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
              }`}
            >
              2. Philosophy Compass
            </button>
            <button
              onClick={() => setActiveSandboxTab('breath')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSandboxTab === 'breath' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
              }`}
            >
              3. Mindful Breathing
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Display */}
        <div className="bg-[#fff8f5] p-6 rounded-3xl border border-[#efe6e2] min-h-[360px]">
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Interactive Meal Composer */}
            {activeSandboxTab === 'meals' && (
              <motion.div
                key="sandbox-meals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-widest block mb-1">Dignity Cooking Sourcing Simulator</span>
                    <h4 className="font-serif text-lg text-[#442a22] font-semibold">Build a Virtual "Dignity Plate"</h4>
                    <p className="font-sans text-xs text-[#504441] leading-relaxed">
                      Instead of thin plastic containers, our pilot prepares food in earthenware, wrapped in organic linen. Choose ingredients to customize:
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Grain selection */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#827470] uppercase block">Select Base Organic Grain:</span>
                      <div className="flex gap-2">
                        {[
                          { id: 'basmati', name: 'Dehraduni Basmati' },
                          { id: 'dalia', name: 'Broken Wheat Dalia' },
                          { id: 'millet', name: 'Barnyard Millet' }
                        ].map((grain) => (
                          <button
                            key={grain.id}
                            onClick={() => { setSelectedGrain(grain.id as any); setAssemblyComplete(false); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                              selectedGrain === grain.id ? 'bg-[#ffdbce] text-[#7c2e05] border border-[#fe9162]' : 'bg-white border border-[#e9e1dc] text-[#827470]'
                            }`}
                          >
                            {grain.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stew selection */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#827470] uppercase block">Select Protein Curry:</span>
                      <div className="flex gap-2">
                        {[
                          { id: 'rajma', name: 'Shahi Rajma' },
                          { id: 'dal', name: 'Yellow Moong Dal' },
                          { id: 'vegetable', name: 'Root Veggie Stew' }
                        ].map((stew) => (
                          <button
                            key={stew.id}
                            onClick={() => { setSelectedStew(stew.id as any); setAssemblyComplete(false); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                              selectedStew === stew.id ? 'bg-[#ffdbce] text-[#7c2e05] border border-[#fe9162]' : 'bg-white border border-[#e9e1dc] text-[#827470]'
                            }`}
                          >
                            {stew.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Blessing message */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#827470] uppercase block">Linen Message of Hope (Stenciled):</span>
                      <div className="space-y-1.5">
                        {blessings.map((msg, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setSelectedBlessing(idx); setAssemblyComplete(false); }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer block border ${
                              selectedBlessing === idx ? 'bg-[#fff8f5] border-[#9b451c] text-[#9b451c]' : 'bg-white border-[#e9e1dc] text-[#504441]'
                            }`}
                          >
                            "{msg}"
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startMealAssembly}
                    disabled={isAssembling}
                    className="bg-[#9b451c] hover:bg-[#b04f20] text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isAssembling ? "Assembling & Wrapping..." : "Pack & Sanctify Meal"}
                  </button>
                </div>

                <div className="md:col-span-5 flex flex-col items-center justify-center min-h-[220px] bg-white border border-[#efe6e2] rounded-2xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isAssembling && (
                      <motion.div
                        key="assembling-anim"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-3"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="w-12 h-12 rounded-full border-2 border-[#ffdbce] border-t-[#9b451c] mx-auto flex items-center justify-center text-[#9b451c]"
                        >
                          <Soup size={20} />
                        </motion.div>
                        <p className="font-mono text-xs text-[#827470] animate-pulse">Laying Dehraduni grains, infusing ghee, wrapping in organic linen cloth...</p>
                      </motion.div>
                    )}

                    {assemblyComplete && !isAssembling && (
                      <motion.div
                        key="assembly-complete"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4"
                      >
                        <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                          <Check size={24} />
                        </div>
                        <h5 className="font-serif text-base text-[#442a22] font-semibold">Meal Prepared &amp; Stenciled!</h5>
                        <div className="p-3 bg-[#fff8f5] rounded-xl border border-[#efe6e2] text-xs space-y-1 max-w-xs text-left font-mono">
                          <p><strong className="text-[#827470]">Base:</strong> {selectedGrain === 'basmati' ? 'Dehraduni Basmati' : selectedGrain === 'dalia' ? 'Wheat Dalia' : 'Barnyard Millet'}</p>
                          <p><strong className="text-[#827470]">Curry:</strong> {selectedStew === 'rajma' ? 'Shahi Rajma' : selectedStew === 'dal' ? 'Yellow Moong Dal' : 'Root Veggie Stew'}</p>
                          <p><strong className="text-[#827470]">Note:</strong> "{blessings[selectedBlessing]}"</p>
                        </div>
                        <p className="text-[10px] font-mono text-emerald-600">Simulated plate registered in pre-launch logs.</p>
                      </motion.div>
                    )}

                    {!isAssembling && !assemblyComplete && (
                      <motion.div
                        key="assembly-idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-3"
                      >
                        <Soup className="w-16 h-16 text-[#e9e1dc] mx-auto animate-bounce" />
                        <p className="font-serif text-sm text-[#827470]">Select customization on the left and hit 'Pack' to simulate our dignity pack assembly ceremony.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Philosophy & Wisdom Spheres */}
            {activeSandboxTab === 'map' && (
              <motion.div
                key="sandbox-map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Simulated coordinate map list */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#9b451c] uppercase font-bold tracking-widest block mb-1">Pre-Stage Co-Sourcing Compass</span>
                    <h4 className="font-serif text-xl text-[#442a22] font-extrabold tracking-tight">Wisdom &amp; Empathy Spheres</h4>
                    <p className="font-sans text-xs text-[#504441] leading-relaxed">
                      Connect directly with the deep, genuine principles behind our NGO workflow. Select any Wisdom Sphere below to read powerful, authentic quotations and actionable companion guidance, then illuminate the sphere to activate its light.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {pilotHomes.map((home, idx) => {
                      const isIlluminated = illuminatedHomes.includes(idx);
                      const isActive = activeHomeIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => { setActiveHomeIndex(idx); }}
                          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer block ${
                            isActive
                              ? 'bg-gradient-to-br from-[#fff8f5] to-[#ffdbce] border-[#9b451c] ring-2 ring-[#9b451c]/20 shadow-md scale-[1.02]'
                              : isIlluminated
                              ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                              : 'bg-white border-[#efe6e2] hover:border-amber-200 hover:shadow-xs'
                          }`}
                        >
                          <div className="flex items-start gap-1.5 justify-between">
                            <span className="font-serif text-xs font-bold text-[#442a22] block line-clamp-1">{home.name}</span>
                            <Sparkles size={12} className={isIlluminated ? 'text-amber-500 fill-amber-500 animate-spin-slow' : 'text-[#827470]/40'} />
                          </div>
                          <span className="text-[9px] font-mono text-[#827470] block line-clamp-1 mt-1">{home.area}</span>
                          
                          {/* Glow overlay for illuminated homes */}
                          {isIlluminated && (
                            <div className="absolute bottom-1 right-1 p-0.5">
                              <Sparkle size={10} className="text-amber-500 animate-pulse" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected coordinate details & action */}
                <div className="md:col-span-6 bg-gradient-to-br from-white to-[#fffbf9] border border-[#efe6e2] rounded-3xl p-6 min-h-[320px] flex flex-col justify-between shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#fe9162]/5 rounded-full blur-xl pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    {activeHomeIndex !== null ? (
                      <motion.div
                        key={`home-detail-${activeHomeIndex}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4 flex-grow flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-[#9b451c] uppercase bg-[#ffdbce]/50 px-2.5 py-1 rounded-full font-bold">
                              Wisdom Sphere #{activeHomeIndex + 1}
                            </span>
                            <span className="text-[10px] font-mono text-[#827470] italic font-semibold">{pilotHomes[activeHomeIndex].area}</span>
                          </div>

                          <h5 className="font-serif text-lg text-[#442a22] font-bold tracking-tight">{pilotHomes[activeHomeIndex].name}</h5>
                          
                          <div className="relative pl-6 py-1 border-l-2 border-[#9b451c]/40 my-2">
                            <span className="absolute left-1 top-0 text-[#9b451c] font-serif text-3xl leading-none">“</span>
                            <p className="font-serif text-xs md:text-sm text-[#442a22] italic leading-relaxed">
                              {pilotHomes[activeHomeIndex].desc}
                            </p>
                          </div>

                          <div className="bg-[#fff8f5] p-3 rounded-xl border border-[#efe6e2] space-y-1">
                            <span className="text-[10px] font-mono text-[#827470] uppercase font-bold block">Ahsaaz Sourcing Field Guidance:</span>
                            <span className="text-xs text-[#9b451c] font-semibold block">→ {pilotHomes[activeHomeIndex].need}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#efe6e2]/60 flex gap-3 items-center">
                          {illuminatedHomes.includes(activeHomeIndex) ? (
                            <div className="w-full text-center py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs">
                              <Check size={14} className="text-amber-500" />
                              Wisdom Sphere Illuminated (Actively Sown)
                            </div>
                          ) : (
                            <button
                              onClick={() => handleIlluminate(activeHomeIndex!)}
                              className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transform hover:scale-102"
                            >
                              <Sparkle size={12} className="text-amber-300 animate-spin-slow" />
                              Illuminate Wisdom Sphere &amp; Lock Intention
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="map-idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 space-y-4 flex-grow flex flex-col justify-center items-center"
                      >
                        <Compass className="w-14 h-14 text-[#9b451c]/20 animate-spin-slow" />
                        <h5 className="font-serif text-base text-[#827470] max-w-xs font-medium">Select a wisdom sphere on the left to inspect our authentic philosophy of service.</h5>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Silent Companion Breath Connection */}
            {activeSandboxTab === 'breath' && (
              <motion.div
                key="sandbox-breath"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-widest block mb-1">Listener Presence Sourcing</span>
                    <h4 className="font-serif text-lg text-[#442a22] font-semibold">Active Presence Training</h4>
                    <p className="font-sans text-xs text-[#504441] leading-relaxed">
                      Empathy is not a race. Our pre-stage companion network trains extensively in mindful deep breathing. Sit comfortably, and synchronize your breath with our unhurried breathing guide below.
                    </p>
                  </div>

                  <div className="p-4 bg-[#fff8f5] rounded-2xl border border-[#efe6e2] max-w-md">
                    <p className="text-xs text-[#504441] leading-relaxed italic">
                      "To look a suffering elder in the eyes, you must first quiet the racing thoughts of your own day. One unhurried moment can heal a week of deep isolation."
                    </p>
                  </div>

                  <button
                    onClick={() => setIsBreathing(!isBreathing)}
                    className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isBreathing ? 'bg-[#ffdbce] text-[#7c2e05] border border-[#fe9162]' : 'bg-[#9b451c] text-white hover:bg-[#b04f20] hover:shadow-md'
                    }`}
                  >
                    {isBreathing ? "Pause Breathing Companion" : "Initiate Breathing Companion"}
                  </button>
                </div>

                <div className="md:col-span-5 flex flex-col items-center justify-center min-h-[240px]">
                  <div className="relative flex items-center justify-center w-48 h-48">
                    {/* Pulsing breathe circle */}
                    <motion.div
                      animate={{
                        scale: breathScale,
                        backgroundColor: breathPhase === 'inhale' ? '#ffdbce' : breathPhase === 'hold' ? '#ffc2ad' : '#ffebe4'
                      }}
                      transition={{ duration: 3.8, ease: "easeInOut" }}
                      className="absolute w-32 h-32 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(155,69,28,0.06)] border border-[#ffdbce]"
                    >
                      <span className="font-mono text-xs text-[#7c2e05] font-bold uppercase tracking-widest animate-pulse">
                        {isBreathing ? breathPhase : "Ready"}
                      </span>
                    </motion.div>

                    {/* Outer rings */}
                    <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#fe9162]/30 animate-spin-slow" />
                    <div className="absolute w-40 h-40 rounded-full border border-[#efe6e2]" />
                  </div>
                  {isBreathing && (
                    <p className="text-[10px] font-mono text-[#827470] text-center mt-2 animate-pulse uppercase tracking-wider">
                      {breathPhase === 'inhale' && "Inhale compassion..."}
                      {breathPhase === 'hold' && "Hold warm presence..."}
                      {breathPhase === 'exhale' && "Exhale quiet isolation..."}
                      {breathPhase === 'hold-out' && "Remain open..."}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
