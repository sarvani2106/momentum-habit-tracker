import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function HabitBalance({ habits }) {
  // Aggregate habits by category
  const dataMap = habits.reduce((acc, habit) => {
    const cat = habit.category || 'Custom';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  })).sort((a, b) => b.value - a.value);

  // If no habits, show empty state
  if (data.length === 0) {
    data.push({ name: 'Empty', value: 1 });
  }

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6'];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Habit Balance</h3>
      
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={40}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Empty' ? '#f1f5f9' : COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto max-h-24 hide-scrollbar">
          {data[0].name === 'Empty' ? (
            <div className="text-xs text-slate-400">No habits yet.</div>
          ) : (
            data.map((entry, idx) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">{entry.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{Math.round((entry.value / habits.length) * 100)}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
