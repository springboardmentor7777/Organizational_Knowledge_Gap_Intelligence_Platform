import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import './TrainingProgressChart.css';

const deptData = [
  { dept: 'Engineering', completion: 87, color: '#a855f7' },
  { dept: 'Marketing',   completion: 73, color: '#22d3ee' },
  { dept: 'Sales',       completion: 65, color: '#34d399' },
  { dept: 'HR',          completion: 91, color: '#f59e0b' },
  { dept: 'Finance',     completion: 58, color: '#fb7185' },
  { dept: 'Operations',  completion: 78, color: '#a855f7' },
  { dept: 'Design',      completion: 82, color: '#22d3ee' },
];

const topCourses = [
  { name: 'Advanced Python & ML Foundations', pct: 78, color: '#a855f7' },
  { name: 'Leadership Excellence Program',    pct: 62, color: '#22d3ee' },
  { name: 'Data Storytelling with Power BI',  pct: 54, color: '#34d399' },
  { name: 'Agile & Scrum Certification',      pct: 89, color: '#f59e0b' },
  { name: 'Cloud Architecture on AWS',        pct: 41, color: '#fb7185' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="training__tooltip">
      <p className="training__tooltip-label">{label}</p>
      <div className="training__tooltip-row">
        <span className="training__tooltip-dot" style={{ background: payload[0].fill }} />
        <span>Completion</span>
        <strong>{payload[0].value}%</strong>
      </div>
    </div>
  );
};

const TrainingProgressChart = () => (
  <motion.div
    className="training-chart"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    <div className="training-chart__header">
      <div>
        <h3 className="training-chart__title">Training Completion</h3>
        <p className="training-chart__subtitle">Rates by department · Q2 2025</p>
      </div>
      <div className="training-chart__stat">
        <span className="training-chart__stat-val">76%</span>
        <span className="training-chart__stat-label">Avg Rate</span>
      </div>
    </div>

    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={deptData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal vertical={false} />
        <XAxis
          dataKey="dept"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey="completion" radius={[6, 6, 0, 0]}>
          {deptData.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

    {/* In-Progress Courses */}
    <div className="training-chart__courses">
      <p className="training-chart__courses-title">Top In-Progress Courses</p>
      {topCourses.map((course, i) => (
        <motion.div
          key={course.name}
          className="training-chart__course-row"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
        >
          <div className="training-chart__course-info">
            <span className="training-chart__course-name">{course.name}</span>
            <span className="training-chart__course-pct" style={{ color: course.color }}>{course.pct}%</span>
          </div>
          <div className="training-chart__bar-bg">
            <motion.div
              className="training-chart__bar-fill"
              style={{ background: course.color }}
              initial={{ width: 0 }}
              animate={{ width: `${course.pct}%` }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default TrainingProgressChart;
