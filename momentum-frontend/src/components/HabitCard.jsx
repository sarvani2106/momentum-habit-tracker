import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Flame, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function HabitCard({ habit, isCompleted, onCheckOff, onDelete, catConfig, delay = 0 }) {
  const icon = catConfig?.icon || '📌';
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    
    const handleScroll = () => setShowMenu(false);

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showMenu]);

  const dropdownMenu = showMenu ? createPortal(
    <div 
      className="absolute z-[9999]" 
      style={{ top: menuPos.top, right: menuPos.right }}
      ref={menuRef}
    >
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden"
        >
          <button className="w-full text-left px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors">
            <Edit2 size={16} /> Edit Habit
          </button>
          <div className="h-px bg-slate-100 my-1 mx-3" />
          <button 
            onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(habit); }}
            className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium transition-colors"
          >
            <Trash2 size={16} /> Delete
          </button>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay, duration: 0.4, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        className={`relative p-5 rounded-[2rem] bg-white transition-all duration-500 group border border-slate-100/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          ${isCompleted ? 'opacity-60' : ''}
        `}
      >
        {/* Top Row: Icon + Title + Kebab */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center text-lg bg-slate-50 text-slate-800 transition-colors ${isCompleted ? 'bg-transparent grayscale' : 'group-hover:bg-indigo-50'}`}>
            {icon}
          </div>
          
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className={`font-bold text-[15px] leading-snug transition-colors duration-500 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'} truncate`}>
              {habit.name}
            </h3>
          </div>

          {/* Kebab Menu */}
          <div className="flex-shrink-0">
            <button 
              ref={buttonRef}
              onClick={toggleMenu}
              className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Row: Meta + Check Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center text-xs font-medium text-slate-400 whitespace-nowrap">
              <Calendar size={13} className="mr-1 opacity-70" />
              Every day
            </div>
            {(habit.currentStreak > 0 || isCompleted) && (
              <div className="flex items-center text-xs font-semibold text-orange-500 whitespace-nowrap">
                <Flame size={13} className="mr-1 opacity-90" />
                {habit.currentStreak || 0} day streak
              </div>
            )}
          </div>

          {/* Check Button */}
          <div className="flex-shrink-0" onClick={() => !isCompleted && onCheckOff(habit.id, habit.name)}>
            <motion.div 
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 border-[2.5px]
                ${isCompleted ? 'bg-green-500 border-green-500 text-white shadow-sm shadow-green-500/20' : 'bg-transparent border-slate-200 text-transparent hover:border-slate-300 hover:bg-slate-50'}
              `}
              whileTap={!isCompleted ? { scale: 0.9 } : {}}
            >
              <Check size={20} strokeWidth={3} className={isCompleted ? 'opacity-100' : 'opacity-0'} />
            </motion.div>
          </div>
        </div>
        
        {/* Gentle Celebration overlay */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div 
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 0, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute inset-0 rounded-[2rem] bg-slate-900 pointer-events-none mix-blend-overlay`}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {dropdownMenu}
    </>
  );
}
