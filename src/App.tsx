import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Heart, ChevronRight, Menu, X, ArrowDown, ArrowRight,
  Landmark, Lightbulb, Compass, Users, Sparkles, Clock, Volume2, VolumeX,
  Send, Leaf, MessageSquare, BookOpen, Quote, Sparkle, Trash2, Terminal
} from 'lucide-react';
import { Signup } from './types';

// Import custom components
import CursorGlow from './components/CursorGlow';
import InteractiveBackground from './components/InteractiveBackground';
import PlainPreloader from './components/PlainPreloader';
import BentoGrid from './components/BentoGrid';
import ParallaxSignup from './components/ParallaxSignup';
import EmpathyGrove from './components/EmpathyGrove';
import ServerMonitor from './components/ServerMonitor';
import AboutUs from './components/AboutUs';
import TerracottaVessel3D from './components/TerracottaVessel3D';
import BreathingResonanceCircle from './components/BreathingResonanceCircle';
import LocalityGuide from './components/LocalityGuide';

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function App() {
  const [hasCompletedMiniGame, setHasCompletedMiniGame] = useState(false);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'philosophy' | 'what-we-do' | 'about' | 'impact' | 'join'>('home');
  
  // Custom Sowing Pledge Modal State (Hours of unhurried monthly Care)
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [customDonation, setCustomDonation] = useState(12); // Represents hours pledged
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [pledgeCategory, setPledgeCategory] = useState<'listening' | 'meals' | 'walks'>('listening');

  // Dynamic Rotating Hero NGO Background Slideshow
  const [currentHeroBgIndex, setCurrentHeroBgIndex] = useState(0);
  const heroBackgrounds = [
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=50",
      alt: "Caring hands supporting an elderly person with absolute dignity"
    },
    {
      url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=50",
      alt: "Compassionate care and medicine handoff with deep empathy"
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=50",
      alt: "Providing supplies and food security to vulnerable families"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Interactive Live Clock State (IST)
  const [istTime, setIstTime] = useState('');

  // Developer Access Control state
  const [isDeveloper, setIsDeveloper] = useState<boolean>(() => {
    return !!localStorage.getItem('project_ahsaaz_dev_token');
  });
  const [devTokenInput, setDevTokenInput] = useState('');
  const [showDevModal, setShowDevModal] = useState(false);
  const [devAuthError, setDevAuthError] = useState('');

  // Interactive Reflection Journal State (Philosophy page)
  const [journalInput, setJournalInput] = useState('');
  const [journalLogs, setJournalLogs] = useState<{ text: string; isUserCreated?: boolean }[]>(() => {
    const saved = localStorage.getItem('project_ahsaaz_journal_logs_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved journal logs:", e);
      }
    }
    const legacySaved = localStorage.getItem('project_ahsaaz_journal_logs');
    if (legacySaved) {
      try {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => {
            if (typeof item === 'string') {
              const isDefault = item === "Listening is not waiting for your turn to talk; it is giving up your internal agenda to be with another." ||
                                item === "A fine china plate represents equality. Pity serves in paper cups; empathy serves on ceramics.";
              return { text: item, isUserCreated: !isDefault };
            }
            return item;
          });
        }
      } catch (e) {}
    }
    return [
      { text: "Listening is not waiting for your turn to talk; it is giving up your internal agenda to be with another.", isUserCreated: false },
      { text: "A fine china plate represents equality. Pity serves in paper cups; empathy serves on ceramics.", isUserCreated: false }
    ];
  });
  const [floatingLeaves, setFloatingLeaves] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Interactive Proposal Sandbox State (Our Ideas page)
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('Earthenware Crafting');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [customIdeas, setCustomIdeas] = useState<{ id: number; title: string; category: string; desc: string; sparkles: boolean; isUserCreated?: boolean }[]>(() => {
    const saved = localStorage.getItem('project_ahsaaz_custom_ideas_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved custom ideas:", e);
      }
    }
    const legacySaved = localStorage.getItem('project_ahsaaz_custom_ideas');
    if (legacySaved) {
      try {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => {
            const isDefault = item.id === 1 || item.id === 2 || item.title === "Traditional Potter Alliance" || item.title === "Elder Listening Time-Banking";
            return { ...item, isUserCreated: !isDefault };
          });
        }
      } catch (e) {}
    }
    return [
      { id: 1, title: "Traditional Potter Alliance", category: "Earthenware Crafting", desc: "Collaborating with local clay artisans to handcraft biodegradable porridge bowls.", sparkles: true, isUserCreated: false },
      { id: 2, title: "Elder Listening Time-Banking", category: "Doorstep Time-Banking", desc: "A program where neighborhood youth log quiet conversation hours in exchange for ancestral stories.", sparkles: false, isUserCreated: false }
    ];
  });

  const handleDeleteJournalLog = (indexToDelete: number) => {
    setJournalLogs(prev => {
      const updated = prev.filter((_, idx) => idx !== indexToDelete);
      localStorage.setItem('project_ahsaaz_journal_logs_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCustomIdea = (idToDelete: number) => {
    setCustomIdeas(prev => {
      const updated = prev.filter(idea => idea.id !== idToDelete);
      localStorage.setItem('project_ahsaaz_custom_ideas_v2', JSON.stringify(updated));
      return updated;
    });
  };

  // Interactive Team Letter States (About Us page)
  const [activeTeamLetter, setActiveTeamLetter] = useState<string | null>(null);

  // Interactive Sprout Water Garden State
  const [isWatering, setIsWatering] = useState(false);
  const [waterDrops, setWaterDrops] = useState<{ id: number; left: number }[]>([]);
  
  // Interactive Hero section modules for NGO Showcase
  const [activeHeroModule, setActiveHeroModule] = useState<'care' | 'health' | 'empathy'>('care');

  // Live clock hook
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Map UTC to IST (UTC + 5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch signups
  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/signups');
      if (response.ok) {
        const data = await response.json();
        setSignups(data);
      }
    } catch (err) {
      console.error("Error fetching live signups:", err);
    }
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  const handleSignupSuccess = (newSignup: Signup) => {
    setSignups(prev => [newSignup, ...prev]);
    // Switch to impact page to let them view their seedling sprout
    setActiveTab('impact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to scroll, wheel, and swipe gestures to enter when on the Gate Screen
  useEffect(() => {
    if (!hasCompletedMiniGame || hasEnteredSite) return;

    let touchStartY = 0;

    const handleScrollToEnter = (e: WheelEvent) => {
      if (e.deltaY > 12) {
        handleEnterSite();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      if (touchStartY - touchEndY > 25) { // Swiped upwards to scroll down
        handleEnterSite();
      }
    };

    const handleEnterSite = () => {
      setHasEnteredSite(true);
    };

    window.addEventListener('wheel', handleScrollToEnter, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScrollToEnter);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [hasCompletedMiniGame, hasEnteredSite]);

  // Cast Philosophy Leaf Animation
  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;

    const text = journalInput;
    setJournalLogs(prev => {
      const updated = [{ text, isUserCreated: true }, ...prev];
      localStorage.setItem('project_ahsaaz_journal_logs_v2', JSON.stringify(updated));
      return updated;
    });
    setJournalInput('');

    // Generate random floating particles
    const id = Date.now();
    const leafX = Math.random() * 200 - 100; // Offset x
    const leafY = -150; // Fly upwards

    setFloatingLeaves(prev => [...prev, { id, text, x: leafX, y: leafY }]);
    setTimeout(() => {
      setFloatingLeaves(prev => prev.filter(leaf => leaf.id !== id));
    }, 4000);
  };

  // Publish Idea in Sandbox Proposal Widget
  const handlePublishIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaDesc.trim()) return;

    const newIdea = {
      id: Date.now(),
      title: ideaTitle,
      category: ideaCategory,
      desc: ideaDesc,
      sparkles: true,
      isUserCreated: true
    };

    setCustomIdeas(prev => {
      const updated = [newIdea, ...prev];
      localStorage.setItem('project_ahsaaz_custom_ideas_v2', JSON.stringify(updated));
      return updated;
    });
    setIdeaTitle('');
    setIdeaDesc('');
  };

  // Water Empathy Sprout Garden Simulation
  const handleWaterGarden = () => {
    if (isWatering) return;
    setIsWatering(true);

    // Generate rain particles
    const drops = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100
    }));
    setWaterDrops(drops);

    setTimeout(() => {
      setIsWatering(false);
      setWaterDrops([]);
    }, 2800);
  };

  // Sowing pledge hours impact calculator
  const getPledgeImpactStatement = (hours: number, category: 'listening' | 'meals' | 'walks') => {
    if (category === 'listening') {
      return `Pledging ${hours} hours of unhurried doorstep listening allows you to sit with ${Math.max(1, Math.floor(hours / 3))} vulnerable elder(s) in our community neighborhoods, listening to memories and offering deep companioning.`;
    } else if (category === 'meals') {
      return `Pledging ${hours} hours of kitchen/meal support translates to preparing, wrapping, and stenciling custom wooden care baskets and copper pots to distribute nutritious stews.`;
    } else {
      return `Pledging ${hours} hours of mapping/walking lets you conduct gentle walking door checks to locate forgotten, housebound seniors in quiet streets.`;
    }
  };

  const isGuideMode = typeof window !== 'undefined' && window.location.search.includes('mode=guide');

  if (isGuideMode) {
    return (
      <div className="bg-[#fff8f5] text-[#1e1b18] font-sans antialiased relative min-h-screen selection:bg-[#ffdbce] selection:text-[#442a22] overflow-x-hidden">
        <CursorGlow />
        <InteractiveBackground />
        <LocalityGuide isStandalone={true} />
      </div>
    );
  }

  return (
    <div className="bg-[#fff8f5] text-[#1e1b18] font-sans antialiased relative min-h-screen selection:bg-[#ffdbce] selection:text-[#442a22] overflow-x-hidden">
      {/* 1. Custom Interactive Cursor Aura Effect */}
      <CursorGlow />
      <InteractiveBackground />

      <AnimatePresence mode="wait">
        {/* 2. Peaceful, Curated App Preloader */}
        {!hasCompletedMiniGame ? (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <PlainPreloader onComplete={() => setHasCompletedMiniGame(true)} />
          </motion.div>
        ) : !hasEnteredSite ? (
          <motion.div
            key="scroll-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between items-center p-8 bg-[#fff8f5] text-[#1e1b18] select-none"
          >
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=50"
                alt="Sanctuary of Belonging Background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-[0.12] blur-[1px] scale-105"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-[#fff8f5]/80 to-[#fff8f5]" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#fe9162]/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#9b451c]/10 blur-3xl" />
            </div>

            {/* Top Identity */}
            <div className="relative z-10 w-full max-w-5xl flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-sm font-semibold tracking-wide text-[#442a22]">Project Ahsaaz</span>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-[#827470] uppercase">National Pre-Stage Gate</span>
            </div>

            {/* Center Gate Interaction */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-4 space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-20 h-20 rounded-full bg-white border border-[#efe6e2] flex items-center justify-center text-[#9b451c] shadow-lg mb-4"
              >
                <Sprout size={36} className="animate-bounce" />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#442a22] font-bold tracking-tight leading-tight"
              >
                The Gate of <span className="text-[#9b451c]">Empathy</span> is Open
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-sans text-sm md:text-base text-[#504441] leading-relaxed max-w-lg"
              >
                Step inside Project Ahsaaz, a sensory-guided student-led NGO sanctuary serving vulnerable lives across India, fostering a shared spirit of unity and belongingness. Let unhurried companion music wash over you.
              </motion.p>

              {/* Scroll / Tap button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="pt-6"
              >
                <button
                  onClick={() => {
                    setHasEnteredSite(true);
                  }}
                  className="bg-[#9b451c] hover:bg-[#b04f20] text-white px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(155,69,28,0.3)] cursor-pointer flex items-center gap-2"
                >
                  <span>Enter Sanctuary Portal</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>

            {/* Bottom Bouncing Scroll Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer pb-6"
              onClick={() => {
                setHasEnteredSite(true);
              }}
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#9b451c] font-bold">Scroll Down or Tap to Enter</span>
              <div className="w-6 h-10 rounded-full border-2 border-[#9b451c] flex justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-2.5 rounded-full bg-[#9b451c]"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full relative pt-28"
          >
            
            {/* 3. MULTI-LAYERED SOPHISTICATED NAVIGATION BAR */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#e9e1dc]/50 transition-all duration-300">
              
              {/* Top Utility Rail: Interactive Sourcing Details & IST Clock */}
              <div className="bg-[#9b451c]/5 px-4 md:px-8 py-1.5 border-b border-[#e9e1dc]/30 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#827470] tracking-widest uppercase font-semibold gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9b451c]" />
                  <span>● Pre-Stage Sanctuary // Gathering Co-Creators</span>
                </div>
                
                {/* Center Locality Action Guide Link */}
                <div className="flex items-center gap-3">
                  <a 
                    href="?mode=guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#efe6e2] text-[#9b451c] hover:bg-[#ffdbce] hover:border-[#9b451c] transition-all cursor-pointer font-bold uppercase text-[9px] tracking-wider"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>🌐 Action Protocol Guide (New Tab)</span>
                  </a>
                </div>

                {/* National Time (IST Clock) */}
                <div className="flex items-center gap-1.5">
                  <Clock size={11} className="text-[#9b451c]" />
                  <span>National Time (IST): {istTime || "12:00:00 PM"}</span>
                </div>
              </div>

              {/* Main Rail Navigation */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                
                {/* Brand Identity */}
                <div 
                  className="flex items-center gap-3.5 cursor-pointer group" 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <div className="flex flex-col">
                    <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#442a22]">
                      Project Ahsaaz
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-[#9b451c] font-bold uppercase">
                      A Sanctuary of Unhurried Companionship
                    </span>
                  </div>
                </div>

                {/* Sophisticated Tabs with Subtext labels */}
                <div className="hidden xl:flex items-center gap-6">
                  {[
                    { id: 'home', label: 'Home', num: '01' },
                    { id: 'philosophy', label: 'Philosophy', num: '02' },
                    { id: 'what-we-do', label: 'What We Do', num: '03' },
                    { id: 'about', label: 'About NGO', num: '04' },
                    { id: 'impact', label: 'Seed Grove', num: '05' },
                    { id: 'join', label: 'Join Us', num: '06' }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="relative py-2 px-1 text-left flex flex-col group transition-all cursor-pointer"
                      >
                        <span className={`font-serif text-xs md:text-sm font-semibold tracking-wide transition-colors ${
                          isActive ? 'text-[#9b451c]' : 'text-[#504441] group-hover:text-[#442a22]'
                        }`}>
                          {tab.label}
                        </span>

                        {/* Framer Motion Slide Underline Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b451c]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Sowing Pledge trigger */}
                <div className="hidden xl:block">
                  <button
                    onClick={() => setDonationModalOpen(true)}
                    className="bg-[#9b451c] hover:bg-[#b04f20] text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-102 hover:shadow-[0_4px_14px_rgba(155,69,28,0.25)] cursor-pointer flex items-center gap-1.5"
                  >
                    <Sprout size={14} />
                    <span>🌱 Sowing Pledge</span>
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden text-[#442a22] focus:outline-none cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Drawer (Responsive Navigation) */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="xl:hidden bg-[#fff8f5] border-b border-[#e9e1dc] px-6 py-6 space-y-4"
                  >
                    <div className="flex items-center gap-3.5 pb-4 border-b border-[#efe6e2]">
                      <div className="flex flex-col">
                        <span className="font-serif text-base font-bold text-[#442a22]">Project Ahsaaz</span>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#9b451c] font-black">Sanctuary of Belonging</span>
                      </div>
                    </div>
                    {[
                      { id: 'home', label: 'Home' },
                      { id: 'philosophy', label: 'Philosophy' },
                      { id: 'what-we-do', label: 'What We Do (Sandbox)' },
                      { id: 'about', label: 'About NGO & Games' },
                      { id: 'impact', label: 'Seed Grove Garden' },
                      { id: 'join', label: 'Join Us' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`block w-full text-left font-serif text-lg font-semibold py-1.5 border-b border-[#efe6e2] ${
                          activeTab === tab.id ? 'text-[#9b451c]' : 'text-[#442a22]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setDonationModalOpen(true);
                      }}
                      className="w-full text-center bg-[#9b451c] text-white py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      🌱 Sowing Pledge
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

            {/* --- MAIN PAGE CONTENT (ANIMATED DYNAMIC STATE-BASED ROUTING) --- */}
            <main className="w-full min-h-[600px] pb-12">
              <AnimatePresence mode="wait">
                
                {/* ==================== HOME PAGE TAB ==================== */}
                {activeTab === 'home' && (
                  <motion.div
                    key="tab-home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                  >
                    <header className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden rounded-3xl mx-2 md:mx-6 my-4 glass-glossy">
                      {/* Dynamic Rotating NGO Supportive Backgrounds with Glossy Sparkling Classy Retrofitted Shining Effects */}
                      <div className="absolute inset-0 z-0 pointer-events-none bg-shiny-retro">
                        {/* Retro Grid Overlay */}
                        <div className="absolute inset-0 retro-grid opacity-35" />
                        
                        {heroBackgrounds.map((bg, idx) => (
                          <img
                            key={idx}
                            src={bg.url}
                            alt={bg.alt}
                            referrerPolicy="no-referrer"
                            className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay blur-[0.5px] transition-all duration-1000 ease-in-out transform ${
                              idx === currentHeroBgIndex 
                                ? "opacity-[0.6] scale-100" 
                                : "opacity-0 scale-105"
                            }`}
                          />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f5]/50 via-[#fff8f5]/15 to-[#fff8f5]/30 backdrop-blur-[1.5px]" />
                        
                        {/* Interactive Sparkles/Sparks */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                          <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                          <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                          <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                        </div>
                      </div>

                      {/* Staggered text will show after completing an animated flow */}
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12"
                      >
                        
                        {/* Text Content with Staggered Entrance Animations & Visual Highlights */}
                        <motion.div 
                          variants={staggerContainerVariants}
                          initial="hidden"
                          animate="visible"
                          className="lg:col-span-7 space-y-8 text-left"
                        >
                          
                          {/* NGO Banner Badge */}
                          <motion.div 
                            variants={staggerItemVariants}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9b451c]/10 text-[#9b451c] text-xs font-mono tracking-wider font-bold uppercase shadow-xs border border-[#9b451c]/20"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Ahsaaz – Student-led NGO</span>
                          </motion.div>

                          <motion.h1 
                            variants={staggerItemVariants}
                            className="font-serif text-4xl md:text-6xl text-[#442a22] font-bold tracking-tight leading-[1.1]"
                          >
                            Empathy Across India.<br />We SOW Belongingness.
                          </motion.h1>

                          <motion.p 
                            variants={staggerItemVariants}
                            className="font-sans text-sm md:text-base text-[#504441] leading-relaxed max-w-xl"
                          >
                            Project Ahsaaz is a dedicated student-led non-governmental organization (NGO) serving local communities across India. We prepare high-dignity care packages, arrange instant medical queues, and hold unhurried listening assessments to dissolve extreme physical and emotional isolation.
                          </motion.p>



                          <motion.div 
                            variants={staggerItemVariants}
                            className="flex flex-col sm:flex-row gap-4 items-center pt-2"
                          >
                            <button
                              onClick={() => { setActiveTab('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="w-full sm:w-auto bg-[#9b451c] hover:bg-[#b04f20] text-white px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all transform hover:scale-103 hover:shadow-[0_8px_25px_rgba(155,69,28,0.25)] cursor-pointer text-center"
                            >
                              Join Active NGO Network
                            </button>
                            <button
                              onClick={() => {
                                const el = document.getElementById('home-details');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-full sm:w-auto bg-[#efe6e2] hover:bg-[#e9e1dc] text-[#442a22] px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>Explore Genesis</span>
                              <ArrowDown size={14} className="animate-bounce" />
                            </button>
                          </motion.div>
                        </motion.div>

                        {/* Interactive 3D Terracotta Vessel */}
                        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center relative">
                          <TerracottaVessel3D />
                        </div>

                      </motion.div>

                      {/* Gorgeous Scroll-Down Bouncing Cue */}
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        onClick={() => {
                          const el = document.getElementById('home-details');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer z-10"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#9b451c] font-bold">Breathe &amp; Scroll Down</span>
                        <div className="w-5 h-8 rounded-full border border-[#9b451c] flex justify-center p-1">
                          <div className="w-1 h-2 rounded-full bg-[#9b451c]" />
                        </div>
                      </motion.div>
                    </header>

                    {/* Below-the-fold detail panel: Pre-Stage Genesis of Project Ahsaaz */}
                    <section id="home-details" className="mx-4 md:mx-12 my-12 bg-gradient-to-br from-white to-[#fffbf9] border border-[#efe6e2] rounded-[2.5rem] p-8 md:p-14 shadow-[0_15px_50px_-15px_rgba(155,69,28,0.06)] relative overflow-hidden">
                      {/* Decorative elements for vibrancy */}
                      <div className="absolute top-0 left-0 w-64 h-64 bg-[#fe9162]/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#9b451c]/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
                        <div className="text-center space-y-4">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#9b451c] text-[10px] font-mono tracking-widest uppercase font-extrabold shadow-2xs border border-amber-200/50">
                            <Sparkles size={10} className="animate-spin-slow text-[#fe9162]" />
                            <span>Laying the Groundwork // National Prep Circle</span>
                          </div>
                          <h2 className="font-serif text-3xl md:text-5xl text-[#442a22] font-black tracking-tight">The Pre-Stage Genesis</h2>
                          <p className="font-sans text-xs md:text-sm text-[#827470] max-w-2xl mx-auto leading-relaxed">
                            We are in a vital preparatory phase as a student-led grassroots NGO, securing logistics networks, listing forgotten elder coordinates, and training volunteers for unhurried emotional care.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="p-8 bg-white border border-[#efe6e2] rounded-3xl space-y-5 hover:shadow-xl hover:border-[#fe9162]/30 transition-all hover:-translate-y-1 duration-300 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#9b451c] font-bold">
                              <span>01</span>
                            </div>
                            <h4 className="font-serif text-xl font-bold text-[#442a22] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#fe9162]" />
                              Material Sourcing
                            </h4>
                            <p className="text-xs text-[#504441] leading-relaxed">
                              We curate biodegradable, zero-plastic serving materials like handcrafted clay bowls and organic linen. By prioritizing natural, traditional earthenware, we eliminate single-use plastics and serve community meals with environmental consciousness and deep respect.
                            </p>
                          </div>
                          
                          <div className="p-8 bg-white border border-[#efe6e2] rounded-3xl space-y-5 hover:shadow-xl hover:border-[#fe9162]/30 transition-all hover:-translate-y-1 duration-300 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#9b451c] font-bold">
                              <span>02</span>
                            </div>
                            <h4 className="font-serif text-xl font-bold text-[#442a22] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#fe9162]" />
                              Mapping Quiet Doors
                            </h4>
                            <p className="text-xs text-[#504441] leading-relaxed">
                              Volunteers conduct gentle, walking assessments across various local neighborhoods to index isolated seniors with deep dignity.
                            </p>
                          </div>
                          
                          <div className="p-8 bg-white border border-[#efe6e2] rounded-3xl space-y-5 hover:shadow-xl hover:border-[#fe9162]/30 transition-all hover:-translate-y-1 duration-300 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#9b451c] font-bold">
                              <span>03</span>
                            </div>
                            <h4 className="font-serif text-xl font-bold text-[#442a22] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#fe9162]" />
                              Presence Training
                            </h4>
                            <p className="text-xs text-[#504441] leading-relaxed">
                              We conduct peer workshops to prepare volunteers for compassionate community interaction. By training in mindful presence and supportive dialogue, our team ensures every food outreach event is defined by warmth, respect, and authentic connection.
                            </p>
                          </div>
                        </div>

                        <div className="text-center pt-4">
                          <button
                            onClick={() => { setActiveTab('philosophy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="bg-[#9b451c] hover:bg-[#b04f20] text-white px-8 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 mx-auto cursor-pointer shadow-md hover:shadow-lg transform hover:scale-102"
                          >
                            <span>Proceed to Philosophy</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* ==================== PHILOSOPHY PAGE TAB ==================== */}
                {activeTab === 'philosophy' && (
                  <motion.div
                    key="tab-philosophy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative min-h-[600px] overflow-hidden rounded-3xl glass-glossy"
                  >
                    {/* Background Ambient Eye-Dashing Image with Glossy Sparkling Classy Retrofitted Shining Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-shiny-retro">
                      {/* Retro Grid Overlay */}
                      <div className="absolute inset-0 retro-grid opacity-35" />
                      
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=50"
                        alt="Empathy Craft Pottery"
                        className="w-full h-full object-cover mix-blend-overlay animate-pulse-slow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/50 via-transparent to-[#fff8f5]/50 backdrop-blur-[1.5px]" />
                      
                      {/* Interactive Sparkles/Sparks */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>

                    {/* Staggered Content Animation Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="relative z-10 space-y-16"
                    >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left: Interactive Breathing Resonance Circle (Replaced original image) */}
                      <div className="lg:col-span-5">
                        <BreathingResonanceCircle />
                      </div>

                      {/* Right: Phil Content */}
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-mono text-[#9b451c] uppercase bg-[#ffdbce]/40 px-3 py-1 rounded-full font-bold">
                          The Core Creed
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#442a22] font-semibold leading-tight">
                          The Essence of Ahsaaz
                        </h2>
                        <p className="font-sans text-sm md:text-base text-[#504441] leading-relaxed">
                          The Sanskrit and Urdu root of <strong>Ahsaaz</strong> refers to a visceral realization. It isn't a passive concept of pity, nor a cold digital database entries. Ahsaaz is the moment you look another suffering human in the eyes and realize: <em>"Their hunger is my hunger, and their loneliness is my concern."</em>
                        </p>
                        <p className="font-sans text-sm md:text-base text-[#504441] leading-relaxed">
                          We believe that sterile charity strips away dignity. When food is distributed as a cold handout, it reinforces social distance. Our mission is to dissolve that barrier. By choosing organic earthenware and engaging in unhurried conversations, we foster mutual respect and a true sense of belonging.
                        </p>

                        <div className="p-4 bg-[#fff8f5] rounded-2xl border border-[#efe6e2] flex items-start gap-4">
                          <div className="p-2 bg-[#ffdbce] rounded-full text-[#9b451c] shrink-0 mt-0.5">
                            <Quote size={18} />
                          </div>
                          <div>
                            <p className="font-serif text-xs md:text-sm text-[#442a22] italic font-semibold">
                              "We don't feed people. We co-dine with our neighbors, breaking the boundary between benefactor and beneficiary."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* INTERACTIVE COMPONENT: "Active Reflection Journal" */}
                    <section className="bg-[#efe6e2] rounded-3xl p-6 md:p-8 border border-[#d4c3be]/40 shadow-sm relative overflow-hidden">
                      
                      {/* Physics-like floating leaves particles from user casts */}
                      <div className="absolute inset-0 pointer-events-none z-0">
                        {floatingLeaves.map(leaf => (
                          <motion.div
                            key={leaf.id}
                            initial={{ opacity: 1, y: 50, x: leaf.x, scale: 0.8 }}
                            animate={{ opacity: 0, y: -250, x: leaf.x + 40, rotate: 360 }}
                            transition={{ duration: 3.5, ease: "easeOut" }}
                            className="absolute bottom-10 left-1/2 text-amber-600/30 font-serif text-xs"
                          >
                            <Leaf size={14} className="fill-current" />
                            <span className="text-[8px] font-mono whitespace-nowrap block mt-1">Casting Seed Reflection...</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7 space-y-4">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={16} className="text-[#9b451c]" />
                            <span className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-widest">Co-Contemplative Sandbox</span>
                          </div>
                          <h3 className="font-serif text-2xl text-[#442a22] font-semibold">The Active Contemplation Starboard</h3>
                          <p className="text-xs text-[#504441] leading-relaxed">
                            Maybe the thought you share will help someone on the other side of the world.
                          </p>

                          <form onSubmit={handleJournalSubmit} className="flex gap-2 max-w-lg">
                            <input
                              type="text"
                              value={journalInput}
                              onChange={(e) => setJournalInput(e.target.value)}
                              placeholder="E.g., Empathy is recognizing myself in the quiet stranger..."
                              className="flex-grow bg-white border border-[#d4c3be] rounded-xl px-4 py-2.5 text-xs text-[#1e1b18] outline-none focus:ring-1 focus:ring-[#9b451c]"
                            />
                            <button
                              type="submit"
                              className="bg-[#9b451c] hover:bg-[#b04f20] text-white px-4 rounded-xl text-xs font-mono font-bold uppercase cursor-pointer"
                            >
                              Cast Seed
                            </button>
                          </form>
                        </div>

                        {/* Current Contemplation Board */}
                        <div className="md:col-span-5 bg-white border border-[#efe6e2] rounded-2xl p-4 max-h-[220px] overflow-y-auto space-y-3 scrollbar-thin">
                          <span className="text-[9px] font-mono text-[#827470] uppercase font-bold block pb-1 border-b border-[#e9e1dc]">Collective Contemplative Seeds</span>
                          {journalLogs.map((log, index) => {
                            const text = typeof log === 'string' ? log : log.text;
                            const isDeletable = typeof log === 'string' ? (
                              log !== "Listening is not waiting for your turn to talk; it is giving up your internal agenda to be with another." &&
                              log !== "A fine china plate represents equality. Pity serves in paper cups; empathy serves on ceramics."
                            ) : !!log.isUserCreated;

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-2.5 bg-[#fff8f5] rounded-xl border border-[#efe6e2] text-xs text-[#504441] italic font-serif leading-relaxed relative group/log flex justify-between items-start gap-2"
                              >
                                <span className="flex-1">"{text}"</span>
                                {isDeletable && (
                                  <button
                                    onClick={() => handleDeleteJournalLog(index)}
                                    className="text-[#827470] hover:text-red-500 transition-colors p-0.5 rounded opacity-0 group-hover/log:opacity-100 focus:opacity-100 cursor-pointer shrink-0"
                                    title="Delete comment"
                                    type="button"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                    </motion.div>
                  </motion.div>
                )}

                {/* ==================== WHAT WE DO TAB ==================== */}
                {activeTab === 'what-we-do' && (
                  <motion.div
                    key="tab-what-we-do"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative min-h-[600px] overflow-hidden rounded-3xl glass-glossy"
                  >
                    {/* Background Ambient Eye-Dashing Image with Glossy Sparkling Classy Retrofitted Shining Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-shiny-retro">
                      {/* Retro Grid Overlay */}
                      <div className="absolute inset-0 retro-grid opacity-35" />
                      
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=50"
                        alt="Nourishment Support"
                        className="w-full h-full object-cover mix-blend-overlay animate-pulse-slow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/50 via-transparent to-[#fff8f5]/50 backdrop-blur-[1.5px]" />
                      
                      {/* Interactive Sparkles/Sparks */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>

                    {/* Staggered Content Animation Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="relative z-10 space-y-12"
                    >
                      <div className="text-center mb-10 space-y-3">
                        <span className="text-xs font-mono text-[#9b451c] uppercase tracking-widest font-bold">Interactive Sandbox &amp; Programs</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold">
                          What We Do (Sandbox Environment)
                        </h2>
                        <p className="font-sans text-sm text-[#827470] max-w-xl mx-auto">
                          A real-time, touch-active grid detailing our preparatory hunger, mapped coordinates, and dialoguing tools. Touch a card or dial a slider to engage!
                        </p>
                      </div>

                      {/* Dynamic Interactive BentoGrid Component */}
                      <BentoGrid />
                    </motion.div>
                  </motion.div>
                )}

                {/* ==================== ABOUT NGO & GAMES TAB ==================== */}
                {activeTab === 'about' && (
                  <motion.div
                    key="tab-about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative min-h-[600px] overflow-hidden rounded-3xl glass-glossy"
                  >
                    {/* Background Ambient Eye-Dashing Image with Glossy Sparkling Classy Retrofitted Shining Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-shiny-retro">
                      {/* Retro Grid Overlay */}
                      <div className="absolute inset-0 retro-grid opacity-35" />
                      
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1000&q=50"
                        alt="About Our Support"
                        className="w-full h-full object-cover mix-blend-overlay animate-pulse-slow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/50 via-transparent to-[#fff8f5]/50 backdrop-blur-[1.5px]" />
                      
                      {/* Interactive Sparkles/Sparks */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>

                    {/* Staggered Content Animation Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="relative z-10 space-y-12"
                    >
                      <AboutUs />

                    {/* INTERACTIVE COMPONENT: "Sourcing Sandbox Idea Proposer" */}
                    <section id="sandbox-creator" className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                      <div className="bg-[#fff8f5] border border-[#e9e1dc] rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start shadow-sm relative overflow-hidden">
                        {/* Immersive glowing border effect */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-[#9b451c] to-cyan-500" />
                        
                        <div className="md:col-span-5 space-y-4">
                          <div className="flex items-center gap-1.5">
                            <Lightbulb size={16} className="text-[#9b451c]" />
                            <span className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-widest">Co-Creative Sandbox</span>
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl text-[#442a22] font-semibold">Propose a Dignity Initiative</h3>
                          <p className="text-xs text-[#827470] leading-relaxed">
                            Project Ahsaaz is fueled entirely by community-designed initiatives. Propose an earthenware logistics flow, time-banking system, or listening queue here to populate our active idea board!
                          </p>

                          <form onSubmit={handlePublishIdea} className="space-y-3 pt-2">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-[#827470] uppercase">Idea Title</label>
                              <input
                                type="text"
                                value={ideaTitle}
                                onChange={(e) => setIdeaTitle(e.target.value)}
                                placeholder="E.g., Heritage Earthen Porridge Bowls"
                                className="w-full bg-white border border-[#d4c3be] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#9b451c]"
                                required
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-[#827470] uppercase">Focus Category</label>
                              <select
                                value={ideaCategory}
                                onChange={(e) => setIdeaCategory(e.target.value)}
                                className="w-full bg-white border border-[#d4c3be] rounded-xl px-3 py-2 text-xs outline-none text-[#504441]"
                              >
                                <option>Earthenware Crafting</option>
                                <option>Doorstep Time-Banking</option>
                                <option>Dignity Logistics</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-[#827470] uppercase">Concept Description</label>
                              <textarea
                                value={ideaDesc}
                                onChange={(e) => setIdeaDesc(e.target.value)}
                                placeholder="Describe how this restores localized unhurried dignity..."
                                rows={2}
                                className="w-full bg-white border border-[#d4c3be] rounded-xl px-3 py-2 text-xs outline-none resize-none focus:border-[#9b451c]"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider cursor-pointer"
                            >
                              Publish to Sandbox Idea Board
                            </button>
                          </form>
                        </div>

                        {/* Interactive Board display */}
                        <div className="md:col-span-7 space-y-4">
                          <span className="text-[10px] font-mono text-[#827470] uppercase font-bold block border-b border-[#e9e1dc] pb-2">Active Co-Creative Sandbox Board</span>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                            {customIdeas.map((idea) => (
                              <motion.div
                                key={idea.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-white rounded-2xl border border-[#efe6e2] space-y-2 relative group/idea"
                              >
                                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                                  {idea.sparkles && (
                                    <div className="text-amber-500">
                                      <Sparkles size={12} className="animate-pulse" />
                                    </div>
                                  )}
                                  {idea.isUserCreated && (
                                    <button
                                      onClick={() => handleDeleteCustomIdea(idea.id)}
                                      className="text-[#827470] hover:text-red-500 transition-colors p-0.5 rounded opacity-0 group-hover/idea:opacity-100 focus:opacity-100 cursor-pointer"
                                      title="Delete idea"
                                      type="button"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                                <span className="inline-block text-[8px] font-mono uppercase font-bold text-[#9b451c] bg-[#ffdbce]/40 px-2 py-0.5 rounded-full">
                                  {idea.category}
                                </span>
                                <h5 className="font-serif text-sm font-semibold text-[#442a22]">{idea.title}</h5>
                                <p className="text-[11px] text-[#827470] leading-relaxed">{idea.desc}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </section>
                    </motion.div>
                  </motion.div>
                )}

                {/* ==================== IMPACT GROVE TAB ==================== */}
                {activeTab === 'impact' && (
                  <motion.div
                    key="tab-impact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative min-h-[600px] overflow-hidden rounded-3xl glass-glossy"
                  >
                    {/* Background Ambient Eye-Dashing Image with Glossy Sparkling Classy Retrofitted Shining Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-shiny-retro">
                      {/* Retro Grid Overlay */}
                      <div className="absolute inset-0 retro-grid opacity-35" />
                      
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=50"
                        alt="Sanctuary Forest Grove"
                        className="w-full h-full object-cover mix-blend-overlay animate-pulse-slow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/50 via-transparent to-[#fff8f5]/50 backdrop-blur-[1.5px]" />
                      
                      {/* Interactive Sparkles/Sparks */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>

                    {/* Staggered Content Animation Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="relative z-10 space-y-8"
                    >
                    {/* Garden header with Interactive Watering Action */}
                    <div className="max-w-5xl mx-auto px-4 pt-12 text-center space-y-4">
                      <span className="text-xs font-mono text-[#9b451c] uppercase tracking-widest font-bold">The Digital Sanctuary Grove</span>
                      <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold">The Seed of Hope Grove</h2>
                      <p className="font-sans text-xs md:text-sm text-[#827470] max-w-xl mx-auto leading-relaxed">
                        Every signed-up volunteer plants a beautiful digital sprout in our sanctuary garden. Use the interactive tools below to water the soil and stimulate growth!
                      </p>

                      <div className="flex justify-center gap-3 pt-2 relative">
                        {/* Simulated falling drops when active */}
                        {isWatering && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden h-40">
                            {waterDrops.map(drop => (
                              <motion.div
                                key={drop.id}
                                initial={{ y: -40, opacity: 1 }}
                                animate={{ y: 160, opacity: 0 }}
                                transition={{ duration: 1.2, ease: "linear" }}
                                className="absolute w-[2px] h-6 bg-cyan-400/50 rounded-full"
                                style={{ left: `${drop.left}%` }}
                              />
                            ))}
                          </div>
                        )}

                        <button
                          onClick={handleWaterGarden}
                          disabled={isWatering}
                          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-200 text-white px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-102 cursor-pointer"
                        >
                          {isWatering ? "Showering Empathy Rain..." : "🌧️ Shower Rain on Grove"}
                        </button>
                      </div>
                    </div>

                    <EmpathyGrove signups={signups} onRefresh={fetchSignups} />
                    </motion.div>
                  </motion.div>
                )}

                {/* ==================== JOIN US TAB ==================== */}
                {activeTab === 'join' && (
                  <motion.div
                    key="tab-join"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative min-h-[600px] overflow-hidden rounded-3xl glass-glossy"
                  >
                    {/* Background Ambient Eye-Dashing Image with Glossy Sparkling Classy Retrofitted Shining Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-shiny-retro">
                      {/* Retro Grid Overlay */}
                      <div className="absolute inset-0 retro-grid opacity-35" />
                      
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?auto=format&fit=crop&w=1000&q=50"
                        alt="National Sowers Group"
                        className="w-full h-full object-cover mix-blend-overlay animate-pulse-slow"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/50 via-transparent to-[#fff8f5]/50 backdrop-blur-[1.5px]" />
                      
                      {/* Interactive Sparkles/Sparks */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-12 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
                        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-[#fe9162] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 right-12 w-3 h-3 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                        <div className="absolute bottom-1/3 left-12 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>

                    {/* Staggered Content Animation Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="relative z-10 space-y-4"
                    >
                      <ParallaxSignup onSignupSuccess={handleSignupSuccess} />
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </main>

            {/* 9. INTERACTIVE SOWING PLEDGE MODAL */}
            <AnimatePresence>
              {donationModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 10 }}
                    className="bg-[#fff8f5] rounded-3xl p-6 md:p-8 max-w-md w-full border border-[#efe6e2] shadow-2xl relative"
                  >
                    {/* Close Trigger */}
                    <button
                      onClick={() => {
                        setDonationModalOpen(false);
                        setDonationSuccess(false);
                      }}
                      className="absolute top-4 right-4 text-[#827470] hover:text-[#442a22] font-mono text-xs cursor-pointer"
                    >
                      ✕ Close
                    </button>

                    {!donationSuccess ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-flex p-3 rounded-full bg-[#ffdbce] text-[#9b451c] mb-3">
                            <Sprout size={24} className="animate-bounce" />
                          </div>
                          <h3 className="font-serif text-2xl text-[#442a22] font-semibold">Sow a Care Pledge</h3>
                          <p className="font-sans text-xs text-[#827470] mt-1.5 leading-relaxed">
                            Project Ahsaaz is purely a non-monetary, emotional sanctuary. Pledge your unhurried hours to support isolated elders with true high-dignity presence.
                          </p>
                        </div>

                        {/* Pledge Category Tabs */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-wider">1. Select Pledge Circle</label>
                          <div className="grid grid-cols-3 gap-1 bg-[#fff2ed] p-1 rounded-xl border border-[#efe6e2]">
                            <button
                              type="button"
                              onClick={() => setPledgeCategory('listening')}
                              className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center ${
                                pledgeCategory === 'listening' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
                              }`}
                            >
                              Listening
                            </button>
                            <button
                              type="button"
                              onClick={() => setPledgeCategory('meals')}
                              className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center ${
                                pledgeCategory === 'meals' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
                              }`}
                            >
                              Meals Prep
                            </button>
                            <button
                              type="button"
                              onClick={() => setPledgeCategory('walks')}
                              className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center ${
                                pledgeCategory === 'walks' ? 'bg-[#9b451c] text-white shadow-sm' : 'text-[#827470] hover:text-[#442a22]'
                              }`}
                            >
                              Street Walk
                            </button>
                          </div>
                        </div>

                        {/* Hour Presets */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-wider">2. Monthly Commitment</label>
                            <span className="text-xs font-mono font-bold text-[#9b451c]">{customDonation} Hours/Month</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 text-center">
                            {[4, 8, 16, 32].map((hours) => (
                              <button
                                key={hours}
                                type="button"
                                onClick={() => setCustomDonation(hours)}
                                className={`py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                  customDonation === hours 
                                    ? 'bg-[#9b451c] border-[#9b451c] text-white' 
                                    : 'bg-white border-[#d4c3be] text-[#504441] hover:border-[#fe9162]'
                                }`}
                              >
                                {hours} hrs/mo
                              </button>
                            ))}
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="60"
                            step="1"
                            value={customDonation}
                            onChange={(e) => setCustomDonation(Number(e.target.value))}
                            className="w-full accent-[#9b451c] cursor-pointer h-1 bg-[#e9e1dc] rounded-lg appearance-none mt-2 outline-none"
                          />
                        </div>

                        {/* Custom Pledge Impact text */}
                        <div className="p-3 bg-[#fbf2ed] rounded-xl border border-[#efe6e2] text-xs text-[#504441] text-center italic font-mono leading-relaxed shadow-3xs">
                          {getPledgeImpactStatement(customDonation, pledgeCategory)}
                        </div>

                        <button
                          onClick={() => setDonationSuccess(true)}
                          className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                        >
                          Log My Sanctuary Pledge
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6 space-y-4">
                        <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 animate-bounce">
                          <Sprout size={28} />
                        </div>
                        <h3 className="font-serif text-2xl text-[#442a22] font-semibold">Seed Sowed Successfully!</h3>
                        <p className="font-sans text-xs text-[#504441] leading-relaxed max-w-xs mx-auto">
                          Thank you for trusting Project Ahsaaz. Your beautiful care pledge of <span className="font-bold text-[#9b451c] font-mono">{customDonation} hours/month</span> has been stenciled onto our local volunteer logs.
                        </p>
                        <button
                          onClick={() => {
                            setDonationModalOpen(false);
                            setDonationSuccess(false);
                          }}
                          className="px-6 py-2 rounded-lg bg-[#9b451c] text-white text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Return to Sanctuary
                        </button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 10. Developer Sandbox Server / Email Transmission Monitor */}
            {isDeveloper && <ServerMonitor />}

            {/* 11. Sophisticated High-Vibrancy Rounded Footer */}
            <footer className="mx-4 md:mx-12 mb-12 p-10 md:p-14 bg-gradient-to-br from-[#1e1512] to-[#120a08] border border-[#30211d] rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(28,15,11,0.3)]">
              {/* Vibrant Ambient Glow Blobs inside Footer */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#fe9162]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#9b451c]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start relative z-10">
                <div className="md:col-span-5 space-y-4">
                  <h3 className="font-serif text-3xl font-black tracking-tight text-white">
                    Project <span className="text-amber-400">Ahsaaz</span>
                  </h3>
                  <p className="font-sans text-xs text-[#a89995] max-w-sm leading-relaxed">
                    A collaborative student-led grassroots NGO sanctuary slowly preparing unhurried starvation relief walks, healthcare coordination assessments, and ceramicware dining spaces across communities in India.
                  </p>
                </div>
                
                {/* Secondary navigation */}
                <div className="md:col-span-4 grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#d4c3be] uppercase font-bold tracking-wider block border-b border-[#30211d] pb-1">Sanctuary Tabs</span>
                    <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-xs text-[#d4c3be] hover:text-amber-400 text-left transition-colors cursor-pointer">01 // Home</button>
                    <button onClick={() => { setActiveTab('philosophy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-xs text-[#d4c3be] hover:text-amber-400 text-left transition-colors cursor-pointer">02 // Philosophy</button>
                    <button onClick={() => { setActiveTab('what-we-do'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-xs text-[#d4c3be] hover:text-amber-400 text-left transition-colors cursor-pointer">03 // What We Do</button>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#d4c3be] uppercase font-bold tracking-wider block border-b border-[#30211d] pb-1">Get Involved</span>
                    <button onClick={() => { setActiveTab('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-xs text-[#d4c3be] hover:text-amber-400 text-left transition-colors cursor-pointer">07 // Sowing Portal</button>
                    <button onClick={() => { setActiveTab('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-xs text-[#d4c3be] hover:text-amber-400 text-left transition-colors cursor-pointer">06 // Empathy Grove</button>
                    <button onClick={() => setDonationModalOpen(true)} className="block text-xs text-amber-400 hover:text-amber-300 text-left font-semibold transition-colors cursor-pointer">🌱 // Sowing Pledge</button>
                  </div>
                </div>

                <div className="md:col-span-3 text-left md:text-right space-y-4">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">Dignity Directive</span>
                  <p className="text-xs text-[#d4c3be] leading-relaxed italic">
                    "Every person is a welcoming guest, not a transaction statistics row."
                  </p>
                  <p className="text-[11px] text-[#827470] pt-2 flex flex-wrap items-center justify-start md:justify-end gap-1.5">
                    <span>© 2026 Project Ahsaaz. Student-led NGO. Sanctuary of Belonging.</span>
                    <button 
                      onClick={() => setShowDevModal(true)}
                      className="text-[#827470]/60 hover:text-amber-500 transition-colors cursor-pointer inline-flex items-center"
                      title="Developer Console Portal"
                      type="button"
                    >
                      {isDeveloper ? (
                        <span className="text-[9px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">DEV_ON</span>
                      ) : (
                        <span className="text-[9px] font-mono hover:underline">DEV_PORTAL</span>
                      )}
                    </button>
                  </p>
                </div>
              </div>
            </footer>

            {/* Developer Authentication Modal */}
            <AnimatePresence>
              {showDevModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="bg-[#1e1b18] border border-white/10 p-6 rounded-3xl max-w-sm w-full text-white space-y-4 shadow-2xl relative"
                  >
                    <button
                      onClick={() => {
                        setShowDevModal(false);
                        setDevTokenInput('');
                        setDevAuthError('');
                      }}
                      className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer text-sm font-mono"
                    >
                      ✕
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <Terminal className="text-[#fe9162]" size={20} />
                      <h4 className="font-mono text-sm font-bold tracking-wider uppercase text-[#fff8f5]">
                        {isDeveloper ? "Developer Control Panel" : "Developer Authentication"}
                      </h4>
                    </div>

                    {isDeveloper ? (
                      <div className="space-y-4">
                        <p className="text-xs text-[#a89995] leading-relaxed">
                          You are authenticated as developer. The Developer Mailbox &amp; Server Monitor is now unlocked and fully active on your interface.
                        </p>
                        <button
                          onClick={() => {
                            setIsDeveloper(false);
                            localStorage.removeItem('project_ahsaaz_dev_token');
                            setShowDevModal(false);
                          }}
                          className="w-full bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Revoke Dev Credentials
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const token = devTokenInput.trim();
                        if (!token) {
                          setDevAuthError('Please enter a token.');
                          return;
                        }
                        try {
                          const response = await fetch('/api/dev/auth', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token }),
                          });
                          const data = await response.json();
                          if (response.ok && data.success) {
                            setIsDeveloper(true);
                            localStorage.setItem('project_ahsaaz_dev_token', token);
                            setShowDevModal(false);
                            setDevTokenInput('');
                            setDevAuthError('');
                          } else {
                            setDevAuthError(data.error || 'Access Denied: Invalid Developer Access Token.');
                          }
                        } catch (err) {
                          setDevAuthError('Failed to connect to the authentication server.');
                        }
                      }} className="space-y-4">
                        <p className="text-xs text-[#a89995] leading-relaxed">
                          Enter your authorized developer access token (generated in the server logs at startup) to enable the background SMTP transmission logs and Server Monitor.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-[#827470] tracking-wider block">Developer Access Token</label>
                          <input
                            type="text"
                            required
                            value={devTokenInput}
                            onChange={(e) => {
                              setDevTokenInput(e.target.value);
                              setDevAuthError('');
                            }}
                            placeholder="Enter 12-char token"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#fe9162] text-white font-mono"
                          />
                        </div>
                        {devAuthError && (
                          <p className="text-[10px] text-red-400 font-mono">{devAuthError}</p>
                        )}
                        <button
                          type="submit"
                          className="w-full bg-[#fe9162] hover:bg-[#ffaa85] text-black py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Verify Identity
                        </button>
                      </form>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
