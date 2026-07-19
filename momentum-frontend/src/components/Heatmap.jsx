import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { fetchAuth } from '../utils/api';
import { useUser } from '../context/UserContext';

export default function Heatmap() {
  const { user } = useUser();
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    
    fetchAuth(`/api/habit-records/activity/${user.id}`)
      .then(data => {
        setActivityData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch heatmap data", err);
        setLoading(false);
      });
  }, [user]);

  const today = new Date();
  const days = [];
  
  // Create exactly 364 days (52 weeks) to fill the width beautifully
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const record = activityData.find(d => d.date === dateStr);
    days.push({
      date: date,
      dateStr: dateStr,
      count: record ? record.count : 0
    });
  }

  // Group into columns
  const weeks = [];
  let currentWeek = [];
  
  const startDate = new Date(days[0].date);
  const startDayOfWeek = startDate.getDay();
  
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }
  
  days.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const monthLabels = [];
  weeks.forEach((week, index) => {
    const firstValidDay = week.find(d => d !== null);
    if (firstValidDay && firstValidDay.date.getDate() <= 7) {
      const monthName = firstValidDay.date.toLocaleString('default', { month: 'short' });
      if (monthLabels.length === 0 || monthLabels[monthLabels.length - 1].label !== monthName) {
        monthLabels.push({ label: monthName, index });
      }
    }
  });

  const getColorClass = (count) => {
    if (count === 0) return 'bg-slate-100/80 border border-slate-200/50';
    if (count === 1) return 'bg-emerald-200';
    if (count === 2) return 'bg-emerald-300';
    if (count === 3) return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]';
    return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]';
  };

  const hasData = activityData.length > 0;

  if (loading) return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 h-64 flex items-center justify-center animate-pulse border border-slate-100">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 border border-slate-100 overflow-hidden relative"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100/50">
            <Activity className="text-emerald-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Consistency Heatmap</h2>
            <p className="text-sm text-slate-500 mt-0.5">Your daily habit completion over the last year.</p>
          </div>
        </div>
        <div className="hidden sm:flex text-xs font-medium text-slate-400 gap-1 items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <span>?</span>
          <span>How it works</span>
        </div>
      </div>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="text-4xl mb-4 animate-bounce">🌱</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Your journey begins today.</h3>
          <p className="text-slate-500 max-w-sm text-sm">Complete your first habit to start building momentum and watch this heatmap grow.</p>
        </div>
      ) : (
        <div className="flex flex-col overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex relative h-6 mb-2 ml-8 text-xs font-medium text-slate-400">
            {monthLabels.map((month, i) => (
              <div key={i} className="absolute" style={{ left: `${month.index * (16 + 6)}px` }}>
                {month.label}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col gap-[6px] mr-3 text-[10px] font-medium text-slate-400 mt-[2px]">
              <div className="h-4 flex items-center"></div>
              <div className="h-4 flex items-center">Mon</div>
              <div className="h-4 flex items-center"></div>
              <div className="h-4 flex items-center">Wed</div>
              <div className="h-4 flex items-center"></div>
              <div className="h-4 flex items-center">Fri</div>
              <div className="h-4 flex items-center"></div>
            </div>

            <div className="flex gap-[6px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[6px]">
                  {week.map((day, dIdx) => (
                    day ? (
                      <div 
                        key={day.dateStr}
                        className={`w-4 h-4 rounded-[4px] transition-all duration-300 hover:scale-125 hover:z-50 cursor-pointer relative group ${getColorClass(day.count)}`}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-200">
                          {day.count} {day.count === 1 ? 'habit' : 'habits'} on {day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    ) : (
                      <div key={`empty-${wIdx}-${dIdx}`} className="w-4 h-4 rounded-[4px] bg-transparent"></div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-slate-500 font-medium mr-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[3px] bg-slate-100 border border-slate-200/50"></div>
            <div className="w-3 h-3 rounded-[3px] bg-emerald-200"></div>
            <div className="w-3 h-3 rounded-[3px] bg-emerald-300"></div>
            <div className="w-3 h-3 rounded-[3px] bg-emerald-400"></div>
            <div className="w-3 h-3 rounded-[3px] bg-emerald-500"></div>
            <span>More</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
