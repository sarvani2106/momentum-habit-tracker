import React, { useState, useEffect } from 'react';
import { fetchAuth } from '../utils/api';

const AchievementsList = ({ userId }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchAuth(`/api/achievements/user/${userId}`)
        .then(data => setAchievements(data))
        .catch(err => console.error("Failed to fetch achievements", err));
    }
  }, [userId]);

  if (achievements.length === 0) {
    return (
      <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-[2rem] border border-black/5 dark:border-white/5 text-center text-sm text-neutral-500 mt-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        No achievements yet. Keep building those habits!
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6">
      <h2 className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-6">
        Your Badges
      </h2>
      <div className="flex flex-wrap gap-4">
        {achievements.map((ua) => (
          <div key={ua.id} className="flex items-center space-x-3 bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
            <div className="text-4xl">{ua.achievement.icon}</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{ua.achievement.name}</h3>
              <p className="text-xs text-gray-500">{ua.achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
