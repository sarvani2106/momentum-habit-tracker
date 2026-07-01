import React, { useState, useEffect } from 'react';

export default function ContributionCalendar({ userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/habit-records/activity/${userId}`)
        .then(r => r.json())
        .then(setActivityData)
        .catch(err => console.error("Error fetching activity:", err));
    }
  }, [userId]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const grid = Array.from({ length: firstDay }).fill(null).concat(
    Array.from({ length: daysInMonth }).map((_, i) => {
      const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
      const log = activityData.find(d => d.date === dayStr);
      return { date: dayStr, count: log ? log.count : 0 };
    })
  );

  const getColor = (count) => {
    if (count === 0) return 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5';
    if (count === 1) return 'bg-blue-900/40 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
    if (count <= 3) return 'bg-blue-600/70 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
    return 'bg-blue-400 border-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.6)]';
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xs font-semibold text-neutral-500 tracking-widest uppercase">Consistency Map</h2>
        <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 rounded-full px-2 py-1">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-neutral-600 dark:text-neutral-300">←</button>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white min-w-[100px] text-center">{monthNames[month]} {year}</span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-neutral-600 dark:text-neutral-300">→</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {grid.map((day, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {day ? (
              <div className={`w-full h-full rounded-xl border transition-all duration-300 flex items-center justify-center group relative ${getColor(day.count)}`}>
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] py-1.5 px-3 rounded-lg pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {day.count} tasks on {day.date.split('-').slice(1).join('/')}
                </div>
              </div>
            ) : <div className="w-full h-full rounded-xl bg-transparent" />}
          </div>
        ))}
      </div>
    </div>
  );
}