import React from 'react';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HabitsHeader({ onNewHabit }) {
  return (
    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6 mb-4">
      <div className="flex-shrink-0">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          My Habits <span className="text-3xl">🌱</span>
        </h1>
        <p className="text-slate-500 mt-2 text-[15px] font-medium">Build small habits, create big changes.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto flex-wrap sm:flex-nowrap">
        <div className="relative w-full sm:flex-1 xl:w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search habits..."
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <button 
          onClick={onNewHabit}
          className="w-full sm:w-auto flex bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Plus size={18} />
          New Habit
        </button>
      </div>
    </div>
  );
}
