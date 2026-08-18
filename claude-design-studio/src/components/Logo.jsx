import React from 'react';

export default function Logo({ size = 'md', className = '', showText = false, textClassName = '' }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dim = sizeMap[size] || sizeMap.md;

  const svgIcon = (
    <svg 
      className={`${dim} ${className} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="anthra-logo-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E07A5F" />
          <stop offset="45%" stopColor="#CC6B49" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="anthra-logo-glow" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0.7" />
        </linearGradient>
        <filter id="anthra-drop" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#CC6B49" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Rounded Container Box */}
      <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#anthra-logo-grad)" filter="url(#anthra-drop)" />
      <rect x="3.5" y="3.5" width="41" height="41" rx="11.5" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

      {/* Geometric Harmonic Optical Star */}
      <g transform="translate(24, 24)">
        {/* 4 Cardinal Curved Petals */}
        <path 
          d="M0 -13 C2 -6, 6 -2, 13 0 C6 2, 2 6, 0 13 C-2 6, -6 2, -13 0 C-6 -2, -2 -6, 0 -13 Z" 
          fill="#FFFFFF" 
          fillOpacity="0.95" 
        />
        
        {/* Diagonal Soft Glow Petals */}
        <path 
          d="M-6 -6 C-3 -3, -3 -1, 0 0 C-3 1, -3 3, -6 6 C-3 3, -1 3, 0 0 C-1 -3, -3 -3, -6 -6 Z" 
          fill="url(#anthra-logo-glow)" 
          transform="rotate(45)" 
          opacity="0.85" 
        />
        <path 
          d="M6 -6 C3 -3, 3 -1, 0 0 C3 1, 3 3, 6 6 C3 3, 1 3, 0 0 C1 -3, 3 -3, 6 -6 Z" 
          fill="url(#anthra-logo-glow)" 
          transform="rotate(45)" 
          opacity="0.85" 
        />

        {/* Center Spark */}
        <circle cx="0" cy="0" r="2.4" fill="#121110" />
        <circle cx="0" cy="0" r="1.2" fill="#FDE68A" />
      </g>
    </svg>
  );

  if (!showText) return svgIcon;

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      {svgIcon}
      <div className="flex items-baseline gap-1.5">
        <span className={`font-bold text-base tracking-tight text-white font-sans ${textClassName}`}>
          Anthra
        </span>
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
          STUDIO
        </span>
      </div>
    </div>
  );
}
