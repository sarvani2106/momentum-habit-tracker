import React from 'react';
import { motion } from 'framer-motion';

export const HABIT_CATEGORIES = {
  All: { icon: '🎛️' },
  Study: { icon: '📚' },
  Fitness: { icon: '💪' },
  Health: { icon: '🥗' },
  Personal: { icon: '✨' },
  Work: { icon: '💼' },
  Finance: { icon: '💰' },
  Custom: { icon: '📌' }
};

export default function HabitsCategoryFilters({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex overflow-x-auto pb-4 gap-2 hide-scrollbar items-center">
      {Object.entries(HABIT_CATEGORIES).map(([cat, config], idx) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`
              relative px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap
              ${isActive 
                ? 'bg-slate-900 text-white' 
                : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }
            `}
          >
            {isActive && (
              <motion.div 
                layoutId="activeCategory" 
                className="absolute inset-0 bg-slate-900 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {config.icon} {cat}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
