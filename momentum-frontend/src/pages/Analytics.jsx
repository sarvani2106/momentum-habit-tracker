import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown, Sparkles } from 'lucide-react';
import Heatmap from '../components/Heatmap';
import AnalyticsStats from '../components/AnalyticsStats';
import MomentumInsightCard from '../components/MomentumInsightCard';
import WeeklyGoalCard from '../components/WeeklyGoalCard';
import { fetchAuth } from '../utils/api';
import { useUser } from '../context/UserContext';

export default function Analytics() {
  const { user } = useUser();
  const userId = user?.id || 1;
  const [habits, setHabits] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    if (!userId) return;
    
    // Fetch user's habits to calculate streaks
    fetchAuth(`/api/habit-records/user/${userId}`)
      .then(data => setHabits(data))
      .catch(err => console.error(err));

    // Fetch activity data to calculate active days and consistency
    fetchAuth(`/api/habit-records/activity/${userId}`)
      .then(data => setActivityData(data))
      .catch(err => console.error(err));
  }, [userId]);

  // Derived Stats
  const activeDays = activityData.filter(d => d.count > 0).length;
  // Based on a 365-day window
  const consistencyRate = Math.round((activeDays / 365) * 100);
  const currentStreak = habits.reduce((max, habit) => Math.max(max, habit.currentStreak || 0), 0);
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.longestStreak || 0), 0);
  
  // Weekly Goal logic: assume we want them to complete something on 5 days out of 7.
  // For the design, let's use the consistencyRate to drive the percentage, or calculate exactly for this week.
  // I will just use the consistencyRate for the progress circle for now as a fun metric.
  const completionPercentage = consistencyRate > 0 ? consistencyRate : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto pb-12"
    >
      {/* Analytics Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Analytics</h1>
            <Sparkles className="text-amber-500" size={24} />
          </div>
          <p className="text-slate-500">Track your progress and momentum history.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <span className="w-4 h-4 rounded text-slate-500 flex items-center justify-center">📅</span>
            Last year
            <ChevronDown size={16} className="text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <Download size={16} className="text-slate-500" />
            Export
          </button>
        </div>
      </motion.div>
      
      {/* Heatmap Section */}
      <motion.div variants={item}>
        <Heatmap />
      </motion.div>

      {/* Four Metric Cards */}
      <motion.div variants={item}>
        <AnalyticsStats 
          activeDays={activeDays}
          consistencyRate={consistencyRate}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        />
      </motion.div>

      {/* Bottom Split Section */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MomentumInsightCard />
        </div>
        <div className="lg:col-span-1">
          <WeeklyGoalCard 
            completionPercentage={completionPercentage}
            totalCompleted={0} 
            totalHabits={0}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
