import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutList, Flame, Trophy, Target, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-1 min-w-[140px] flex flex-col justify-between group hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-${color.split('-')[1]}-500`}>
        <Icon size={20} className="opacity-80" />
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
    
    <div className="flex items-end justify-between">
      <div className="text-3xl font-black text-slate-800 tracking-tight">
        {value}
      </div>
      {trend && (
        <div className="flex items-center text-xs font-bold text-emerald-500 mb-1">
          <TrendingUp size={14} className="mr-1" />
          {trend}
        </div>
      )}
    </div>
  </motion.div>
);

export default function HabitsStatsRow({ habits, completedHabits }) {
  const [stats, setStats] = useState({
    total: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    thisWeek: 0
  });

  useEffect(() => {
    if (!habits.length) return;
    
    const total = habits.length;
    const currentStreak = Math.max(0, ...habits.map(h => h.currentStreak || 0));
    const longestStreak = Math.max(0, ...habits.map(h => h.longestStreak || 0));
    
    // Mock completion rate based on today's checkoffs vs total habits for UI purposes
    const rate = total > 0 ? Math.round((completedHabits.length / total) * 100) : 0;
    
    setStats({
      total,
      currentStreak,
      longestStreak,
      completionRate: rate,
      thisWeek: completedHabits.length + 15 // Mock data for "This Week completed"
    });
  }, [habits, completedHabits]);

  return (
    <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
      <StatCard 
        icon={LayoutList} 
        label="Total Habits" 
        value={stats.total} 
        color="bg-purple-500" 
        delay={0.1}
      />
      <StatCard 
        icon={Flame} 
        label="Current Streak" 
        value={`${stats.currentStreak}d`} 
        color="bg-orange-500" 
        delay={0.2}
      />
      <StatCard 
        icon={Trophy} 
        label="Longest Streak" 
        value={`${stats.longestStreak}d`} 
        color="bg-yellow-500" 
        delay={0.3}
      />
      <StatCard 
        icon={Target} 
        label="Completion Rate" 
        value={`${stats.completionRate}%`} 
        trend="12%"
        color="bg-blue-500" 
        delay={0.4}
      />
      <StatCard 
        icon={TrendingUp} 
        label="This Week" 
        value={`${stats.thisWeek}/25`} 
        color="bg-pink-500" 
        delay={0.5}
      />
    </div>
  );
}
