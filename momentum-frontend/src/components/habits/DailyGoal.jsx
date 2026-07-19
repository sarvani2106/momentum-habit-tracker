import React from 'react';
import { motion } from 'framer-motion';

export default function DailyGoal({ habits, completedHabits }) {
  const total = habits.length;
  const completed = completedHabits.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = Math.max(0, total - completed);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Daily Goal</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {completed}/{total} completed
        </p>
        <p className="text-xs text-indigo-500 font-semibold mt-2">
          {remaining > 0 ? `${remaining} more to go!` : 'Goal reached! 🎉'}
        </p>
        <button className="mt-3 px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition-colors">
          View Goal
        </button>
      </div>

      <div className="relative w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 text-indigo-500">
          <path
            className="text-slate-100"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            strokeWidth="4"
            strokeDasharray={`${percentage}, 100`}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${percentage}, 100` }}
            transition={{ duration: 1, ease: "easeOut" }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-slate-700">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
