import React from 'react';
import { motion } from 'framer-motion';

const BankSVG = () => {
  return (
    <svg width="100%" height="500" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky Background */}
      <rect  width="600" height="500" fill="url(#skyGradient)" rx="0" border-radius="100" />
      
      {/* Ground with more texture */}
      <motion.rect 
        y="450" width="600" height="50" fill="url(#groundGradient)" rx="5"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Bank Building Base with improved shadows */}
      <motion.rect 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        x="100" y="200" width="400" height="250" fill="url(#buildingGradient)" rx="10"
      />
      
      {/* Grand Entrance Steps with improved design */}
      <motion.g
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, staggerChildren: 0.1 }}
      >
        <rect x="80" y="450" width="440" height="15" fill="#555" rx="5" />
        <rect x="100" y="435" width="400" height="15" fill="#666" rx="5" />
        <rect x="120" y="420" width="360" height="15" fill="#777" rx="5" />
        <rect x="140" y="405" width="320" height="15" fill="#888" rx="5" />
      </motion.g>
      
      {/* Columns with more details and better proportions */}
      <motion.g
        initial={{ scaleY: 0.8 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2 }}
      >
        <rect x="120" y="150" width="25" height="300" fill="url(#columnGradient)" rx="5" />
        <rect x="455" y="150" width="25" height="300" fill="url(#columnGradient)" rx="5" />
        {/* Column details */}
        <rect x="120" y="150" width="25" height="15" fill="#C9A227" rx="3" />
        <rect x="120" y="430" width="25" height="20" fill="#C9A227" rx="3" />
        <rect x="455" y="150" width="25" height="15" fill="#C9A227" rx="3" />
        <rect x="455" y="430" width="25" height="20" fill="#C9A227" rx="3" />
        
        {/* Column ornaments */}
        <circle cx="132.5" cy="180" r="3" fill="#FFF" opacity="0.7" />
        <circle cx="132.5" cy="210" r="3" fill="#FFF" opacity="0.7" />
        <circle cx="132.5" cy="240" r="3" fill="#FFF" opacity="0.7" />
        <circle cx="467.5" cy="180" r="3" fill="#FFF" opacity="0.7" />
        <circle cx="467.5" cy="210" r="3" fill="#FFF" opacity="0.7" />
        <circle cx="467.5" cy="240" r="3" fill="#FFF" opacity="0.7" />
      </motion.g>
      
      {/* Roof with more elegant design */}
      <motion.path 
        d="M80 200L110 170H130L150 190H170L190 170H210L230 190H250L270 170H290L310 190H330L350 170H370L390 190H410L430 170H450L470 190H490L510 170H530L550 200V150H80V200Z" 
        fill="url(#roofGradient)"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2 }}
      />
      
      {/* Bank Name Sign with improved shine effect */}
      <motion.g
        animate={{ opacity: [1, 0.9, 1], y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="180" y="120" width="240" height="40" fill="#1A1A1A" rx="8" />
        <rect x="185" y="125" width="230" height="30" fill="#2A2A2A" rx="5" />
        <text x="300" y="148" fontFamily="'Arial Black', Gadget, sans-serif" fontSize="18" fontWeight="bold" fill="#FFD700" textAnchor="middle">GOLDEN TRUST BANK</text>
        
        {/* Sign shine effect */}
        <motion.path 
          d="M200 135L220 125L240 135" 
          stroke="#FFD700" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.g>
      
      {/* Grand Entrance with redesigned double doors */}
      <motion.g>
        {/* Door frame */}
        <rect x="200" y="300" width="200" height="150" fill="#1A1A1A" rx="8" />
        
        {/* Left door */}
        <motion.rect 
          x="200" y="300" width="100" height="150" fill="url(#doorGradient)" rx="5"
          initial={{ x: 200 }}
          animate={{ x: [200, 180, 200] }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatDelay: 12
          }}
          whileHover={{ x: 180 }}
        />
        
        {/* Right door */}
        <motion.rect 
          x="300" y="300" width="100" height="150" fill="url(#doorGradient)" rx="5"
          initial={{ x: 300 }}
          animate={{ x: [300, 320, 300] }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatDelay: 12
          }}
          whileHover={{ x: 320 }}
        />
        
        {/* Door details */}
        <rect x="210" y="310" width="80" height="20" fill="#FFD700" rx="3" />
        <rect x="310" y="310" width="80" height="20" fill="#FFD700" rx="3" />
        
        {/* Door handles */}
        <motion.circle 
          cx="280" cy="380" r="6" fill="#FFD700"
          whileHover={{ scale: 1.5 }}
        />
        <motion.circle 
          cx="320" cy="380" r="6" fill="#FFD700"
          whileHover={{ scale: 1.5 }}
        />
        
        {/* Decorative elements */}
        <path d="M230 340H270V350H230V340Z" fill="#FFD700" opacity="0.7" rx="2" />
        <path d="M330 340H370V350H330V340Z" fill="#FFD700" opacity="0.7" rx="2" />
        <path d="M230 370H270V380H230V370Z" fill="#FFD700" opacity="0.7" rx="2" />
        <path d="M330 370H370V380H330V370Z" fill="#FFD700" opacity="0.7" rx="2" />
        
        {/* Welcome mat */}
        <motion.rect 
          x="250" y="450" width="100" height="10" fill="#8B4513" rx="3"
          animate={{ y: [450, 448, 450] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="300" y="458" fontFamily="Arial" fontSize="8" fill="#FFD700" textAnchor="middle">WELCOME</text>
      </motion.g>
      
      {/* Windows with improved design */}
      <motion.g>
        {/* Left window */}
        <motion.g
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <rect x="150" y="250" width="80" height="80" fill="url(#windowGradient)" rx="5" />
          <rect x="155" y="255" width="70" height="70" fill="#1A1A1A" opacity="0.3" rx="3" />
          <line x1="150" y1="290" x2="230" y2="290" stroke="#FFD700" strokeWidth="2" />
          <line x1="190" y1="250" x2="190" y2="330" stroke="#FFD700" strokeWidth="2" />
          {/* Window shine */}
          <motion.rect 
            x="160" y="260" width="15" height="15" fill="white" opacity="0.4" rx="2"
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Right window */}
        <motion.g
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          <rect x="370" y="250" width="80" height="80" fill="url(#windowGradient)" rx="5" />
          <rect x="375" y="255" width="70" height="70" fill="#1A1A1A" opacity="0.3" rx="3" />
          <line x1="370" y1="290" x2="450" y2="290" stroke="#FFD700" strokeWidth="2" />
          <line x1="410" y1="250" x2="410" y2="330" stroke="#FFD700" strokeWidth="2" />
          {/* Window shine */}
          <motion.rect 
            x="380" y="260" width="15" height="15" fill="white" opacity="0.4" rx="2"
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.g>
      </motion.g>
      
      {/* Enhanced Security Guard */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Head */}
        <circle cx="180" cy="380" r="15" fill="#F5D0A9" />
        {/* Face details */}
        <ellipse cx="175" cy="375" rx="1.5" ry="2" fill="#000" />
        <ellipse cx="185" cy="375" rx="1.5" ry="2" fill="#000" />
        <path d="M177 385Q180 388 183 385" stroke="#000" strokeWidth="1" fill="none" />
        {/* Body */}
        <rect x="170" y="395" width="20" height="30" fill="#2E64FE" rx="3" />
        {/* Arms */}
        <motion.rect 
          x="160" y="395" width="10" height="20" fill="#2E64FE" rx="3"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.rect 
          x="190" y="395" width="10" height="20" fill="#2E64FE" rx="3"
          animate={{ rotate: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        {/* Legs */}
        <motion.rect 
          x="170" y="425" width="8" height="20" fill="#0B2161"
          animate={{ y: [425, 423, 425] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.rect 
          x="182" y="425" width="8" height="20" fill="#0B2161"
          animate={{ y: [425, 427, 425] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
        {/* Hat */}
        <rect x="165" y="365" width="30" height="12" fill="#0B2161" rx="3" />
        <rect x="175" y="360" width="10" height="5" fill="#0B2161" rx="2" />
        {/* Badge */}
        <circle cx="180" cy="405" r="4" fill="#FFD700" />
        {/* Walkie-talkie */}
        <rect x="165" y="400" width="5" height="8" fill="#333" rx="1" />
      </motion.g>
      
      {/* Enhanced Business Woman */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        {/* Head */}
        <circle cx="420" cy="380" r="15" fill="#F7BE81" />
        {/* Face details */}
        <ellipse cx="415" cy="375" rx="1.5" ry="2" fill="#000" />
        <ellipse cx="425" cy="375" rx="1.5" ry="2" fill="#000" />
        <path d="M417 385Q420 388 423 385" stroke="#000" strokeWidth="1" fill="none" />
        {/* Hair */}
        <path d="M420 365C425 365 430 368 430 370C430 368 425 365 420 365Z" fill="#5D4037" />
        {/* Body */}
        <path d="M415 395H425V425H420L417 420H423L420 425H415V395Z" fill="#6E6E6E" rx="3" />
        {/* Arms */}
        <motion.rect 
          x="405" y="395" width="8" height="15" fill="#6E6E6E" rx="3"
          animate={{ rotate: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.rect 
          x="427" y="395" width="8" height="15" fill="#6E6E6E" rx="3"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        {/* Legs */}
        <motion.rect 
          x="415" y="425" width="6" height="20" fill="#424242"
          animate={{ y: [425, 423, 425] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.rect 
          x="423" y="425" width="6" height="20" fill="#424242"
          animate={{ y: [425, 427, 425] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
        />
        {/* Handbag */}
        <motion.rect 
          x="430" y="410" width="10" height="8" fill="#8A4B08" rx="2"
          animate={{ y: [410, 408, 410] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Phone in hand */}
        <motion.rect 
          x="435" y="400" width="5" height="7" fill="#333" rx="1"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Skirt pattern */}
        <rect x="417" y="415" width="6" height="5" fill="#FFD700" opacity="0.5" rx="1" />
      </motion.g>
      
      {/* Enhanced Business Man */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        {/* Head */}
        <circle cx="480" cy="380" r="15" fill="#F5D0A9" />
        {/* Face details */}
        <ellipse cx="475" cy="375" rx="1.5" ry="2" fill="#000" />
        <ellipse cx="485" cy="375" rx="1.5" ry="2" fill="#000" />
        <path d="M477 385Q480 388 483 385" stroke="#000" strokeWidth="1" fill="none" />
        {/* Body */}
        <rect x="470" y="395" width="20" height="30" fill="#2E2E2E" rx="3" />
        {/* Arms */}
        <motion.rect 
          x="460" y="395" width="8" height="15" fill="#2E2E2E" rx="3"
          animate={{ rotate: [0, 25, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.rect 
          x="492" y="395" width="8" height="15" fill="#2E2E2E" rx="3"
          animate={{ rotate: [0, -25, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        {/* Legs */}
        <motion.rect 
          x="470" y="425" width="8" height="20" fill="#151515"
          animate={{ y: [425, 423, 425] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.rect 
          x="482" y="425" width="8" height="20" fill="#151515"
          animate={{ y: [425, 427, 425] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        {/* Tie */}
        <path d="M480 395L475 405H485L480 395Z" fill="#FF0000" />
        {/* Briefcase */}
        <motion.rect 
          x="475" y="415" width="10" height="6" fill="#585858" rx="2"
          animate={{ y: [415, 413, 415] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.rect 
          x="473" y="421" width="14" height="4" fill="#585858" rx="1"
          animate={{ y: [421, 419, 421] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
        {/* Hair */}
        <rect x="470" cy="365" width="20" height="5" fill="#000" rx="2" />
      </motion.g>
      
      {/* Enhanced ATM Machine */}
      <motion.g
        whileHover={{ scale: 1.05 }}
      >
        <rect x="270" y="260" width="60" height="100" fill="#333" rx="5" />
        <rect x="280" y="270" width="40" height="40" fill="#1C1C1C" rx="3" />
        <rect x="280" y="320" width="40" height="10" fill="#222" rx="2" />
        
        {/* Screen animation */}
        <motion.rect 
          x="285" y="275" width="30" height="30" fill="#00C853" rx="2"
          animate={{ fill: ["#00C853", "#00796B", "#00C853"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Buttons */}
        <motion.circle 
          cx="290" cy="340" r="4" fill="#FFD700" 
          animate={{ fill: ["#FFD700", "#FFFF00", "#FFD700"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle 
          cx="310" cy="340" r="4" fill="#FFD700" 
          animate={{ fill: ["#FFD700", "#FFFF00", "#FFD700"], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Card slot */}
        <rect x="280" y="350" width="40" height="4" fill="#222" rx="1" />
        
        {/* Money dispenser */}
        <motion.rect 
          x="285" y="360" width="30" height="5" fill="#444" rx="1"
          animate={{ height: [5, 10, 5] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
      </motion.g>
      
      {/* Money flying out of ATM - enhanced */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        <motion.rect 
          x="330" y="360" width="20" height="10" fill="#4CAF50" rx="2"
          animate={{ 
            x: [330, 350, 370],
            y: [360, 355, 350],
            rotate: [0, 15, 30]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
        <motion.rect 
          x="330" y="365" width="20" height="10" fill="#2E7D32" rx="2"
          animate={{ 
            x: [330, 345, 360],
            y: [365, 360, 355],
            rotate: [0, -15, -30]
          }}
          transition={{ 
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 0.3
          }}
        />
        <motion.rect 
          x="330" y="370" width="20" height="10" fill="#4CAF50" rx="2"
          animate={{ 
            x: [330, 340, 350],
            y: [370, 365, 360],
            rotate: [0, 10, 20]
          }}
          transition={{ 
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 0.6
          }}
        />
      </motion.g>
      
      {/* Enhanced Clouds */}
      <motion.g
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity }}
      >
        <ellipse cx="50" cy="80" rx="40" ry="25" fill="white" opacity="0.9" />
        <ellipse cx="90" cy="70" rx="35" ry="20" fill="white" opacity="0.9" />
        <ellipse cx="550" cy="100" rx="50" ry="30" fill="white" opacity="0.9" />
        <ellipse cx="510" cy="90" rx="40" ry="25" fill="white" opacity="0.9" />
        <ellipse cx="300" cy="50" rx="60" ry="35" fill="white" opacity="0.9" />
        <ellipse cx="350" cy="40" rx="50" ry="30" fill="white" opacity="0.9" />
      </motion.g>
      
      {/* Birds */}
      <motion.g
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <path d="M50 120Q55 115 60 120" stroke="#333" strokeWidth="1.5" fill="none" />
        <path d="M70 110Q75 105 80 110" stroke="#333" strokeWidth="1.5" fill="none" />
        <path d="M500 80Q505 75 510 80" stroke="#333" strokeWidth="1.5" fill="none" />
        <path d="M520 90Q525 85 530 90" stroke="#333" strokeWidth="1.5" fill="none" />
      </motion.g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#B3E5FC" />
          <stop offset="100%" stopColor="#E0F7FA" />
        </linearGradient>
        
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="50%" stopColor="#4E342E" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
        
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        
        <linearGradient id="columnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
        
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3F3F3F" />
          <stop offset="50%" stopColor="#2F2F2F" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A4A4A" />
          <stop offset="50%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#4A4A4A" />
        </linearGradient>
        
        <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.1" />
          <stop offset="30%" stopColor="#FFA500" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#FFA500" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
        </linearGradient>
        
        <radialGradient id="lightEffect" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="70%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Light effects */}
      <motion.circle 
        cx="300" cy="150" r="120" fill="url(#lightEffect)" opacity="0.4"
        animate={{ r: [120, 125, 120] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Sun */}
      <motion.circle 
        cx="500" cy="80" r="40" fill="#FFC107" 
        animate={{ cx: [500, 510, 500], cy: [80, 85, 80] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.circle 
        cx="500" cy="80" r="30" fill="#FFEB3B" 
        animate={{ cx: [500, 510, 500], cy: [80, 85, 80] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.circle 
        cx="500" cy="80" r="20" fill="#FFEE58" 
        animate={{ cx: [500, 510, 500], cy: [80, 85, 80] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </svg>
  );
};

export default BankSVG;