// src/components/layout/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // We will create this next
import Navbar from '../Navbar';

export default function DashboardLayout({ user, onLogout }) {
  return (
    <div className="flex h-screen bg-[#fafafa] dark:bg-[#050505] transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar loggedInUser={user} onLogout={onLogout} />
        <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-8">
          <Outlet /> {/* This renders the current page content */}
        </main>
      </div>
    </div>
  );
}