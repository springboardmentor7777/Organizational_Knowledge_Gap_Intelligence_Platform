import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import './SkillDistributionChart.css';

const radarData = [
  { skill: 'Technical',      current: 72, target: 90 },
  { skill: 'Leadership',     current: 58, target: 85 },
  { skill: 'Communication',  current: 81, target: 88 },
  { skill: 'Data Analytics', current: 55, target: 82 },
  { skill: 'Creativity',     current: 68, target: 78 },
  { skill: 'Collaboration',  current: 76, target: 90 },
  { skill: 'Problem Solving',current: 64, target: 87 },
  { skill: 'Adaptability',   current: 70, target: 80 },
];

const pieData = [
  { name: 'Critical Gaps',  value: 18, color: '#fb7185' },
  { name: 'Moderate Gaps',  value: 32, color: '#f59e0b' },
  { name: 'Minor Gaps',     value: 28, color: '#22d3ee' },
  { name: 'No Gap',         value: 22, color: '#34d399' },
];

const TABS = ['Radar', 'Distribution'];

const CustomRadarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="skill-dist__tooltip">
      <p className="skill-dist__tooltip-label">{d.skill}</p>
      <div className="skill-dist__tooltip-row">
        <span className="skill-dist__tooltip-dot" style={{ background: '#a855f7' }} />
        <span>Current</span>
        <strong>{d.current}%</strong>
      </div>
      <div className="skill-dist__tooltip-row">
        <span className="skill-dist__tooltip-dot" style={{ background: '#22d3ee' }} />
        <span>Target</span>
        <strong>{d.target}%</strong>
      </div>
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div className="skill-dist__tooltip">
      <div className="skill-dist__tooltip-row">
        <span className="skill-dist__tooltip-dot" style={{ background: p.color }} />
        <span>{name}</span>
        <strong>{value}%</strong>
      </div>
    </div>
  );
};

const SkillDistributionChart = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div
      className="skill-dist-chart"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="skill-dist-chart__header">
        <div>
          <h3 className="skill-dist-chart__title">Skill Distribution</h3>
          <p className="skill-dist-chart__subtitle">Proficiency levels across categories</p>
        </div>
        <div className="skill-dist-chart__tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`skill-dist-chart__tab${activeTab === i ? ' skill-dist-chart__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 0 && (
          <motion.div
            key="radar"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
          >
            <ResponsiveContainer width="100%" height={270}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#475569', fontSize: 9 }}
                  tickCount={4}
                  axisLine={false}
                />
                <Tooltip content={<CustomRadarTooltip />} />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#22d3ee"
                  fill="rgba(34,211,238,0.08)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#a855f7"
                  fill="rgba(168,85,247,0.2)"
                  strokeWidth={2}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 8 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {activeTab === 1 && (
          <motion.div
            key="pie"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            className="skill-dist-chart__pie-wrap"
          >
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="48%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="skill-dist-chart__pie-center">
              <span className="skill-dist-chart__pie-pct">78%</span>
              <span className="skill-dist-chart__pie-sub">Avg Score</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkillDistributionChart;
