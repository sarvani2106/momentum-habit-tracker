import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, CalendarDays, BarChart2, User, Plus, LogOut } from 'lucide-react';
import { LayoutDashboard, ListTodo, CalendarDays, BarChart2, User, Sparkles, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navigation = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
    { name: 'Habits', path: '/habits', icon: <ListTodo size={24} /> },
    { name: 'AI Coach', path: '/ai-coach', icon: <Sparkles size={24} /> },
    { name: 'History', path: '/history', icon: <CalendarDays size={24} /> },
    { name: 'Statistics', path: '/stats', icon: <BarChart2 size={24} /> },
    { name: 'Profile', path: '/profile', icon: <User size={24} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 py-8 px-4">
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Momentum</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={24} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center p-3 z-50 pb-safe">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navigation;