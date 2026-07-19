import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Shield, LogOut, Trash2, Edit2, 
  Flame, Trophy, Zap, Target
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 ${className}`}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <div className="flex flex-col gap-8">
      {children}
    </div>
  </motion.div>
);

const StatBox = ({ icon: Icon, label, value, colorClass, bgClass }) => (
  <div className="flex flex-col items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className={`w-8 h-8 rounded-xl ${bgClass} ${colorClass} flex items-center justify-center mb-3`}>
      <Icon size={16} />
    </div>
    <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
    <span className="text-sm font-medium text-slate-500 mt-1">{label}</span>
  </div>
);

export default function Settings() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const email = user?.email || 'builder@momentum.app';
  const [editUsername, setEditUsername] = useState(user?.username || 'Builder');
  const [editEmail, setEditEmail] = useState(email);

  const handleSaveProfile = () => {
    setUser({ ...user, username: editUsername, email: editEmail });
    setShowEditModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Mock User Data for rich display
  const currentXp = user?.xp || 2180;
  const level = user?.level || 2;
  const nextLevelXp = level * 1500;
  const xpProgress = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));
  const currentStreak = user?.currentStreak || 12;
  const longestStreak = user?.longestStreak || 34;
  const activeHabits = 5; // Mock

  return (
    <div className="max-w-3xl mx-auto pb-12 px-4 md:px-0">
      
      <div className="mb-10 text-center sm:text-left pt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-2">Profile</h1>
        <p className="text-slate-500 text-lg">Manage your account and view your progress.</p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* PROFILE CARD */}
        <SectionCard title="Your Profile" icon={User}>
          
          {/* Identity Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-indigo-50 flex items-center justify-center text-5xl overflow-hidden border-[6px] border-white shadow-sm">
                🌱
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left flex flex-col justify-center h-28">
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{user?.username || 'Builder'}</h3>
              <p className="text-base text-slate-500 mt-1 font-medium">{email}</p>
            </div>
          </div>

          {/* Stats 2x2 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <StatBox 
              icon={Trophy} label="Current Level" value={level} 
              colorClass="text-purple-600" bgClass="bg-purple-100" 
            />
            <StatBox 
              icon={Flame} label="Current Streak" value={currentStreak} 
              colorClass="text-orange-600" bgClass="bg-orange-100" 
            />
            <StatBox 
              icon={Zap} label="Longest Streak" value={longestStreak} 
              colorClass="text-amber-600" bgClass="bg-amber-100" 
            />
            <StatBox 
              icon={Target} label="Active Habits" value={activeHabits} 
              colorClass="text-blue-600" bgClass="bg-blue-100" 
            />
          </div>

          {/* XP Progress */}
          <div className="w-full bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-2">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">XP Progress</p>
                <p className="text-sm font-semibold text-slate-700">Level {level} to Level {level + 1}</p>
              </div>
              <span className="text-sm font-bold text-purple-600">{currentXp} / {nextLevelXp} XP</span>
            </div>
            <div className="h-3.5 bg-slate-200 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" 
              />
            </div>
          </div>
          
          {/* Action Row */}
          <button 
            onClick={() => {
              setEditUsername(user?.username || 'Builder');
              setEditEmail(email);
              setShowEditModal(true);
            }}
            className="w-full sm:w-auto py-3.5 px-8 bg-white border-2 border-slate-100 hover:border-purple-200 hover:bg-purple-50 rounded-2xl font-bold text-slate-600 hover:text-purple-700 transition-colors flex items-center justify-center gap-2 mt-2 self-start"
          >
            <Edit2 size={18} /> Edit Profile
          </button>
        </SectionCard>

        {/* ACCOUNT CARD */}
        <SectionCard title="Account" icon={Shield} className="border-red-50 bg-[#FDF8F8]">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleLogout}
              className="flex-1 py-4 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl font-bold text-slate-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut size={18} /> Logout
            </button>
            
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 py-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </SectionCard>
        
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Profile</h2>
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <Edit2 size={20} />
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
                  <input 
                    type="text" 
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block p-3.5 font-medium outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block p-3.5 font-medium outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 py-3.5 bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30 rounded-xl font-bold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full relative z-10 shadow-2xl border border-red-50 text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Delete Account?</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Are you sure you want to delete your account? All your habits, streaks, and progress will be permanently lost. This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // MOCK DELETE
                    setShowDeleteModal(false);
                    handleLogout();
                  }}
                  className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 rounded-xl font-bold transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
