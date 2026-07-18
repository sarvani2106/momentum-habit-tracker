import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import AnimatedBackground from './AnimatedBackground';
import { useUser } from '../../context/UserContext';

const DashboardLayout = () => {
  const { setUser } = useUser();
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen font-sans relative">
      <AnimatedBackground />
      
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        
        {/* Main Content Area */}
        <main className="flex-1 pb-20 md:pb-8 pt-8 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;