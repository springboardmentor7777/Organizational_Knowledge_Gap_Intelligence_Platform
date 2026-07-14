import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle } from '../common/Card';
import './GapTrendChart.css';

const mockData = [
  { name: 'Jan', technical: 65, leadership: 45, communication: 30, data: 55 },
  { name: 'Feb', technical: 60, leadership: 48, communication: 28, data: 52 },
  { name: 'Mar', technical: 55, leadership: 42, communication: 25, data: 48 },
  { name: 'Apr', technical: 50, leadership: 40, communication: 22, data: 45 },
  { name: 'May', technical: 45, leadership: 38, communication: 20, data: 40 },
  { name: 'Jun', technical: 40, leadership: 35, communication: 18, data: 38 },
  { name: 'Jul', technical: 38, leadership: 32, communication: 15, data: 35 },
  { name: 'Aug', technical: 35, leadership: 30, communication: 12, data: 32 },
  { name: 'Sep', technical: 30, leadership: 28, communication: 10, data: 28 },
  { name: 'Oct', technical: 28, leadership: 25, communication: 8, data: 25 },
  { name: 'Nov', technical: 25, leadership: 22, communication: 5, data: 22 },
  { name: 'Dec', technical: 20, leadership: 20, communication: 4, data: 18 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-item">
            <span 
              className="tooltip-item-color" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="tooltip-item-name">{entry.name}:</span>
            <span className="tooltip-item-value">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const GapTrendChart = () => {
  return (
    <Card className="gap-trend-card" padding="md">
      <CardHeader>
        <CardTitle>Skill Gap Trends (12 Months)</CardTitle>
      </CardHeader>
      
      <div className="chart-container" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={mockData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLead" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="technical" name="Technical" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorTech)" />
            <Area type="monotone" dataKey="leadership" name="Leadership" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorLead)" />
            <Area type="monotone" dataKey="data" name="Data Analysis" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorData)" />
            <Area type="monotone" dataKey="communication" name="Communication" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorComm)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Custom Legend */}
      <div className="chart-legend">
        <div className="legend-item"><span className="legend-color" style={{ background: '#7c3aed' }}></span>Technical</div>
        <div className="legend-item"><span className="legend-color" style={{ background: '#06b6d4' }}></span>Leadership</div>
        <div className="legend-item"><span className="legend-color" style={{ background: '#f43f5e' }}></span>Data Analysis</div>
        <div className="legend-item"><span className="legend-color" style={{ background: '#10b981' }}></span>Communication</div>
      </div>
    </Card>
  );
};

export default GapTrendChart;
