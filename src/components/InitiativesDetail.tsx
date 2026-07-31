import React from 'react';
import { motion } from 'motion/react';
import { 
  Flower2, BookOpen, Utensils, Sparkles, Dog, Users, ArrowRight, 
  HeartHandshake, ShieldCheck, CheckCircle2, Sprout, Compass, Star
} from 'lucide-react';

interface InitiativesDetailProps {
  onJoinClick?: () => void;
}

export default function InitiativesDetail({ onJoinClick }: InitiativesDetailProps) {
  const initiativesData = [
    {
      id: 'seniors',
      emoji: '🌼',
      tag: 'Elderly Care & Dignity',
      title: 'Ahsaaz Seniors',
      summary: 'Supporting senior citizens through companionship visits, conversations, assistance, and community engagement.',
      icon: <Flower2 size={24} className="text-[#9b451c]" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'hover:border-amber-500/40',
      keyActivities: [
        'Doorstep companion visits for isolated elders',
        'Assistance with medical queue coordination & prescription sorting',
        'Uninterrupted active listening sessions and story recording',
        'Community elder circles to rebuild social belongingness'
      ],
      impactGoal: 'Targeting 500+ door-to-door elder care visits across pilot neighborhood circles.'
    },
    {
      id: 'education',
      emoji: '📚',
      tag: 'Youth Mentorship & Literacy',
      title: 'Ahsaaz Education',
      summary: 'Free doubt sessions, mentorship, learning support, book drives, and educational opportunities for students.',
      icon: <BookOpen size={24} className="text-[#9b451c]" />,
      gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'hover:border-blue-500/40',
      keyActivities: [
        'Free weekend doubt-clearing sessions for school children',
        'Book, stationery, and learning material donation drives',
        'Student mentorship programs bridging higher education guidance',
        'Basic digital literacy workshops in underserved localities'
      ],
      impactGoal: 'Empowering 300+ students with academic mentorship and essential learning kits.'
    },
    {
      id: 'hunger',
      emoji: '🍛',
      tag: 'Flagship Hunger Relief',
      title: 'Ahsaaz Hunger Relief',
      summary: 'Community food drives, meal distribution, ration support, and partnerships to reduce hunger with dignity.',
      icon: <Utensils size={24} className="text-[#9b451c]" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'hover:border-orange-500/40',
      keyActivities: [
        'Dignified food drives served in traditional clay tableware',
        'Raw grain kit and nutrition ration distribution for vulnerable families',
        'Zero-waste community co-dining events breaking social barriers',
        'Partnerships with local eateries and suppliers for sustainable sourcing'
      ],
      impactGoal: 'Sourcing and serving nourishing meals with 100% biodegradable zero-plastic tableware.'
    },
    {
      id: 'awareness',
      emoji: '🩸',
      tag: 'Public Health & Rights',
      title: 'Ahsaaz Awareness',
      summary: 'Workshops and awareness campaigns on menstrual health, mental well-being, hygiene, environmental responsibility, and other important social issues.',
      icon: <Sparkles size={24} className="text-[#9b451c]" />,
      gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
      borderColor: 'hover:border-rose-500/40',
      keyActivities: [
        'Menstrual health awareness & eco-friendly hygiene kit distribution',
        'Mental health destigmatization & empathetic listening circles',
        'Public hygiene & environmental sustainability workshops',
        'Community safety, rights awareness, and guidance seminars'
      ],
      impactGoal: 'Conducting monthly awareness drives across urban and rural community centers.'
    },
    {
      id: 'paws',
      emoji: '🐾',
      tag: 'Animal Welfare & Protection',
      title: 'Ahsaaz Paws',
      summary: 'Water bowl installations, feeding drives, rescue support partnerships, and care initiatives for street animals.',
      icon: <Dog size={24} className="text-[#9b451c]" />,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'hover:border-emerald-500/40',
      keyActivities: [
        'Handcrafted clay water bowl installations across street corners',
        'Daily stray animal feeding and winter care drives',
        'Partnerships with local animal shelters and rescue volunteers',
        'Rabies awareness and street animal compassion education'
      ],
      impactGoal: 'Installing 200+ earthen water bowls and feeding street animals in local pilot areas.'
    },
    {
      id: 'community',
      emoji: '🤝',
      tag: 'Grassroots Action & Environment',
      title: 'Ahsaaz Community',
      summary: 'Cleanliness drives, donation campaigns, disaster response volunteering, blood donation awareness, tree plantation, and future community projects.',
      icon: <Users size={24} className="text-[#9b451c]" />,
      gradient: 'from-purple-500/10 via-amber-500/5 to-transparent',
      borderColor: 'hover:border-purple-500/40',
      keyActivities: [
        'Neighborhood cleanliness and plastic cleanup drives',
        'Tree plantation and green cover restoration projects',
        'Voluntary blood donation camps and donor registry drives',
        'Emergency response volunteering & seasonal warm clothing drives'
      ],
      impactGoal: 'Mobilizing student volunteers for monthly civic and environmental action.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative space-y-16 animate-fade-in" id="initiatives-detail-page">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial from-[#fe9162]/5 via-[#ffdbce]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-5 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9b451c]/10 text-[#9b451c] text-xs font-mono font-bold uppercase tracking-wider border border-[#9b451c]/20">
          <Compass size={14} className="text-[#fe9162]" />
          <span>Project Ahsaaz Umbrella Directory</span>
        </div>
        
        <h1 className="font-serif text-3xl md:text-5xl text-[#442a22] font-black tracking-tight leading-tight">
          Our Multi-Dimensional Initiatives
        </h1>
        
        <p className="font-sans text-sm md:text-base text-[#504441] leading-relaxed max-w-2xl mx-auto">
          Project Ahsaaz operates as a comprehensive umbrella of community initiatives. Explore each pillar below to see how our student-led movement drives localized impact across education, elder care, hunger relief, public health, animal welfare, and civic action.
        </p>
      </div>

      {/* Detailed Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {initiativesData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`bg-white border border-[#efe6e2] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl ${item.borderColor} transition-all duration-300 relative group overflow-hidden glass-glossy`}
          >
            {/* Subtle Gradient Backdrop */}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-bl-full group-hover:scale-125 transition-transform duration-700 pointer-events-none`} />

            <div className="space-y-5 relative z-10">
              {/* Header Badge */}
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-[#fbf2ed] text-[#9b451c] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#efe6e2]">
                  {item.tag}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#442a22] flex items-center gap-2 mb-2">
                  <span>{item.emoji}</span>
                  <span>{item.title}</span>
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Key Activities List */}
              <div className="space-y-2.5 pt-2 border-t border-[#efe6e2]/80">
                <span className="text-[10px] font-mono text-[#827470] uppercase font-bold tracking-widest block">
                  Core Action Activities:
                </span>
                <ul className="space-y-2 text-xs text-[#504441]">
                  {item.keyActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#9b451c] shrink-0 mt-0.5" />
                      <span className="leading-tight">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Milestone */}
              <div className="p-3 bg-[#fff8f5] rounded-2xl border border-[#efe6e2] text-[11px] font-sans text-[#827470] leading-relaxed">
                <strong className="text-[#9b451c] font-mono uppercase text-[9px] block tracking-wider mb-0.5">Pilot Focus:</strong>
                {item.impactGoal}
              </div>
            </div>

            {/* Card Action Link */}
            <div className="mt-6 pt-4 border-t border-[#efe6e2]/60 flex justify-between items-center text-xs font-mono text-[#827470]">
              <span>Active Ahsaaz Pillar</span>
              <button
                onClick={() => onJoinClick && onJoinClick()}
                className="text-[#9b451c] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer hover:underline"
              >
                Join Initiative <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Call to Action Banner */}
      <div className="relative z-10 bg-gradient-to-r from-[#442a22] to-[#5a382d] rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono uppercase tracking-wider font-bold">
            <Sprout size={13} />
            <span>Co-Create With Us</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Support an Initiative in Your Neighborhood?
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#e9e1dc] leading-relaxed">
            Whether you want to offer an hour of companionship, mentor a student, pack grain kits, install water bowls, or organize local awareness campaigns—your contribution builds a kinder India.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onJoinClick && onJoinClick()}
              className="bg-[#fe9162] hover:bg-[#ffaa85] text-black px-8 py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <span>Become a Hand of Support</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
