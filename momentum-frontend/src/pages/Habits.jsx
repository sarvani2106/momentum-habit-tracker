import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import RewardPopup from '../components/RewardPopup';
import HabitCard from '../components/HabitCard';
import { useUser } from '../context/UserContext';
import { fetchAuth } from '../utils/api';

const CATEGORIES = {
  Study: { icon: '📚', color: 'text-blue-500 bg-blue-50 border-blue-100' },
  Fitness: { icon: '💪', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  Health: { icon: '🥗', color: 'text-cyan-500 bg-cyan-50 border-cyan-100' },
  Personal: { icon: '✨', color: 'text-purple-500 bg-purple-50 border-purple-100' },
  Work: { icon: '💼', color: 'text-slate-500 bg-slate-100 border-slate-200' },
  Finance: { icon: '💰', color: 'text-orange-500 bg-orange-50 border-orange-100' },
  Custom: { icon: '📌', color: 'text-pink-500 bg-pink-50 border-pink-100' }
};

export default function Habits() {
  const { user, setUser } = useUser();
  const userId = user?.id || 1;
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Personal');
  const [filterCategory, setFilterCategory] = useState('All');
  const [completedHabits, setCompletedHabits] = useState([]);
  const [rewardMessage, setRewardMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAuth(`/api/habit-records/user/${userId}`)
      .then(setHabits)
      .catch(err => console.error(err));
  }, [userId]);

  const handleAddHabit = (e) => {
    e.preventDefault();
    fetchAuth('/api/habit-records', {
      method: 'POST',
      body: JSON.stringify({ name: newHabitName, userId: userId, category: newHabitCategory })
    })
      .then(data => {
        setHabits([...habits, data]);
        setNewHabitName('');
        setIsModalOpen(false);
      })
      .catch(err => alert("Failed to create habit: " + err.message));
  };

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
      });
  };

  const filteredHabits = filterCategory === 'All' ? habits : habits.filter(h => (h.category || 'Custom') === filterCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <RewardPopup message={rewardMessage} />
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-2">
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-text-main)] tracking-tight mb-2">My Habits</h1>
          <p className="text-[var(--color-text-muted)]">Manage and track your daily routines.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 items-center justify-center gap-2 shadow-[0_4px_14px_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)]"
        >
          <Plus size={20} />
          New Habit
        </button>
      </div>

      <div className="soft-card p-6 md:p-8">
        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2 border-b border-[var(--color-border)]">
          <button 
            onClick={() => setFilterCategory('All')} 
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap border shadow-sm
              ${filterCategory === 'All' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-[var(--color-text-muted)] border-slate-200 hover:bg-slate-50'}
            `}
          >
            All
          </button>
          {Object.keys(CATEGORIES).map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilterCategory(cat)} 
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap border shadow-sm
                ${filterCategory === cat ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-[var(--color-text-muted)] border-slate-200 hover:bg-slate-50'}
              `}
            >
              <span>{CATEGORIES[cat].icon}</span> {cat}
            </button>
          ))}
        </div>

        {/* Habit List */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredHabits.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-full text-center py-16 text-[var(--color-text-muted)] bg-slate-50 rounded-3xl border-dashed border-2 border-slate-200"
              >
                No habits found. Add one to build momentum!
              </motion.div>
            ) : (
              filteredHabits.map(habit => (
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
      </div>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-md relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[var(--color-text-main)]">New Habit</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-text-muted)] hover:text-slate-800 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddHabit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Habit Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Meditate for 10 min" 
                    value={newHabitName} 
                    onChange={(e) => setNewHabitName(e.target.value)} 
                    required 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-[var(--color-text-main)] transition-all placeholder:text-slate-400" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Category</label>
                  <select 
                    value={newHabitCategory} 
                    onChange={(e) => setNewHabitCategory(e.target.value)} 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer text-[var(--color-text-main)] appearance-none focus:outline-none focus:border-indigo-500"
                  >
                    {Object.keys(CATEGORIES).map(cat => <option key={cat} value={cat} className="bg-white text-slate-800">{CATEGORIES[cat].icon} {cat}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md mt-2">
                  Create Habit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
