import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Heart, Sparkles, Check, Send, AlertCircle, Info } from 'lucide-react';
import { Signup } from '../types';

interface ParallaxSignupProps {
  onSignupSuccess: (newSignup: Signup) => void;
}

export default function ParallaxSignup({ onSignupSuccess }: ParallaxSignupProps) {
  const [scrollY, setScrollY] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<Signup | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email are required to plant your seed of empathy.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete registration.');
      }

      setSuccessData(data.signup);
      onSignupSuccess(data.signup);

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to the empathy server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="signup-portal"
      className="relative min-h-[900px] w-full flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden bg-[#fff8f5] border-t border-[#e9e1dc]"
    >
      {/* --- PARALLAX LAYERS --- */}
      {/* Layer 1: Sunburst Golden/Terracotta backdrop (moves slowest) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-radial from-[#ffdbce] via-[#fbf2ed] to-transparent blur-[120px]" />
      </div>

      {/* Layer 2: Organic Mountain/Flora silhouettes (moves at medium speed) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-96 pointer-events-none z-0 opacity-30 transition-transform duration-75 flex items-end justify-between"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      >
        {/* Left organic SVG cluster */}
        <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#9b451c]/10 overflow-visible">
          <circle cx="20" cy="110" r="80" fill="currentColor" />
          <circle cx="80" cy="120" r="60" fill="currentColor" />
        </svg>
        {/* Right organic SVG cluster */}
        <svg viewBox="0 0 100 100" className="w-80 h-80 text-[#9b451c]/10 overflow-visible">
          <circle cx="80" cy="110" r="75" fill="currentColor" />
          <circle cx="10" cy="120" r="50" fill="currentColor" />
        </svg>
      </div>

      {/* Layer 3: Gentle Rising Embers/Particles (moves fastest) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-transform duration-75"
        style={{
          transform: `translateY(-${scrollY * 0.12}px)`,
        }}
      >
        <div className="absolute bottom-20 left-10 w-2.5 h-2.5 rounded-full bg-[#fe9162] blur-[1px] opacity-40 animate-pulse" />
        <div className="absolute bottom-48 right-12 w-1.5 h-1.5 rounded-full bg-[#9b451c] blur-[1px] opacity-30 animate-ping" />
        <div className="absolute top-40 left-1/3 w-2 h-2 rounded-full bg-[#ffdbd0] blur-[1px] opacity-50" />
        <div className="absolute top-96 right-1/4 w-3 h-3 rounded-full bg-[#fe9162] blur-[2px] opacity-40" />
      </div>

      {/* --- SIGN-UP CONTAINER --- */}
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!successData ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-[#e9e1dc] shadow-[0_15px_50px_rgba(68,42,34,0.06)] relative overflow-hidden"
            >
              {/* Card top badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdbce] text-[#7c2e05] text-xs font-mono font-semibold uppercase">
                  <Heart size={12} className="fill-[#7c2e05]" />
                  Join the Ahsaaz Circle
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold mb-3">
                  Become a Hand of Support
                </h2>
                <p className="font-sans text-sm md:text-base text-[#827470] max-w-md mx-auto leading-relaxed">
                  Join our group of friends in turning silent feelings into concrete, localized impact. No membership fees. Just active compassion.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-2.5 border border-red-200 text-xs font-medium">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#827470] uppercase font-semibold">Your Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#827470]">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Sarthak Bhat"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-3 pl-11 pr-4 text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40"
                        required
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#827470] uppercase font-semibold">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#827470]">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        placeholder="sarthakbhat2011@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-3 pl-11 pr-4 text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono text-[#827470] uppercase font-semibold">What Empathy Means to You</label>
                    <span className="text-[10px] font-mono text-[#827470]/60 italic">Optional</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="E.g., I want to help pack warm soup on weekends and offer deep, silent listening to those in pain..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-3 px-4 text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40 resize-none"
                  />
                </div>

                {/* Email dispatch disclosure */}
                <div className="p-3.5 bg-[#fbf2ed] rounded-xl border border-[#efe6e2] flex items-start gap-2.5 text-[11px] text-[#827470]">
                  <Info size={16} className="text-[#9b451c] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Developer Directive:</strong> Upon submission, this form triggers a background email relay that instantly transmits your details and an AI reflection to <strong>sarthakbhat2011@gmail.com</strong>.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-102 hover:shadow-[0_8px_20px_rgba(155,69,28,0.25)]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Compassion...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Plant My Seed of Empathy</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#fff8f5] rounded-3xl p-8 md:p-12 border-2 border-[#9b451c]/20 shadow-[0_20px_60px_rgba(155,69,28,0.08)]"
            >
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-4 animate-bounce">
                  <Check size={28} />
                </div>
                <h2 className="font-serif text-3xl text-[#442a22] font-semibold mb-2">
                  Seed Successfully Planted!
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#827470]">
                  A beautiful notification containing your credentials has been drafted and securely dispatched to the administrator inbox at: <span className="text-[#9b451c] font-semibold">sarthakbhat2011@gmail.com</span>
                </p>
              </div>

              {/* Gemini Generated Reflection Box */}
              <div className="bg-white rounded-2xl p-6 border border-[#e9e1dc] shadow-sm mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 text-[#fe9162]/30 pointer-events-none">
                  <Sparkles size={40} />
                </div>
                <h4 className="text-xs font-mono text-[#9b451c] uppercase font-bold tracking-widest mb-3">
                  Your Custom AI Ahsaaz Reflection
                </h4>
                <p className="font-serif text-sm md:text-base text-[#504441] leading-relaxed italic">
                  "{successData.reflection}"
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSuccessData(null)}
                  className="px-6 py-2.5 rounded-lg border border-[#9b451c] text-[#9b451c] hover:bg-[#ffdbce] text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Register Another Member
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
