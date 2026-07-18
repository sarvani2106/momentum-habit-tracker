import React from 'react';
import { motion } from 'framer-motion';

const MOODS = {
  encouraging: {
    emoji: '🌱',
    color: 'bg-green-100 text-green-600',
    animation: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }
  },
  celebratory: {
    emoji: '⭐',
    color: 'bg-yellow-100 text-yellow-500',
    animation: { rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 1.5 } }
  },
  focused: {
    emoji: '🎯',
    color: 'bg-blue-100 text-blue-600',
    animation: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }
  },
  recovering: {
    emoji: '🩹',
    color: 'bg-orange-100 text-orange-500',
    animation: { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 3 } }
  }
};

export default function Mascot({ mood = 'encouraging', size = 'lg' }) {
  const config = MOODS[mood] || MOODS.encouraging;
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-7xl'
  };

  return (
    <motion.div
      animate={config.animation}
      className={`${sizeClasses[size]} rounded-[2rem] ${config.color} flex items-center justify-center shadow-lg border-4 border-white`}
    >
      {config.emoji}
    </motion.div>
  );
}
