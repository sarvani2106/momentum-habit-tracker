import React from 'react';
import MoMotivationCard from './MoMotivationCard';
import WeeklyProgress from './WeeklyProgress';

export default function HabitsSidebar({ habits, completedHabits }) {
  return (
    <div className="flex flex-col gap-8">
      <MoMotivationCard />
      
      <WeeklyProgress habits={habits} completedHabits={completedHabits} />
      
      {/* Simple Upcoming Milestone Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">
            🏆
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Upcoming Milestone</h3>
            <p className="text-xs text-slate-500 font-medium">10 Day Streak</p>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
          <div className="bg-slate-800 h-full w-[70%]" />
        </div>
        <p className="text-[10px] text-slate-400 font-semibold uppercase text-right">70% there</p>
      </div>
    </div>
  );
}
