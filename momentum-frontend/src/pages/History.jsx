import React from 'react';
import ContributionCalendar from '../components/ContributionCalendar';
import { useUser } from '../context/UserContext';

const History = () => {
  const { user } = useUser();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-gray-900">Calendar & History</h1>
      <p className="text-gray-500">Track your consistency over time.</p>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <ContributionCalendar userId={user?.id || 1} />
      </div>
    </div>
  );
};

export default History;