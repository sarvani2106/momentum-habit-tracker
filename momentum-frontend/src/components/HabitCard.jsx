import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function HabitCard({ habit, isCompleted, onCheckOff, catConfig }) {
  const icon = catConfig?.icon || '📌';
  const colorClass = catConfig?.color || 'text-indigo-500 bg-indigo-50';
  const textColor = colorClass.split(' ').find(c => c.startsWith('text-'));

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`relative p-5 rounded-3xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 flex items-center justify-between gap-4 group ${isCompleted ? 'opacity-70' : 'hover:shadow-md'}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-black/5 ${colorClass}`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base truncate transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-[var(--color-text-main)]'}`}>
            {habit.name}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">
            🔥 {habit.currentStreak || 0} day streak
          </p>
        </div>
      </div>

      <div className="relative flex-shrink-0 cursor-pointer" onClick={() => !isCompleted && onCheckOff(habit.id, habit.name)}>
        {/* SVG Progress Ring */}
        <svg width="48" height="48" viewBox="0 0 48 48" className={`transform -rotate-90 ${textColor}`}>
          <circle 
            cx="24" cy="24" r="20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            className="opacity-10"
          />
          <motion.circle 
            cx="24" cy="24" r="20" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="4" 
            strokeDasharray="125.6" 
            strokeDashoffset={isCompleted ? 0 : 125.6 * (1 - (habit.progress || 0) / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Check Button inside ring */}
        <motion.div 
          className={`absolute inset-0 flex items-center justify-center m-auto w-8 h-8 rounded-full transition-colors duration-300
            ${isCompleted ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-green-100 group-hover:text-green-500'}
          `}
          whileTap={!isCompleted ? { scale: 0.8 } : {}}
        >
          <Check size={16} strokeWidth={isCompleted ? 3 : 2.5} />
        </motion.div>
      </div>
      
      {/* Celebration overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div 
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 rounded-3xl ${colorClass.split(' ')[1]} pointer-events-none mix-blend-overlay`}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
