import React from 'react';
import { motion } from 'framer-motion';

export default function GrowthJourneySection({ coachData }) {
  if (!coachData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="soft-card p-6 bg-white"
      >
        <h3 className="text-lg font-bold text-slate-800 mb-4">Journey Progress</h3>
        
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl">🎯</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-slate-700">Next Milestone: {coachData.nextMilestone} Days</span>
              <span className="text-sm font-bold text-indigo-600">{coachData.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${coachData.progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-indigo-500 h-full rounded-full"
              />
            </div>
          </div>
        </div>
        
        {coachData.celebration && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-xl text-yellow-800 text-sm font-bold text-center animate-pulse">
            🎉 Milestone Reached! Keep up the great work!
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="soft-card p-6 bg-white flex flex-col justify-center"
      >
        <h3 className="text-lg font-bold text-slate-800 mb-2">Mo's Observation</h3>
        <p className="text-slate-600">
          {coachData.pattern || "Keep building your habits to discover new patterns."}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500 italic">
            {coachData.growthSummary}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
