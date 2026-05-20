'use client';

import * as React from 'react';

/**
 * Technical MMA Octagon Cage Backdrop Decal
 * Fits into the background, providing an imposing brutalist grid shape.
 */
export const MmaCageDecal: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 800 800"
      className={`absolute select-none pointer-events-none opacity-[0.03] sm:opacity-[0.05] transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Chainlink fence pattern */}
        <pattern id="chainlink" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 L10 0 M10 20 L20 10 M10 0 L20 10 M0 10 L10 20" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Outer Cage Octagon */}
      <polygon points="400,20 780,200 780,600 400,780 20,600 20,200" stroke="currentColor" strokeWidth="3" />
      
      {/* Inner Cage Octagon */}
      <polygon points="400,50 750,210 750,590 400,750 50,590 50,210" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Chainlink Mesh Fill area within inner octagon */}
      <polygon points="400,50 750,210 750,590 400,750 50,590 50,210" fill="url(#chainlink)" />

      {/* Cage Corner Structural Posts */}
      <line x1="400" y1="20" x2="400" y2="50" stroke="currentColor" strokeWidth="4" />
      <line x1="780" y1="200" x2="750" y2="210" stroke="currentColor" strokeWidth="4" />
      <line x1="780" y1="600" x2="750" y2="590" stroke="currentColor" strokeWidth="4" />
      <line x1="400" y1="780" x2="400" y2="750" stroke="currentColor" strokeWidth="4" />
      <line x1="20" y1="600" x2="50" y2="590" stroke="currentColor" strokeWidth="4" />
      <line x1="20" y1="200" x2="50" y2="210" stroke="currentColor" strokeWidth="4" />

      {/* Radial Coordinate Circles */}
      <circle cx="400" cy="400" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />

      {/* Center Fight Logo crosshairs */}
      <path d="M400 370 V430 M370 400 H430" stroke="currentColor" strokeWidth="2" />
      <circle cx="400" cy="400" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Corner Bracket Details */}
      <path d="M 15 15 L 60 15 M 15 15 L 15 60" stroke="currentColor" strokeWidth="2" />
      <path d="M 785 15 L 740 15 M 785 15 L 785 60" stroke="currentColor" strokeWidth="2" />
      <path d="M 15 785 L 60 785 M 15 785 L 15 740" stroke="currentColor" strokeWidth="2" />
      <path d="M 785 785 L 740 785 M 785 785 L 785 740" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

/**
 * Boxing Ring Rope Perspective Backdrop Decal
 * Creates parallel guidelines like ring ropes, stretching dynamically across wide sections.
 */
export const BoxingRingDecal: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1200 400"
      className={`absolute select-none pointer-events-none opacity-[0.03] sm:opacity-[0.05] transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 4 parallel ring ropes running left to right */}
      <line x1="-50" y1="100" x2="1250" y2="100" stroke="currentColor" strokeWidth="4" />
      <line x1="-50" y1="180" x2="1250" y2="180" stroke="currentColor" strokeWidth="4" />
      <line x1="-50" y1="260" x2="1250" y2="260" stroke="currentColor" strokeWidth="4" />
      <line x1="-50" y1="340" x2="1250" y2="340" stroke="currentColor" strokeWidth="4" />

      {/* Horizontal canvas grid lines */}
      <line x1="200" y1="50" x2="200" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="400" y1="50" x2="400" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="600" y1="50" x2="600" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="800" y1="50" x2="800" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="1000" y1="50" x2="1000" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Ring Corner Tension Struts / Turnbuckles */}
      {/* Corner Left */}
      <path d="M 50 20 L 50 380" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      {/* Corner Turnbuckle hooks */}
      <circle cx="50" cy="100" r="6" fill="currentColor" />
      <circle cx="50" cy="180" r="6" fill="currentColor" />
      <circle cx="50" cy="260" r="6" fill="currentColor" />
      <circle cx="50" cy="340" r="6" fill="currentColor" />
      <line x1="50" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="180" x2="120" y2="180" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="260" x2="120" y2="260" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="340" x2="120" y2="340" stroke="currentColor" strokeWidth="2" />

      {/* Corner Right */}
      <path d="M 1150 20 L 1150 380" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      {/* Right Turnbuckle hooks */}
      <circle cx="1150" cy="100" r="6" fill="currentColor" />
      <circle cx="1150" cy="180" r="6" fill="currentColor" />
      <circle cx="1150" cy="260" r="6" fill="currentColor" />
      <circle cx="1150" cy="340" r="6" fill="currentColor" />
      <line x1="1150" y1="100" x2="1080" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="1150" y1="180" x2="1080" y2="180" stroke="currentColor" strokeWidth="2" />
      <line x1="1150" y1="260" x2="1080" y2="260" stroke="currentColor" strokeWidth="2" />
      <line x1="1150" y1="340" x2="1080" y2="340" stroke="currentColor" strokeWidth="2" />

      {/* Ropes Spacers / Ropes Clamps */}
      <line x1="300" y1="80" x2="300" y2="360" stroke="currentColor" strokeWidth="2" />
      <line x1="900" y1="80" x2="900" y2="360" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

