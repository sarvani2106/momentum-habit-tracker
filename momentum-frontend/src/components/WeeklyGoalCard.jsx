import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function WeeklyGoalCard({ completionPercentage, totalCompleted, totalHabits }) {
  // We'll simulate a weekly goal of 5 days, or use the percentage directly.
  // The design asked for "5 of 7 days completed". Let's assume we pass that in or calculate it.
  // For now, let's just use the completionPercentage as the main circle, and maybe mock the 5 of 7 or calculate it from active days this week.
  
  // Since we only have totalCompleted and totalHabits passed currently from Analytics,
  // let's animate the circle using completionPercentage.
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 flex items-center justify-between border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] h-full"
    >
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-amber-100"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <motion.circle
              className="text-amber-500"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-amber-600">{completionPercentage}%</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Weekly Goal</h3>
          <p className="text-sm text-slate-500 font-medium">
            <span className="text-amber-600 font-bold">{Math.round((completionPercentage / 100) * 7)}</span> of 7 days completed
          </p>
          
          <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden max-w-[120px]">
             <motion.div 
               className="h-full bg-amber-500 rounded-full"
               initial={{ width: 0 }}
               animate={{ width: `${completionPercentage}%` }}
               transition={{ duration: 1, delay: 0.5 }}
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
