import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Target, CheckCircle2, Trophy, Plus, X } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import HabitCard from '../components/HabitCard';
import HeroSection from '../components/HeroSection';
import RewardPopup from '../components/RewardPopup';
import { useUser } from '../context/UserContext';
import { fetchAuth } from '../utils/api';

const CATEGORIES = {
  Study: { icon: '📚', color: 'text-blue-500 bg-blue-50' },
  Fitness: { icon: '💪', color: 'text-green-500 bg-green-50' },
  Health: { icon: '🥗', color: 'text-cyan-500 bg-cyan-50' },
  Personal: { icon: '✨', color: 'text-purple-500 bg-purple-50' },
  Work: { icon: '💼', color: 'text-slate-500 bg-slate-100' },
  Finance: { icon: '💰', color: 'text-yellow-500 bg-yellow-50' },
  Custom: { icon: '📌', color: 'text-pink-500 bg-pink-50' }
};

export default function Dashboard() {
  const { user, setUser } = useUser();
  const userId = user?.id || 1;
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [rewardMessage, setRewardMessage] = useState(null);

  useEffect(() => {
    fetchAuth(`/api/habit-records/user/${userId}`)
      .then(data => setHabits(data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleCheckOff = (habitId, habitName) => {
    fetchAuth('/api/habit-records/complete', {
      method: 'POST',
      body: JSON.stringify({ habitId: habitId })
    })
      .then(response => {
        if (response.alreadyCompleted) {
           setRewardMessage(`You've already completed ${habitName} today!`);
           setTimeout(() => setRewardMessage(null), 3000);
           return;
        }

        setCompletedHabits([...completedHabits, habitId]);
        setHabits(habits.map(h => h.id === habitId ? { ...h, currentStreak: response.record.currentStreak, longestStreak: response.record.longestStreak } : h));
        
        if (response.xpGained && setUser) {
           setUser(prev => ({...prev, xp: response.totalXp, level: response.level}));
           if (response.leveledUp) {
               setRewardMessage(`LEVEL UP! You reached Level ${response.level}! 🌟`);
           } else {
               setRewardMessage(`+${response.xpGained} XP! ${habitName} completed.`);
           }
        } else {
           setRewardMessage(`Great job! ${habitName} is done.`);
        }
        setTimeout(() => setRewardMessage(null), 4000);
      })
      .catch(err => console.error(err));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const totalHabits = habits.length;
  const totalCompleted = habits.filter(h => completedHabits.includes(h.id) || h.completedToday).length;
  const completionPercentage = totalHabits === 0 ? 0 : Math.round((totalCompleted / totalHabits) * 100);
  const highestStreak = habits.reduce((max, habit) => Math.max(max, habit.currentStreak || 0), 0);
  const currentXp = user?.xp || 0;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      className="flex flex-col gap-8"
    >
      <RewardPopup message={rewardMessage} />
      
      {/* Today Dashboard Hero */}
      <motion.div variants={item} className="soft-card p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-indigo-900 mb-6 tracking-tight">
            {getGreeting()}, {user?.username || 'Builder'} ☀️
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-[var(--color-text-muted)] mb-1">You have completed</p>
            <h2 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
              {completionPercentage}% <span className="text-2xl text-[var(--color-text-main)] font-bold">of today's habits.</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="text-orange-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] font-medium">Current streak</p>
                <p className="text-lg font-bold text-[var(--color-text-main)]">{highestStreak} days</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] font-medium">Next milestone</p>
                <p className="text-lg font-bold text-[var(--color-text-main)]">{Math.ceil((highestStreak + 1) / 5) * 5} days</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-40 translate-y-1/3" />
      </motion.div>

      {/* Top Stats */}
      <motion.div variants={item}>
        <StatsGrid 
          completionPercentage={completionPercentage} 
          totalCompleted={totalCompleted} 
          totalHabits={totalHabits} 
          highestStreak={highestStreak} 
          currentXp={currentXp} 
        />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Habits Preview) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div variants={item} className="soft-card p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--color-text-main)] tracking-tight">Today's Focus</h2>
            </div>

            <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <AnimatePresence>
                {habits.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="col-span-full text-center py-10 text-[var(--color-text-muted)] bg-slate-50 rounded-2xl border-dashed border-slate-200 border-2"
                  >
                    No habits found. Head to the Habits tab to add one!
                  </motion.div>
                ) : (
                  habits.slice(0, 4).map(habit => (
                    <HabitCard 
                      key={habit.id}
                      habit={habit}
                      isCompleted={completedHabits.includes(habit.id) || habit.completedToday}
                      onCheckOff={handleCheckOff}
                      catConfig={CATEGORIES[habit.category] || CATEGORIES.Custom}
                    />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column (AI Coach Preview) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <motion.div variants={item} className="h-full">
            <HeroSection />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}