/**
 * Premium Technical Boxing Glove Vector Graphic
 * Exquisite blueprint layout of a professional 16oz lace-up boxing glove.
 */
export const BoxingGloveGraphic: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`absolute select-none pointer-events-none opacity-[0.04] sm:opacity-[0.07] transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Padding Dome */}
      <path
        d="M 100 240 C 90 140, 140 60, 240 60 C 310 60, 330 110, 330 180 C 330 250, 280 290, 240 310 C 230 315, 215 320, 200 320 C 180 320, 160 310, 140 290 L 100 240 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Main Glove knuckle crest crease line */}
      <path
        d="M 152 72 Q 220 90, 310 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* Thumb Wrap Layout */}
      <path
        d="M 120 200 C 100 200, 80 210, 70 230 C 60 250, 70 270, 95 285 C 115 295, 135 285, 150 260"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Thumb inner lock stitching */}
      <path
        d="M 105 242 Q 120 245, 137 235"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Glove Cuff Cylinder */}
      <path
        d="M 140 290 L 160 375 C 163 385, 230 385, 240 375 L 240 310"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Cuff Wrap-around details */}
      <path d="M 148 315 H 240" stroke="currentColor" strokeWidth="1" />
      <path d="M 154 340 H 240" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 158 365 H 240" stroke="currentColor" strokeWidth="1" />

      {/* Lace Eyelet Panel */}
      <path
        d="M 190 280 L 195 380 M 215 280 L 210 380"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {/* Laces Crossing (X shape) */}
      <line x1="192" y1="295" x2="213" y2="315" stroke="currentColor" strokeWidth="1.25" />
      <line x1="213" y1="295" x2="192" y2="315" stroke="currentColor" strokeWidth="1.25" />
      <line x1="193" y1="325" x2="212" y2="345" stroke="currentColor" strokeWidth="1.25" />
      <line x1="212" y1="325" x2="193" y2="345" stroke="currentColor" strokeWidth="1.25" />
      
      {/* Stitching guidelines */}
      <circle cx="210" cy="180" r="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="12 6" />
      <circle cx="210" cy="180" r="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
      
      {/* Combat Lab label */}
      <text x="145" y="160" fill="currentColor" className="text-[9px] font-mono tracking-[0.2em] uppercase font-black opacity-30">[ INVICTUS BRD ]</text>
      <text x="145" y="175" fill="currentColor" className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold opacity-35">MODEL 16-OZ</text>
    </svg>
  );
};

/**
 * Premium Technical MMA Glove Blueprint Graphic
 * Sleek visual showing professional segmented knuckles, finger holes, and elastic strap structure.
 */
export const MmaGloveGraphic: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`absolute select-none pointer-events-none opacity-[0.04] sm:opacity-[0.07] transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Knuckle Shield Main Segment */}
      <path
        d="M 110 180 C 110 140, 130 110, 200 110 C 270 110, 290 140, 290 180 C 290 205, 275 220, 255 225 L 240 230 L 160 230 L 145 225 C 125 220, 110 205, 110 180 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Segmented knuckle chambers (4 chambers indicator) */}
      <path d="M 155 110 V 220" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 200 110 V 226" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 245 110 V 220" stroke="currentColor" strokeWidth="1.5" />

      {/* Open-finger guide rings at top (Fingertips are exposed in MMA gloves) */}
      <ellipse cx="132" cy="110" rx="15" ry="10" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="178" cy="107" rx="16" ry="10" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="222" cy="110" rx="16" ry="10" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="268" cy="112" rx="15" ry="10" stroke="currentColor" strokeWidth="1.25" />

      {/* Exposed Palm Under-layer contour */}
      <path d="M 120 220 C 130 260, 270 260, 280 220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

      {/* Heavy Wrist Support strap */}
      <path
        d="M 135 240 L 140 370 C 142 380, 258 380, 265 370 L 265 240 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Elastic Velcro straps winding details */}
      <rect x="142" y="270" width="116" height="40" stroke="currentColor" strokeWidth="1.5" />
      {/* Velcro grid texture */}
      <line x1="145" y1="290" x2="255" y2="290" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
      
      {/* Heavy tension stitching cross bars on strap */}
      <line x1="142" y1="330" x2="258" y2="330" stroke="currentColor" strokeWidth="2" />
      <line x1="142" y1="350" x2="258" y2="350" stroke="currentColor" strokeWidth="1" />

      {/* Thumb Sleeve section */}
      <path
        d="M 115 190 Q 75 220, 88 245 Q 105 260, 135 235"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      
      {/* Double technical ring overlay */}
      <circle cx="200" cy="200" r="145" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 9" />
      <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.5" />

      {/* Technical Labels */}
      <text x="145" y="165" fill="currentColor" className="text-[8px] font-mono tracking-[0.2em] uppercase font-black opacity-30">[ OPEN PALM ]</text>
      <text x="145" y="177" fill="currentColor" className="text-[8px] font-mono tracking-[0.2em] uppercase font-bold opacity-35">CHAMPIONSHIP GRD</text>
    </svg>
  );
};
