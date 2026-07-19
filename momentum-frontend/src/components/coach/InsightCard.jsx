import React from 'react';
import { motion } from 'framer-motion';
import Mascot from './Mascot';

export default function InsightCard({ coachData, isLoading, onRefresh }) {
  if (isLoading || !coachData) {
    return (
      <div className="soft-card p-8 animate-pulse bg-slate-50 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <Mascot mood="focused" size="md" />
          <p>Mo is analyzing your patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="soft-card relative overflow-hidden bg-white border-2 border-indigo-50"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-2">
          <Mascot mood={coachData.mood || 'encouraging'} size="xl" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
            {coachData.coachTitle || 'Companion'}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {coachData.greeting}
            </h2>
            <button 
              onClick={onRefresh}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-semibold transition-colors"
            >
              Refresh Insight
            </button>
          </div>
          
          <p className="text-lg text-slate-600 mb-6 italic">
            "{coachData.observation}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wide mb-2">Motivation</h3>
              <p className="text-indigo-900">{coachData.motivation}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wide mb-2">Today's Challenge</h3>
              <p className="text-orange-900">{coachData.challenge}</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 bg-green-50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-1">Suggested Habit</h3>
                <p className="text-green-900">{coachData.suggestedHabit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
