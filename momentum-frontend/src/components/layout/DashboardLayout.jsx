import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar'; 
import AnimatedBackground from './AnimatedBackground';
import { useUser } from '../../context/UserContext';

const DashboardLayout = () => {
  const { setUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen font-sans relative flex flex-col md:flex-row w-full overflow-hidden">
      <AnimatedBackground />
      
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-bg-main)] border-b border-[var(--color-border)] sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-sm" />
          <span className="font-bold tracking-tight text-xl text-[var(--color-text-main)]">Momentum</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar (Desktop Permanent, Mobile Drawer) */}
      <Sidebar 
        onLogout={handleLogout} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-8 pt-6 md:pt-8 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-x-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;