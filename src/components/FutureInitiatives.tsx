import React from 'react';
import { motion } from 'motion/react';
import { Flower2, BookOpen, Utensils, Sparkles, Dog, Users, ArrowUpRight } from 'lucide-react';

interface FutureInitiativesProps {
  onExplore?: (initiativeId?: string) => void;
}

export default function FutureInitiatives({ onExplore }: FutureInitiativesProps) {
  const initiatives = [
    {
      id: 'seniors',
      emoji: '🌼',
      tag: 'Elderly Care',
      title: 'Ahsaaz Seniors',
      description: 'Supporting senior citizens through companionship visits, conversations, assistance, and community engagement.',
      icon: <Flower2 size={22} className="text-[#9b451c]" />,
      gradient: 'from-amber-500/10 to-orange-500/10'
    },
    {
      id: 'education',
      emoji: '📚',
      tag: 'Youth Mentorship',
      title: 'Ahsaaz Education',
      description: 'Free doubt sessions, mentorship, learning support, book drives, and educational opportunities for students.',
      icon: <BookOpen size={22} className="text-[#9b451c]" />,
      gradient: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      id: 'hunger',
      emoji: '🍛',
      tag: 'Flagship Initiative',
      title: 'Ahsaaz Hunger Relief',
      description: 'Community food drives, meal distribution, ration support, and partnerships to reduce hunger with dignity.',
      icon: <Utensils size={22} className="text-[#9b451c]" />,
      gradient: 'from-amber-500/10 to-orange-500/10'
    },
    {
      id: 'awareness',
      emoji: '🩸',
      tag: 'Health & Rights',
      title: 'Ahsaaz Awareness',
      description: 'Workshops and awareness campaigns on menstrual health, mental well-being, hygiene, environmental responsibility, and other important social issues.',
      icon: <Sparkles size={22} className="text-[#9b451c]" />,
      gradient: 'from-rose-500/10 to-pink-500/10'
    },
    {
      id: 'paws',
      emoji: '🐾',
      tag: 'Animal Welfare',
      title: 'Ahsaaz Paws',
      description: 'Water bowl installations, feeding drives, rescue support partnerships, and care initiatives for street animals.',
      icon: <Dog size={22} className="text-[#9b451c]" />,
      gradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      id: 'community',
      emoji: '🤝',
      tag: 'Grassroots Action',
      title: 'Ahsaaz Community',
      description: 'Cleanliness drives, donation campaigns, disaster response volunteering, blood donation awareness, tree plantation, and future community projects.',
      icon: <Users size={22} className="text-[#9b451c]" />,
      gradient: 'from-purple-500/10 to-amber-500/10'
    }
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden" id="future-initiatives">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#fe9162]/5 via-[#ffdbce]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9b451c]/10 text-[#9b451c] text-xs font-mono font-bold uppercase tracking-wider border border-[#9b451c]/20">
            <span className="w-2 h-2 rounded-full bg-[#fe9162] animate-pulse" />
            <span>Multi-Dimensional NGO Movement</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-[#442a22] font-black tracking-tight">
            Our Future Initiatives
          </h2>
          
          <p className="font-sans text-sm md:text-base text-[#504441] leading-relaxed max-w-2xl mx-auto">
            Project Ahsaaz is designed as an umbrella of community initiatives, with each project focusing on a different social challenge. As our organization grows, new initiatives will be launched to serve people, animals, and communities through compassion, education, and meaningful action.
          </p>
        </div>

        {/* 6 Initiative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => onExplore && onExplore(item.id)}
              className="bg-white border border-[#efe6e2] rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#fe9162]/40 transition-all duration-300 relative group overflow-hidden cursor-pointer"
            >
              {/* Subtle Corner Gradient Aura */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-bl-full group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#fbf2ed] text-[#9b451c] text-[10px] font-mono font-bold tracking-widest uppercase border border-[#efe6e2]/60">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#442a22] flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span>{item.title}</span>
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#efe6e2]/60 flex justify-between items-center text-xs font-mono text-[#827470]">
                <span>Ahsaaz Umbrella Pillar</span>
                <span className="text-[#9b451c] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                  Explore Details <ArrowUpRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
