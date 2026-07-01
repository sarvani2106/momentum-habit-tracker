import { useState, useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import ProgressChart from '../components/ProgressChart';
import RewardPopup from '../components/RewardPopup';

// --- NEW: Category Configuration ---
const CATEGORIES = {
  Study: { icon: '📚', color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20' },
  Fitness: { icon: '💪', color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20' },
  Health: { icon: '🥗', color: 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20' },
  Personal: { icon: '✨', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20' },
  Work: { icon: '💼', color: 'text-gray-600 dark:text-gray-400 bg-gray-500/10 border-gray-500/20' },
  Finance: { icon: '💰', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  Custom: { icon: '📌', color: 'text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20' }
};

function Dashboard({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Personal'); // Form State
  const [filterCategory, setFilterCategory] = useState('All'); // Filter State
  const [completedHabits, setCompletedHabits] = useState([]);
  const [rewardMessage, setRewardMessage] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/api/habit-records/user/${user.id}`)
        .then(r => r.json())
        .then(setHabits)
        .catch(err => console.error("Error fetching habits:", err));
    }
  }, [user]);

  const handleAddHabit = (e) => {
    e.preventDefault();
    
    // 1. Package the data
    const payload = { 
      name: newHabitName, 
      userId: user.id,
      category: newHabitCategory 
    };
    
    // 2. SPY ON THE DATA BEFORE IT LEAVES
    console.log("🚀 REACT IS SENDING THIS PAYLOAD TO JAVA:", payload);

    fetch('http://localhost:8080/api/habit-records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(data => {
      console.log("✅ JAVA REPLIED WITH:", data);
      setHabits([...habits, data]);
      setNewHabitName('');
    });
  };

  const handleCheckOff = (habitId, habitName) => {
    fetch('http://localhost:8080/api/habit-records/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habitId: habitId })
    })
    .then(r => r.json())
    .then((updatedRecord) => {
      setCompletedHabits([...completedHabits, habitId]);
      setHabits(habits.map(h => h.id === habitId ? updatedRecord : h));
      
      const motivations = [`Great job! ${habitName} is done.`, `Checkmark earned: ${habitName} complete.`, `Excellent work on ${habitName}!`, `You finished ${habitName}!`, `Keep the momentum going!`];
      setRewardMessage(motivations[Math.floor(Math.random() * motivations.length)]);
      setTimeout(() => setRewardMessage(null), 3000);
    });
  };

  const totalHabits = habits.length;
  const totalCompletedToday = completedHabits.length;
  const completionPercentage = totalHabits === 0 ? 0 : Math.round((totalCompletedToday / totalHabits) * 100);
  const globalCurrentStreak = habits.length > 0 ? Math.max(...habits.map(h => h.currentStreak || 0)) : 0;
  const globalLongestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.longestStreak || 0)) : 0;

  // --- NEW: Filter Logic ---
  const filteredHabits = filterCategory === 'All' 
    ? habits 
    : habits.filter(h => (h.category || 'Custom') === filterCategory);

  return (
    <>
      <RewardPopup message={rewardMessage} />
      <div className="space-y-8 relative z-10">
        
        {/* User Header */}
        <div className="flex items-center justify-between bg-white/40 dark:bg-white/[0.01] backdrop-blur-3xl p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
              {getInitials(user?.username)}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{getGreeting()},</p>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {user?.username || 'Hacker'}
              </h1>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-1">Today's Progress</p>
            <div className="flex items-center justify-end gap-3">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">{completionPercentage}%</span>
              <div className="w-24 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${completionPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:scale-[1.02]">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Top Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">{globalCurrentStreak}</span>
              <span className="text-blue-500 font-medium">Days 🔥</span>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:scale-[1.02]">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Best Record</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">{globalLongestStreak}</span>
              <span className="text-amber-500/80 font-medium">Days 🏆</span>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:scale-[1.02]">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Tasks Done</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">{totalCompletedToday}</span>
              <span className="text-neutral-500 font-medium">/ {totalHabits}</span>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:scale-[1.02]">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Active Habits</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">{totalHabits}</span>
              <span className="text-neutral-500 font-medium">Total 📋</span>
            </div>
          </div>
        </div>
        
        <Hero3D username={user?.username} />

        {/* Input Form with Category Dropdown */}
        <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <form onSubmit={handleAddHabit} className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="What habit are we building today?" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} required className="flex-1 px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-full text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
            
            <select value={newHabitCategory} onChange={(e) => setNewHabitCategory(e.target.value)} className="px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-full text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none">
              {Object.keys(CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{CATEGORIES[cat].icon} {cat}</option>
              ))}
            </select>

            <button type="submit" className="bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-900 dark:text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer text-sm">
              Add Task
            </button>
          </form>
        </div>

        {/* Active Routines List */}
        <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">Active Routines</h2>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterCategory('All')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filterCategory === 'All' ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10'}`}>
                All
              </button>
              {Object.keys(CATEGORIES).map(cat => (
                <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${filterCategory === cat ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10'}`}>
                  <span>{CATEGORIES[cat].icon}</span> {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredHabits.length === 0 ? (
            <p className="text-neutral-400 text-sm text-center py-6">No active routines found in this category.</p>
          ) : (
            <div className="space-y-3">
              {filteredHabits.map(habit => {
                // Safely grab the category config, default to Custom if somehow missing
                const catConfig = CATEGORIES[habit.category] || CATEGORIES.Custom;
                
                return (
                  <div key={habit.id} className="flex justify-between items-center bg-white dark:bg-white/5 p-4 pl-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      {/* Beautiful Category Icon Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${catConfig.color}`}>
                        {catConfig.icon}
                      </div>
                      
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                        {habit.name ? habit.name : "Unnamed Task"}
                        </span>
                        <div className="flex gap-4 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span className={habit.currentStreak >= 3 ? "text-blue-500 font-medium" : ""}>🔥 {habit.currentStreak || 0} Streak</span>
                          <span className="text-amber-500/80 font-medium">🏆 {habit.longestStreak || 0} Best</span>
                        </div>
                      </div>
                    </div>

                    {completedHabits.includes(habit.id) ? (
                      <span className="text-neutral-400 text-sm px-4 font-medium">Done ✓</span>
                    ) : (
                      <button onClick={() => handleCheckOff(habit.id, habit.name)} className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.05] transition-transform font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100">
                        Complete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <ProgressChart habits={habits} />
      </div>
    </>
  );
}

export default Dashboard;