import React from 'react';
import { motion } from 'framer-motion';

export default function WeeklyProgress() {
  // Mocking weekly progress since we don't have historical weekly logs fetched efficiently here yet
  const total = 25;
  const completed = 18;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Weekly Progress</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">{completed} of {total} habits completed</p>
        </div>
        <div className="text-lg font-black text-indigo-600">{percentage}%</div>
      </div>
      
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-indigo-500 h-full rounded-full"
        />
      </div>
    </div>
  );
}
