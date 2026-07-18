import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Flame, Trophy } from 'lucide-react';

export default function StatsGrid({ completionPercentage, totalCompleted, totalHabits, highestStreak, currentXp }) {
  const stats = [
    {
      title: "Today's Progress",
      value: `${completionPercentage}%`,
      subtitle: "Completion rate",
      icon: <Target size={24} className="text-blue-500" />,
      bg: "bg-blue-50"
    },
    {
      title: "Tasks Done",
      value: `${totalCompleted} / ${totalHabits}`,
      subtitle: "Active habits",
      icon: <CheckCircle2 size={24} className="text-green-500" />,
      bg: "bg-green-50"
    },
    {
      title: "Top Streak",
      value: highestStreak,
      subtitle: "Days in a row",
      icon: <Flame size={24} className="text-orange-500" />,
      bg: "bg-orange-50"
    },
    {
      title: "Total XP",
      value: currentXp,
      subtitle: "Experience points",
      icon: <Trophy size={24} className="text-purple-500" />,
      bg: "bg-purple-50"
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          variants={item}
          className="soft-card p-6 flex flex-col justify-between h-full group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm border border-black/5`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] leading-tight">{stat.title}</h3>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--color-text-main)] mb-1">{stat.value}</div>
            <div className="text-xs text-[var(--color-text-muted)] font-medium">{stat.subtitle}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
