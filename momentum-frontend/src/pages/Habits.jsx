import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import RewardPopup from '../components/RewardPopup';
import HabitCard from '../components/HabitCard';
import HabitsHeader from '../components/habits/HabitsHeader';
import HabitsCategoryFilters, { HABIT_CATEGORIES } from '../components/habits/HabitsCategoryFilters';
import HabitsSidebar from '../components/habits/HabitsSidebar';
import { useUser } from '../context/UserContext';
import { fetchAuth } from '../utils/api';

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
  const [habitToDelete, setHabitToDelete] = useState(null);

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

  const confirmDelete = () => {
    if (!habitToDelete) return;
    
    fetchAuth(`/api/habit-records/${habitToDelete.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setHabits(habits.filter(h => h.id !== habitToDelete.id));
        setHabitToDelete(null);
      })
      .catch(err => alert("Failed to delete habit: " + err.message));
  };

  const filteredHabits = filterCategory === 'All' ? habits : habits.filter(h => (h.category || 'Custom') === filterCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto"
    >
      <RewardPopup message={rewardMessage} />
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <HabitsHeader onNewHabit={() => setIsModalOpen(true)} />
          
          <div className="mt-8">
            <HabitsCategoryFilters activeCategory={filterCategory} onSelectCategory={setFilterCategory} />

            <div className="mt-6">
              <motion.div layout className="flex flex-col gap-4">
                <AnimatePresence>
                  {filteredHabits.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="col-span-full flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm"
                    >
                      <div className="text-4xl mb-4 opacity-70">🌱</div>
                      <h3 className="text-lg font-semibold text-slate-800">Start your first habit.</h3>
                      <p className="text-slate-500 text-sm mt-1 max-w-xs">Small actions create big momentum.</p>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm"
                      >
                        + Create Habit
                      </button>
                    </motion.div>
                  ) : (
                    filteredHabits.map((habit, idx) => (
                      <HabitCard 
                        key={habit.id}
                        habit={habit}
                        isCompleted={completedHabits.includes(habit.id) || habit.completedToday}
                        onCheckOff={handleCheckOff}
                        onDelete={setHabitToDelete}
                        catConfig={HABIT_CATEGORIES[habit.category] || HABIT_CATEGORIES.Custom}
                        delay={idx * 0.05}
                      />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <HabitsSidebar habits={habits} completedHabits={completedHabits} />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {habitToDelete && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl w-full max-w-sm relative overflow-hidden text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Delete Habit?</h2>
              <p className="text-slate-500 text-sm mb-8">
                Are you sure you want to delete <span className="font-semibold text-slate-700">"{habitToDelete.name}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setHabitToDelete(null)}
                  className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-2xl transition-colors"
                >
                  Delete Habit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl w-full max-w-md relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">New Habit</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddHabit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Habit Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Read 10 pages" 
                    value={newHabitName} 
                    onChange={(e) => setNewHabitName(e.target.value)} 
                    required 
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 transition-all placeholder:text-slate-400" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Category</label>
                  <select 
                    value={newHabitCategory} 
                    onChange={(e) => setNewHabitCategory(e.target.value)} 
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-base cursor-pointer text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  >
                    {Object.keys(HABIT_CATEGORIES).filter(c => c !== 'All').map(cat => <option key={cat} value={cat} className="bg-white text-slate-800">{HABIT_CATEGORIES[cat].icon} {cat}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-4 rounded-2xl transition-all shadow-lg shadow-slate-900/20 mt-4 text-lg">
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
