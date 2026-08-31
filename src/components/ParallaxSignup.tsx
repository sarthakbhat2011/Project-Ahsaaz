import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, User, Phone, Heart, Sparkles, Check, Send, AlertCircle, Info, 
  Sliders, MessageSquare, Users, Zap, PenTool, Mic, Clock, HeartHandshake, Smile, BarChart2
} from 'lucide-react';
import { Signup } from '../types';

interface ParallaxSignupProps {
  onSignupSuccess: (newSignup: Signup) => void;
}

export interface CapabilityQuestion {
  id: string;
  question: string;
  shortLabel: string;
  category: string;
  icon: React.ElementType;
  description: string;
}

export const CAPABILITY_QUESTIONS: CapabilityQuestion[] = [
  {
    id: 'communication',
    question: '1. How would you rate your communication skills??',
    shortLabel: 'Communication Skills',
    category: 'Interpersonal',
    icon: MessageSquare,
    description: 'Ability to articulate thoughts clearly, listen actively, and convey empathy.'
  },
  {
    id: 'outreach',
    question: '2. How comfortable are you with interacting with new people and approaching them for outreach??',
    shortLabel: 'Outreach & Networking',
    category: 'Community Engagement',
    icon: Users,
    description: 'Comfort in starting conversations with strangers, elders, and community partners.'
  },
  {
    id: 'initiative',
    question: '3. How would you rate your ability to take initiative without being constantly instructed??',
    shortLabel: 'Self-Initiative & Drive',
    category: 'Leadership',
    icon: Zap,
    description: 'Proactive problem identification, self-direction, and ownership of tasks.'
  },
  {
    id: 'editing',
    question: '4. How would you rate your editing/content creation skills??',
    shortLabel: 'Content Creation & Editing',
    category: 'Media & Tech',
    icon: PenTool,
    description: 'Writing stories, editing media/posts, crafting posters or documentation.'
  },
  {
    id: 'speaking',
    question: '5. How would you rate your public speaking skills??',
    shortLabel: 'Public Speaking & Pitching',
    category: 'Advocacy',
    icon: Mic,
    description: 'Addressing groups, conducting workshops, presenting Ahsaaz vision with passion.'
  },
  {
    id: 'problem_solving',
    question: '6. How would you rate your problem-solving and time management skills??',
    shortLabel: 'Problem Solving & Time Management',
    category: 'Execution',
    icon: Clock,
    description: 'Managing tight schedules, solving logistics bottlenecks, keeping commitments.'
  },
  {
    id: 'teamwork',
    question: '7. How would you rate your ability to work in a team.??',
    shortLabel: 'Teamwork & Collaboration',
    category: 'Collaboration',
    icon: HeartHandshake,
    description: 'Supporting teammates, resolving conflicts constructively, sharing credit.'
  },
  {
    id: 'caregiving',
    question: '8. How would you rate your ability to interact with children/elderly people.??',
    shortLabel: 'Interacting with Children & Elderly',
    category: 'Empathetic Care',
    icon: Smile,
    description: 'Patience, warmth, deep listening, and respectful caregiving for vulnerable groups.'
  }
];

export function getScoreBadge(score: number) {
  if (score >= 9) return { label: 'Exemplary / Leader', bg: 'bg-[#9b451c] text-white' };
  if (score >= 7) return { label: 'Proficient', bg: 'bg-emerald-700 text-white' };
  if (score >= 4) return { label: 'Competent', bg: 'bg-amber-600 text-white' };
  return { label: 'Developing', bg: 'bg-stone-600 text-white' };
}

