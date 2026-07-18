import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Flame, Bot, BarChart3, Settings, LogOut, Sparkles } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function Sidebar({ onLogout }) {
  const { user } = useUser();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'habits', label: 'Habits', icon: Flame, path: '/habits' },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot, path: '/ai-coach' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-6 bg-[var(--color-bg-main)] border-r border-[var(--color-border)] z-40">
      
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 mt-2 px-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-sm" />
        <span className="font-bold tracking-tight text-xl text-[var(--color-text-main)]">
          Momentum
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 relative group
                ${isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-indigo-500 hover:bg-slate-100/50'}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active state background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-50 rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon size={20} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="pt-6 border-t border-[var(--color-border)] mt-auto">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center text-indigo-600 font-bold uppercase">
            {user?.username?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-main)]">{user?.username}</div>
            <div className="text-xs text-orange-500 font-medium">Level {user?.level || 1} ⭐</div>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
