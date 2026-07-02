import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Shield, Users, Compass, Sparkles, Activity, ExternalLink, MapPin
} from 'lucide-react';
import LocalityGuide from './LocalityGuide';

export default function AboutUs() {
  return (
    <section id="about-section" className="py-20 bg-gradient-to-b from-[#fff8f5] via-white to-[#fff8f5] border-t border-[#efe6e2] relative overflow-hidden">
      
      {/* Immersive background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#fe9162]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#9b451c]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* NGO Command Hub Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9b451c]/10 text-[#9b451c] text-xs font-mono tracking-wider font-bold uppercase">
            <Activity size={12} className="text-emerald-500" />
            <span>Project Ahsaaz Grassroots Hub</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#442a22] font-extrabold tracking-tight">
            Our Nationwide Vision
          </h2>
          <p className="font-sans text-sm md:text-base text-[#504441] leading-relaxed">
            Project Ahsaaz is a registered non-governmental organization (NGO) dedicated to rebuilding social bonds and delivering dignity to isolated elders across India, fostering national unity and a true sense of belongingness. We prepare high-dignity care packages, arrange instant medical queues, and hold unhurried, door-to-door listening assessments.
          </p>

          <div className="pt-6">
            <a 
              href="?mode=guide" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#442a22] text-white rounded-2xl text-xs font-mono font-bold uppercase hover:bg-black transition-transform hover:scale-103 cursor-pointer shadow-md"
            >
              <ExternalLink size={14} className="text-amber-300" />
              <span>Launch Fullscreen Protocol Guide in New Tab</span>
            </a>
          </div>
        </div>

        {/* GLOSSY ORGANIZATIONAL LAYERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Genesis Story */}
          <div className="lg:col-span-5">
            <div className="relative p-8 bg-white border border-[#e9e1dc] rounded-3xl shadow-sm space-y-6 overflow-hidden glass-glossy">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=400&q=80" alt="community" className="w-full h-full object-cover" />
              </div>
              
              <div className="inline-flex p-3 rounded-2xl bg-[#ffdbce] text-[#9b451c] shadow-xs">
                <Compass size={22} />
              </div>
              <h3 className="font-serif text-2xl text-[#442a22] font-bold">Our Genesis in Communities</h3>
              <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                Project Ahsaaz did not originate in a sterile boardroom. It blossomed in the local streets of our neighborhoods when we noticed our elderly neighbors sitting in silence, struggling with physical nourishment and a complete loss of emotional security.
              </p>
              <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                We packed hot stenciled care packages, gathered premium ceramic wares, and knocked on doors, asking a transformative question: <em className="text-[#9b451c] font-medium">“May we sit and listen to you today?”</em>
              </p>
              <div className="p-4 bg-[#fff8f5] rounded-2xl border border-[#efe6e2] text-xs font-serif italic text-[#9b451c] font-semibold">
                “We do not deliver charity. We rebuild the broken bridges of human attention.”
              </div>
            </div>
          </div>

          {/* Right Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#827470] uppercase font-extrabold tracking-widest block">Core Organizational Pillars</span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#442a22] font-bold">An NGO Sowing Authentic Kinship</h3>
              <p className="font-sans text-xs md:text-sm text-[#504441] leading-relaxed">
                We reject the cold, transactional nature of standard handouts. We serve our neighborhood guests on fine ceramics, verify transparency with open databases, and train volunteers in slow, door-to-door therapeutic listening.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "Visceral Listening",
                  description: "We don't hear to reply; we listen to understand. Every doorstep assessment begins with an unhurried session where our volunteers sit and hold space for stories.",
                  icon: <Heart size={20} className="text-[#9b451c]" />
                },
                {
                  title: "Radical Hospitality",
                  description: "Feeding is not charity; it is dining together. We serve food on high-quality bone-china dishes to restore dignity and break down the barrier of helper versus helped.",
                  icon: <Users size={20} className="text-[#9b451c]" />
                },
                {
                  title: "Absolute Transparency",
                  description: "Every rupee donated is converted directly into fresh, whole raw ingredients and assessment surveys, verified by our open-source logs.",
                  icon: <Shield size={20} className="text-[#9b451c]" />
                }
              ].map((v, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="p-5 bg-white border border-[#efe6e2] rounded-2xl flex gap-4 items-start shadow-xs hover:border-[#9b451c]/40 transition-colors"
                >
                  <div className="p-3 bg-[#fff8f5] rounded-xl text-[#9b451c] shrink-0 border border-[#e9e1dc]/40">
                    {v.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-[#442a22]">{v.title}</h4>
                    <p className="font-sans text-xs text-[#504441] leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* EMBEDDED HIGHLY GLOSSY STEP-BY-STEP NEIGHBORHOOD ACTION PROTOCOL */}
        <div className="pt-12 border-t border-[#efe6e2]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono text-[#9b451c] uppercase font-extrabold tracking-widest block">Interactive Action Portal</span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#442a22] font-bold mt-2">Neighborhood Care Protocols</h3>
            <p className="font-sans text-xs text-[#827470] mt-1">
              Explore the animated community playbook below. Tap through the interactive checklist of tasks to implement this exact framework in your own street or district.
            </p>
          </div>
          
          <LocalityGuide isStandalone={false} />
        </div>

      </div>
    </section>
  );
}
