import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function AhsaazLogo({ className = "w-12 h-12", size, showText = false }: LogoProps) {
  const dimensions = size ? { width: size, height: size } : {};

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`} style={dimensions}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full filter drop-shadow-sm transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer dotted orbit */}
        <circle cx="250" cy="250" r="215" stroke="#442a22" strokeWidth="2" strokeDasharray="4 6" opacity="0.25" />
        
        {/* Main central circular ring (the earth rim on which figures stand) */}
        <circle cx="250" cy="250" r="185" stroke="#442a22" strokeWidth="3" fill="none" />
        <circle cx="250" cy="250" r="177" stroke="#9b451c" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />

        {/* ==================== 12 O'CLOCK: TWO PEOPLE SHARING BREAD ==================== */}
        <g transform="translate(250, 65)">
          {/* Left Person */}
          <circle cx="-16" cy="-28" r="6.5" fill="#442a22" />
          <path d="M-26 0 C-26 -16, -10 -16, -10 0" stroke="#442a22" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          
          {/* Right Person */}
          <circle cx="16" cy="-28" r="6.5" fill="#442a22" />
          <path d="M10 0 C10 -16, 26 -16, 26 0" stroke="#442a22" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          
          {/* Arms holding bread */}
          <path d="M-12 -12 Q0 -18 12 -12" stroke="#442a22" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          
          {/* Bread loaf */}
          <path d="M-6 -15 Q0 -23 6 -15 Z" fill="#9b451c" />
          {/* Steam */}
          <path d="M-2 -27 Q-1 -31 -2 -34" stroke="#fe9162" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M2 -26 Q3 -30 2 -33" stroke="#fe9162" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>

        {/* ==================== 2 O'CLOCK: SANITIZER / WATER SHARING ==================== */}
        <g transform="rotate(55 250 250) translate(250, 65)">
          {/* Left Giver Person */}
          <circle cx="-16" cy="-28" r="6" fill="#442a22" />
          <path d="M-26 0 C-26 -16, -10 -16, -10 0" stroke="#442a22" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Arm holding bottle */}
          <path d="M-12 -12 Q-2 -14 2 -10" stroke="#442a22" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sanitizer Bottle */}
          <rect x="1" y="-14" width="4" height="7" rx="1" fill="#9b451c" />
          <path d="M3 -14 L3 -17" stroke="#9b451c" strokeWidth="1" />
          {/* Drops falling down */}
          <circle cx="4" cy="-5" r="1.5" fill="#fe9162" />
          <circle cx="6" cy="0" r="1.5" fill="#fe9162" />
          
          {/* Right Receiver Person */}
          <circle cx="16" cy="-28" r="6" fill="#442a22" />
          <path d="M10 0 C10 -16, 26 -16, 26 0" stroke="#442a22" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Cupped hands receiving */}
          <path d="M12 -12 Q6 -10 4 -6" stroke="#442a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* ==================== 4 O'CLOCK: SPROUT OF EMPATHY ==================== */}
        <g transform="rotate(110 250 250) translate(250, 65)">
          {/* Small sprout growing */}
          <path d="M0 0 Q0 -22 6 -32" stroke="#9b451c" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Left Leaf */}
          <path d="M2 -12 Q10 -16 8 -22 Q2 -18 2 -12 Z" fill="#fe9162" />
          {/* Right Leaf */}
          <path d="M4 -22 Q-4 -28 -2 -34 Q4 -28 4 -22 Z" fill="#d29d53" />
        </g>

        {/* ==================== 6 O'CLOCK: GLOBAL COMMONS / HOLDING HANDS ==================== */}
        <g transform="rotate(180 250 250) translate(250, 65)">
          {/* Left Person */}
          <circle cx="-20" cy="-28" r="6.5" fill="#442a22" />
          <path d="M-30 0 C-30 -16, -14 -16, -14 0" stroke="#442a22" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          
          {/* Right Person */}
          <circle cx="20" cy="-28" r="6.5" fill="#442a22" />
          <path d="M14 0 C14 -16, 30 -16, 30 0" stroke="#442a22" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Connected hands holding a global grid sphere */}
          <path d="M-16 -10 Q-10 -15 -10 -15" stroke="#442a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M16 -10 Q10 -15 10 -15" stroke="#442a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Globe in the middle of hands */}
          <g transform="translate(0, -15)">
            <circle cx="0" cy="0" r="11" stroke="#9b451c" strokeWidth="1.5" fill="#fcf8f2" />
            <line x1="-11" y1="0" x2="11" y2="0" stroke="#9b451c" strokeWidth="0.8" />
            <line x1="0" y1="-11" x2="0" y2="11" stroke="#9b451c" strokeWidth="0.8" />
            <path d="M-8 -6 Q0 -3 8 -6" stroke="#9b451c" strokeWidth="0.8" fill="none" />
            <path d="M-8 6 Q0 3 8 6" stroke="#9b451c" strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* ==================== 8 O'CLOCK: SOUP BOWL DELIVERY ==================== */}
        <g transform="rotate(250 250 250) translate(250, 65)">
          {/* Left Delivery Person */}
          <circle cx="-16" cy="-28" r="6" fill="#442a22" />
          <path d="M-26 0 C-26 -16, -10 -16, -10 0" stroke="#442a22" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Delivering arm */}
          <path d="M-12 -12 Q-2 -12 2 -8" stroke="#442a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Steaming Bowl */}
          <path d="M1 -8 Q4 0 7 -8 Z" fill="#9b451c" />
          <path d="M3 -12 Q4 -16 3 -19" stroke="#fe9162" strokeWidth="1" strokeLinecap="round" fill="none" />
          
          {/* Right Person */}
          <circle cx="16" cy="-28" r="6" fill="#442a22" />
          <path d="M10 0 C10 -16, 26 -16, 26 0" stroke="#442a22" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Receiver arm */}
          <path d="M12 -12 Q8 -10 5 -8" stroke="#442a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* ==================== 10 O'CLOCK: COMPASSION FIRST-AID & WISDOM ==================== */}
        <g transform="rotate(305 250 250) translate(250, 65)">
          {/* First Aid Kit */}
          <g transform="translate(-10, -16)">
            <rect x="-7" y="-5" width="14" height="10" rx="1.5" fill="#9b451c" stroke="#442a22" strokeWidth="1" />
            <path d="M-4 -5 L-4 -7 L4 -7 L4 -5" stroke="#442a22" strokeWidth="1" fill="none" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#fcf8f2" strokeWidth="1.5" />
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#fcf8f2" strokeWidth="1.5" />
          </g>

          {/* Open Book and Quill */}
          <g transform="translate(10, -16) rotate(-15)">
            <path d="M-10 -5 Q-5 -7 0 -5 Q5 -7 10 -5 L10 3 Q5 1 0 3 Q-5 1 -10 3 Z" fill="#fcf8f2" stroke="#442a22" strokeWidth="1" />
            <line x1="0" y1="-5" x2="0" y2="3" stroke="#442a22" strokeWidth="1" />
            <path d="M2 -10 Q5 -15 8 -17" stroke="#fe9162" strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* ==================== CENTRAL BRAND GRAPHICS: HINDI अहसास & EMBRACING HANDS ==================== */}
        <g transform="translate(250, 250)">
          {/* Frame/concentric guide circle */}
          <circle cx="0" cy="0" r="105" stroke="#9b451c" strokeWidth="1.5" opacity="0.15" fill="none" />
          
          {/* Terracotta character "ह" top bar and stem */}
          <path d="M -65 -36 L -10 -36" stroke="#9b451c" strokeWidth="10" strokeLinecap="round" />
          <path d="M -45 -36 L -45 -18" stroke="#9b451c" strokeWidth="10" strokeLinecap="round" />
          
          {/* Terracotta character body curve (the loops of "ह") */}
          <path d="M -45 -18 C -45 -10, -22 -10, -22 -18 C -22 -26, -45 -26, -45 -18" stroke="#9b451c" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M -38 -12 C -38 -5, -20 -5, -20 -12" stroke="#9b451c" strokeWidth="10" strokeLinecap="round" fill="none" />
          
          {/* Terracotta wide cupped hand open to receive and hold */}
          <path d="M -42 -2 C -42 16, -26 28, 4 28 C 22 28, 30 18, 32 8" stroke="#9b451c" strokeWidth="10" strokeLinecap="round" fill="none" />

          {/* Golden character "स" top bar and stem */}
          <path d="M -10 -36 L 55 -36" stroke="#d29d53" strokeWidth="10" strokeLinecap="round" />
          <path d="M 32 -36 L 32 16" stroke="#d29d53" strokeWidth="10" strokeLinecap="round" />
          
          {/* Golden character loop/leg */}
          <path d="M 32 -22 C 16 -22, 10 -14, 10 -4 C 10 6, 20 12, 12 28" stroke="#d29d53" strokeWidth="10" strokeLinecap="round" fill="none" />
          
          {/* Golden connecting arm and clasping hand reaching down to rest inside the terracotta hand */}
          <path d="M 32 -10 L 15 -10" stroke="#d29d53" strokeWidth="10" strokeLinecap="round" />
          <path d="M 15 -10 C 2 -10, -8 -2, -12 10" stroke="#d29d53" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M -12 10 Q -8 14, 0 14" stroke="#d29d53" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* ==================== TEXT BRANDING "Ah" and "aaz" ==================== */}
          <text
            x="-125"
            y="14"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="48"
            fontWeight="800"
            fill="#442a22"
            letterSpacing="-1.5"
          >
            Ah
          </text>

          <text
            x="65"
            y="14"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="48"
            fontWeight="800"
            fill="#442a22"
            letterSpacing="-1.5"
          >
            aaz
          </text>
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold text-[#442a22] leading-none">Project Ahsaaz</span>
          <span className="text-[9px] font-mono tracking-widest text-[#9b451c] uppercase font-bold">Sanctuary of Belonging</span>
        </div>
      )}
    </div>
  );
}