export default function ParallaxSignup({ onSignupSuccess }: ParallaxSignupProps) {
  const [scrollY, setScrollY] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // 8 Capability ratings state (default 7/10 for balanced baseline)
  const [ratings, setRatings] = useState<Record<string, number>>({
    communication: 8,
    outreach: 7,
    initiative: 8,
    editing: 6,
    speaking: 7,
    problem_solving: 8,
    teamwork: 9,
    caregiving: 9
  });

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

  const handleRatingChange = (id: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [id]: Math.min(10, Math.max(1, value))
    }));
  };

  // Compute live overall average score
  const ratingValues: number[] = Object.values(ratings);
  const totalRatingSum: number = ratingValues.reduce((acc: number, curr: number) => acc + Number(curr), 0);
  const count: number = ratingValues.length;
  const avgScore: number = count > 0 ? Number(totalRatingSum) / Number(count) : 7.5;
  const overallBadge = getScoreBadge(Math.round(avgScore));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email are required to complete your volunteer application.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone,
          message,
          ratings 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete volunteer assessment registration.');
      }

      setSuccessData(data.signup);
      onSignupSuccess(data.signup);

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="signup-portal"
      className="relative min-h-[900px] w-full flex items-center justify-center py-16 px-4 md:px-8 overflow-hidden bg-[#fff8f5] border-t border-[#e9e1dc]"
    >
      {/* --- PARALLAX LAYERS --- */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-radial from-[#ffdbce] via-[#fbf2ed] to-transparent blur-[120px]" />
      </div>

      <div 
        className="absolute bottom-0 inset-x-0 h-96 pointer-events-none z-0 opacity-30 transition-transform duration-75 flex items-end justify-between"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#9b451c]/10 overflow-visible">
          <circle cx="20" cy="110" r="80" fill="currentColor" />
          <circle cx="80" cy="120" r="60" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 100 100" className="w-80 h-80 text-[#9b451c]/10 overflow-visible">
          <circle cx="80" cy="110" r="75" fill="currentColor" />
          <circle cx="10" cy="120" r="50" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!successData ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-6 md:p-10 border border-[#e9e1dc] shadow-[0_15px_50px_rgba(68,42,34,0.06)] relative overflow-hidden"
            >
              {/* Card top badge */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdbce] text-[#7c2e05] text-xs font-mono font-semibold uppercase">
                  <Heart size={12} className="fill-[#7c2e05]" />
                  Join the Ahsaaz Circle &bull; Capability Assessment
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold mb-3">
                  Become a Hand of Support
                </h2>
                <p className="font-sans text-sm md:text-base text-[#827470] max-w-xl mx-auto leading-relaxed">
                  Provide your profile details and self-evaluate your capabilities across 8 key areas. Your application matrix will be transmitted directly to our developer team inbox.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-2.5 border border-red-200 text-xs font-medium">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* SECTION 1: APPLICANT PROFILE */}
                <div className="space-y-4">
                  <div className="border-b border-[#efe6e2] pb-2 flex items-center gap-2">
                    <User size={16} className="text-[#9b451c]" />
                    <h3 className="font-serif text-base font-semibold text-[#442a22]">Section 1: Volunteer Applicant Profile</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#827470] uppercase font-semibold">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#827470]">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          placeholder="E.g., Aarav Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-2.5 pl-10 pr-3 text-xs md:text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40"
                          required
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#827470] uppercase font-semibold">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#827470]">
                          <Mail size={15} />
                        </div>
                        <input
                          type="email"
                          placeholder="aarav.sharma@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-2.5 pl-10 pr-3 text-xs md:text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#827470] uppercase font-semibold">Phone / WhatsApp</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#827470]">
                          <Phone size={15} />
                        </div>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-2.5 pl-10 pr-3 text-xs md:text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: INTERACTIVE CAPABILITY ASSESSMENT SLIDERS */}
                <div className="space-y-4">
                  <div className="border-b border-[#efe6e2] pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-[#9b451c]" />
                      <h3 className="font-serif text-base font-semibold text-[#442a22]">Section 2: Interactive Volunteer Capability Rating</h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#827470] uppercase bg-[#ffdbce]/40 px-2.5 py-1 rounded-full font-bold">8 Key Questions</span>
                  </div>

                  <p className="text-xs text-[#827470] leading-relaxed">
                    Adjust the interactive rating bars below (from 1 to 10) to self-evaluate your skill proficiency and readiness.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {CAPABILITY_QUESTIONS.map((q) => {
                      const IconComp = q.icon;
                      const currentScore = ratings[q.id] || 7;
                      const percentage = currentScore * 10;
                      const badge = getScoreBadge(currentScore);

                      return (
                        <div key={q.id} className="p-4 bg-[#fff8f5] rounded-2xl border border-[#e9e1dc] space-y-3 shadow-xs hover:border-[#d4c3be] transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <div className="p-2 rounded-xl bg-[#ffdbce]/60 text-[#9b451c] shrink-0 mt-0.5">
                                <IconComp size={16} />
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-[#9b451c] uppercase font-bold tracking-wider">{q.category}</span>
                                <h4 className="font-serif text-xs md:text-sm font-semibold text-[#442a22] leading-snug">{q.question}</h4>
                                <p className="text-[10.5px] text-[#827470] leading-relaxed mt-0.5">{q.description}</p>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Meter Bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-[#827470] font-semibold">Capability Score:</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.bg}`}>
                                {currentScore} / 10 ({percentage}%) &bull; {badge.label}
                              </span>
                            </div>

                            {/* Gradient progress track */}
                            <div className="relative w-full h-2.5 bg-[#e9e1dc] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 via-[#9b451c] to-[#7c2e05] transition-all duration-150 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            
                            <input
                              type="range"
                              min={1}
                              max={10}
                              step={1}
                              value={currentScore}
                              onChange={(e) => handleRatingChange(q.id, parseInt(e.target.value))}
                              className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-[#9b451c]"
                            />

                            {/* Quick selection ticks */}
                            <div className="flex justify-between items-center text-[9px] font-mono text-[#827470] pt-0.5">
                              <span>1 (Low)</span>
                              <div className="flex gap-1">
                                {[1, 3, 5, 7, 8, 9, 10].map((num) => (
                                  <button
                                    key={num}
                                    type="button"
                                    onClick={() => handleRatingChange(q.id, num)}
                                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                                      currentScore === num ? 'bg-[#9b451c] text-white font-bold' : 'bg-white hover:bg-[#ffdbce]/40 text-[#504441] border border-[#d4c3be]'
                                    }`}
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                              <span>10 (Exemplary)</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* OVERALL CAPABILITY SUMMARY CARD */}
                  <div className="p-4 bg-[#442a22] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm mt-4">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="p-3 bg-[#9b451c] rounded-xl text-amber-300">
                        <BarChart2 size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-bold">Overall Candidate Capability Index</span>
                        <h4 className="font-serif text-lg font-bold text-white">
                          Average Score: <span className="text-amber-400">{avgScore.toFixed(1)} / 10</span> ({Math.round(avgScore * 10)}%)
                        </h4>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <span className="inline-block text-xs font-mono font-bold bg-amber-400 text-[#442a22] px-3.5 py-1 rounded-full uppercase shadow-xs">
                        {overallBadge.label} Candidate
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: STATEMENT OF EMPATHY */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono text-[#827470] uppercase font-semibold">What Empathy & Volunteerism Mean to You</label>
                    <span className="text-[10px] font-mono text-[#827470]/60 italic">Optional</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="E.g., I want to help pack warm meals on weekends and offer deep, silent listening to elders in our community..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#fff8f5] rounded-xl border border-[#d4c3be] py-3 px-4 text-xs md:text-sm text-[#1e1b18] focus:border-[#9b451c] focus:ring-2 focus:ring-[#ffdbd0] outline-none transition-all placeholder-[#827470]/40 resize-none"
                  />
                </div>

                {/* Developer Dispatch Notification Notice */}
                <div className="p-3.5 bg-[#fbf2ed] rounded-xl border border-[#efe6e2] flex items-start gap-2.5 text-[11px] text-[#827470]">
                  <Info size={16} className="text-[#9b451c] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Developer Inbox Relay:</strong> Submitting this form triggers a background relay that packages your applicant profile and 8 capability scores into a structured log routed directly to <strong>sarthakbhat2011@gmail.com</strong>.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#9b451c] hover:bg-[#b04f20] text-white py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-101 hover:shadow-[0_8px_20px_rgba(155,69,28,0.25)]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Capability Profile to Developer Mailbox...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Volunteer Capability Assessment</span>
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
                  Volunteer Assessment Successfully Transmitted!
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#827470]">
                  Your applicant profile and 8 capability ratings have been packaged into a structured log and dispatched to the Developer Mailbox at <span className="text-[#9b451c] font-semibold">sarthakbhat2011@gmail.com</span>.
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
                  Submit Another Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
