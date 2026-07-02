import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Lightbulb, Heart, Shield, Landmark, MapPin, Layers, RefreshCw } from 'lucide-react';

interface Idea {
  id: string;
  title: string;
  tag: string;
  description: string;
  detailedConcept: string;
  icon: React.ReactNode;
  visualHighlight: string;
}

export default function OurIdeas() {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  const ideas: Idea[] = [
    {
      id: 'dignity-ceramics',
      title: 'Dignity Ceramic Service',
      tag: 'Aesthetic Hospitality',
      description: 'We completely reject paper plates or disposable trays. Every guest at our relief table is served with pristine bone-china ceramic tableware.',
      detailedConcept: 'To truly heal hunger, we must first restore dignity. Disposables treat people like waste. By introducing beautiful, heavy ceramic cups, copper plates, and polished linen, we turn an act of "hand-out charity" into an experience of authentic high-quality hospitality. We sit and wash dishes together with our guests after the meal, fostering deep-seated equality.',
      icon: <Layers className="text-[#9b451c]" size={24} />,
      visualHighlight: 'Bone-China Plates & Handcrafted Linen'
    },
    {
      id: 'vulnerability-mapping',
      title: 'Vulnerability Mapping',
      tag: 'Stepwise Surveys',
      description: 'An empathetic geolocation algorithm that maps extreme, silent isolation of elderly folks living alone behind closed doors.',
      detailedConcept: 'In urban centers, hundreds of elderly people sit behind brick walls with no family and zero food security. Our volunteers perform unhurried, house-by-house, doorstep assessments. We log coordinates, health status, and loneliness indicators into our secure database, ensuring they receive immediate starvation relief and a dedicated listener weekly.',
      icon: <MapPin className="text-[#9b451c]" size={24} />,
      visualHighlight: 'Precise Neighborhood Loneliness Matrix'
    },
    {
      id: 'empathy-circles',
      title: 'Empathy Circle Framework',
      tag: 'Active Friendship',
      description: 'Structured unhurried conversations held at community centers that repair the frayed social fabric of lonely neighborhoods.',
      detailedConcept: 'We believe starvation of food is closely accompanied by starvation of connection. Empathy Circles are non-judgmental, warm group gatherings where isolated community members, volunteers, and donors sit on the same rug to share personal stories, laughter, and emotional weight, keeping minds active and souls comforted.',
      icon: <Heart className="text-[#9b451c]" size={24} />,
      visualHighlight: 'Rug-level Storytelling Sessions'
    }
  ];

  return (
    <section id="innovation-section" className="py-24 bg-[#fff8f5] border-t border-[#e9e1dc]/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-radial from-[#fe9162]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf2ed] text-[#9b451c] text-[11px] font-mono tracking-wider font-semibold uppercase">
            <Lightbulb size={12} />
            <span>Innovation Hub</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#442a22] font-semibold tracking-tight">
            Our Core Ideas
          </h2>
          <p className="font-sans text-sm md:text-base text-[#827470] leading-relaxed">
            Project Ahsaaz goes beyond traditional feeding lines. We pioneer high-dignity frameworks and empathetic systems that heal both physical and mental isolation.
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ideas.map((idea) => {
            const isSelected = selectedIdeaId === idea.id;
            return (
              <motion.div
                key={idea.id}
                layoutId={`card-container-${idea.id}`}
                onClick={() => setSelectedIdeaId(isSelected ? null : idea.id)}
                className={`relative flex flex-col justify-between bg-white rounded-3xl p-6 md:p-8 border transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'border-[#9b451c] shadow-[0_15px_40px_rgba(155,69,28,0.08)] ring-1 ring-[#9b451c]/30' 
                    : 'border-[#e9e1dc] shadow-[0_4px_25px_rgba(68,42,34,0.03)] hover:border-[#9b451c]/60 hover:shadow-[0_12px_30px_rgba(68,42,34,0.06)]'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon & Tag */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#fbf2ed] flex items-center justify-center border border-[#efe6e2]">
                      {idea.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[#9b451c] uppercase bg-[#ffdbce]/40 px-2.5 py-1 rounded-full font-bold">
                      {idea.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl text-[#442a22] font-bold">
                    {idea.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                    {idea.description}
                  </p>

                  {/* Interactive Details Expansion */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-[#e9e1dc]/60 mt-4 space-y-3"
                      >
                        <p className="font-sans text-xs text-[#827470] leading-relaxed">
                          {idea.detailedConcept}
                        </p>
                        <div className="p-3 bg-[#fff8f5] rounded-xl border border-[#efe6e2] text-[11px] font-mono text-[#9b451c]">
                          <span className="font-bold">Execution Metric:</span> {idea.visualHighlight}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-mono font-bold text-[#9b451c] group">
                  <span>{isSelected ? 'Collapse Concept' : 'Explore Concept'}</span>
                  <motion.span
                    animate={isSelected ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↓
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center bg-white border border-[#e9e1dc] rounded-3xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm">
          <h4 className="font-serif text-lg text-[#442a22] font-semibold mb-2">Have an Idea to Expand our Sanctum of Compassion?</h4>
          <p className="font-sans text-xs md:text-sm text-[#827470] mb-4">
            We are always seeking fresh, heartwarming methodologies to support families and isolated elders.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('signup-portal');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#9b451c] hover:bg-[#b04f20] text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Propose an Idea</span>
          </button>
        </div>
      </div>
    </section>
  );
}
