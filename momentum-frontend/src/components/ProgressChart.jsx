import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const ProgressChart = ({ habits }) => {
  // If no habits exist, show a Framer-styled empty state
  if (!habits || habits.length === 0) {
    return (
      <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-6 rounded-[2rem] border border-black/5 dark:border-white/5 text-center text-sm text-neutral-500 mt-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
        No active routines to chart yet.
      </div>
    );
  }

  // Format the data for the chart
  const chartData = habits.map(habit => ({
    name: habit.name,
    streak: habit.currentStreak || 0,
    best: habit.longestStreak || 0
  }));

  return (
    // The main wrapper now uses the exact same Glassmorphism classes as your other cards
    <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mt-6 transition-colors">
      
      <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase mb-6">
        Your Momentum (Current Streaks)
      </h2>
      
      {/* We removed the gray background from this inner wrapper */}
      <div className="w-full overflow-x-auto flex justify-center pt-4">
        <BarChart width={600} height={250} data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" opacity={0.2} />
          
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} allowDecimals={false} />
          
          {/* Styled the hover popup to be dark and sleek */}
          <Tooltip 
            cursor={{ fill: 'rgba(115, 115, 115, 0.1)' }} 
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              backgroundColor: 'rgba(10,10,10,0.9)', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)' 
            }} 
            labelStyle={{ color: '#ffffff', fontWeight: 'bold', paddingBottom: '4px' }}
            itemStyle={{ color: '#e5e5e5' }} /* <-- This fixes the hidden streak text! */
          />
          
          <Bar dataKey="streak" radius={[6, 6, 0, 0]} maxBarSize={50}>
            {chartData.map((entry, index) => (
              // Bars are blue in light mode, and crisp white in dark mode
              <Cell key={`cell-${index}`} className="fill-indigo-500 dark:fill-white transition-colors" />
            ))}
          </Bar>

        </BarChart>
      </div>
    </div>
  );
};

export default ProgressChart;