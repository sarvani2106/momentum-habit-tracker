import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProgressChart from './components/ProgressChart';
import SpaceHero from './components/SpaceHero';
import RewardPopup from './components/RewardPopup';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [completedHabits, setCompletedHabits] = useState([]);
  const [rewardMessage, setRewardMessage] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === 'dark') rootElement.classList.add('dark');
    else rootElement.classList.remove('dark');
  }, [theme]);

  // --- API CALLS (Unchanged) ---
  const fetchUsers = () => { fetch('http://localhost:8080/api/users').then(r=>r.json()).then(setUsers); };
  useEffect(() => { fetchUsers(); }, []);
  const handleRegister = (e) => { e.preventDefault(); fetch('http://localhost:8080/api/users/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username, email, password}) }).then(async r => { if(r.ok){ setMessage("Account created"); setUsername(''); setEmail(''); setPassword(''); fetchUsers(); } else setMessage(await r.text()); }); };
  const handleLogin = (user) => { setLoggedInUser(user); setCompletedHabits([]); fetch(`http://localhost:8080/api/habits/user/${user.id}`).then(r=>r.json()).then(setHabits); };
  const handleLogout = () => { setLoggedInUser(null); setHabits([]); setCompletedHabits([]); };
  const handleAddHabit = (e) => { e.preventDefault(); fetch('http://localhost:8080/api/habits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newHabitName, userId: loggedInUser.id }) }).then(r=>r.json()).then(data => { setHabits([...habits, data]); setNewHabitName(''); }); };
  const handleCheckOff = (habitId, habitName) => { fetch('http://localhost:8080/api/records', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ habitId: habitId }) }).then(r=>r.json()).then(() => { setCompletedHabits([...completedHabits, habitId]); setRewardMessage(`Completed: ${habitName}`); setTimeout(() => setRewardMessage(null), 3000); }); };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {/* FRAMER BASE: 
        Deepest black (#050505) with a subtle radial glow in the center for depth. 
      */}
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 transition-colors duration-500 font-sans selection:bg-neutral-300 dark:selection:bg-neutral-800 relative pt-24 pb-12">
        
        {/* Subtle background glow effect (Classic Framer) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 dark:bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <RewardPopup message={rewardMessage} />
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} theme={theme} setTheme={setTheme} />
        
        <main className="max-w-3xl mx-auto px-6 relative z-10">
          {!loggedInUser ? (
            /* --- LOGIN SCREEN --- */
            <div className="space-y-12 mt-20">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500">
                  Build Momentum.
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">Select your profile to continue.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {users.map(user => (
                  <div key={user.id} onClick={() => handleLogin(user)} className="group bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 rounded-3xl border border-black/5 dark:border-white/5 cursor-pointer hover:bg-white/80 dark:hover:bg-white/[0.04] hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none text-center">
                    <h3 className="font-semibold text-lg group-hover:scale-105 transition-transform">{user.username}</h3>
                  </div>
                ))}
              </div>

              {/* Framer-style minimal register form */}
              <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none max-w-md mx-auto">
                <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase mb-6 text-center">Or Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors" />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors" />
                  {/* High contrast pill button */}
                  <button type="submit" className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold py-3 rounded-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer mt-2 shadow-lg">Get Started</button>
                </form>
                {message && <p className="mt-4 text-sm text-center text-neutral-500">{message}</p>}
              </div>
            </div>
          ) : (
            /* --- DASHBOARD --- */
            <div className="space-y-8">
              
              <SpaceHero username={loggedInUser.username} />

              {/* Framer Card Module */}
              <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
                <form onSubmit={handleAddHabit} className="flex flex-col sm:flex-row gap-3">
                  <input type="text" placeholder="What habit are we building today?" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} required className="flex-1 px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-full text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors" />
                  {/* Secondary Pill Button */}
                  <button type="submit" className="bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-900 dark:text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer text-sm">Add Node</button>
                </form>
              </div>

              {/* Checklist Module */}
              <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
                <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase mb-6">Active Routines</h2>
                {habits.length === 0 ? (
                  <p className="text-neutral-400 text-sm">No active routines found.</p>
                ) : (
                  <div className="space-y-3">
                    {habits.map(habit => (
                      // Nested glassy list items
                      <div key={habit.id} className="flex justify-between items-center bg-white dark:bg-white/5 p-4 pl-6 rounded-2xl border border-black/5 dark:border-white/5">
                        <div>
                          <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">{habit.name}</span>
                          <div className="flex gap-4 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            <span>🔥 {habit.currentStreak || 0} Streak</span>
                            <span>🏆 {habit.longestStreak || 0} Best</span>
                          </div>
                        </div>
                        
                        {completedHabits.includes(habit.id) ? (
                          <span className="text-neutral-400 text-sm px-4">Done</span>
                        ) : (
                          // Primary high-contrast button
                          <button onClick={() => handleCheckOff(habit.id, habit.name)} className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.05] transition-transform font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer shadow-md">
                            Complete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <ProgressChart habits={habits} />
              
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;