import React, { useState, useEffect } from 'react';
import ProgressChart from '../components/ProgressChart';
import AchievementsList from '../components/AchievementsList';
import { useUser } from '../context/UserContext';
import { fetchAuth } from '../utils/api';

const Statistics = () => {
  const { user } = useUser();
  const userId = user?.id || 1; // Fallback
  const [categoryData, setCategoryData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetchAuth(`/api/analytics/category-distribution/${userId}`)
      .then(setCategoryData)
      .catch(err => console.error("Error fetching category data:", err));

    fetchAuth(`/api/analytics/weekly-completion/${userId}`)
      .then(setWeeklyData)
      .catch(err => console.error("Error fetching weekly data:", err));
  }, [userId]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
      <p className="text-gray-500">Deep dive into your habit progress and achievements.</p>
      
      <AchievementsList userId={userId} />

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
        <ProgressChart categoryData={categoryData} weeklyData={weeklyData} />
      </div>
    </div>
  );
};

export default Statistics;
