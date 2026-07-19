import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ categoryData, weeklyData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      
      {/* Category Distribution Chart */}
      <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors flex flex-col items-center">
        <h2 className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-6 self-start">
          Category Distribution
        </h2>
        {(!categoryData || categoryData.length === 0) ? (
          <div className="text-sm text-neutral-500 mt-6">No data available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="category"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(10,10,10,0.9)' }} 
                itemStyle={{ color: '#e5e5e5' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Weekly Completion Rate Chart */}
      <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors flex flex-col items-center">
        <h2 className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-6 self-start">
          Weekly Completion Rate
        </h2>
        {(!weeklyData || weeklyData.length === 0) ? (
          <div className="text-sm text-neutral-500 mt-6">No data available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#737373', fontSize: 12 }} 
                dy={10} 
                tickFormatter={(val) => {
                   if (!val) return "";
                   const parts = val.toString().split('-');
                   if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
                   return val;
                }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} allowDecimals={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(115, 115, 115, 0.1)' }} 
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(10,10,10,0.9)' }} 
                labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                itemStyle={{ color: '#e5e5e5' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} className="fill-indigo-500 transition-colors" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default ProgressChart;