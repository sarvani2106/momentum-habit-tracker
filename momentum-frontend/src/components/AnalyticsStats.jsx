import React from 'react';
import { motion } from 'framer-motion';
import { Target, CalendarDays, Flame, Trophy } from 'lucide-react';

export default function AnalyticsStats({ activeDays, consistencyRate, currentStreak, longestStreak }) {
  const stats = [
    {
      title: "Total Active Days",
      value: activeDays,
      subtitle: "out of 365 days",
      icon: <CalendarDays size={24} className="text-emerald-500" />,
      bg: "bg-emerald-100/50"
    },
    {
      title: "Consistency Rate",
      value: `${consistencyRate}%`,
      subtitle: "Your completion rate",
      icon: <Target size={24} className="text-blue-500" />,
      bg: "bg-blue-100/50"
    },
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      subtitle: "Keep it going! 🔥",
      icon: <Flame size={24} className="text-orange-500" />,
      bg: "bg-orange-100/50"
    },
    {
      title: "Longest Streak",
      value: `${longestStreak} days`,
      subtitle: "Great job! 🎉",
      icon: <Trophy size={24} className="text-amber-500" />,
      bg: "bg-amber-100/50"
    }
  ];

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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-8"
    >
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          variants={item}
          className="bg-white rounded-3xl p-6 flex flex-col justify-between group border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-bold text-slate-800 leading-tight">{stat.title}</h3>
          </div>
          <div>
            <div className="text-4xl font-black text-slate-800 mb-2">{stat.value}</div>
            <div className="text-xs text-slate-500 font-medium">{stat.subtitle}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
