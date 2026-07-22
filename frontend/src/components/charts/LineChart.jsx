import { useState } from 'react';

/**
 * LineChart.jsx
 * SVG-based Line Chart for Monthly Skill Improvement Trend.
 */
export default function LineChart({ data = [], title = 'Monthly Skill Improvement (%)' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const width = 500;
  const height = 220;
  const padding = 35;

  const maxValue = 100;
  const minValue = 40;

  const getX = (idx) => padding + (idx * (width - 2 * padding)) / (data.length - 1);
  const getY = (val) => height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const points = data.map((d, idx) => `${getX(idx)},${getY(d.value)}`).join(' ');

  // Gradient area points
  const firstX = getX(0);
  const lastX = getX(data.length - 1);
  const bottomY = height - padding;
  const areaPoints = `${firstX},${bottomY} ${points} ${lastX},${bottomY}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-gray-500 font-medium">Actual Score</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-gray-400 inline-block" />
            <span className="text-gray-400 font-medium">Target</span>
          </span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[50, 75, 100].map((val) => (
            <line
              key={val}
              x1={padding}
              y1={getY(val)}
              x2={width - padding}
              y2={getY(val)}
              stroke="#F1F5F9"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#lineGrad)" />

          {/* Target Line */}
          {data.some((d) => d.target) && (
            <polyline
              points={data.map((d, idx) => `${getX(idx)},${getY(d.target)}`).join(' ')}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Main Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Nodes */}
          {data.map((d, idx) => {
            const cx = getX(idx);
            const cy = getY(d.value);
            const isHovered = hoveredIdx === idx;

            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* X Axis Label */}
                <text x={cx} y={height - 10} textAnchor="middle" fontSize="11" fill="#64748B" fontWeight="500">
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Popover */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-slate-900 text-white text-xs rounded-lg px-2.5 py-1.5 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 transition-all"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
              top: `${(getY(data[hoveredIdx].value) / height) * 100}%`,
            }}
          >
            <p className="font-bold text-indigo-300">{data[hoveredIdx].label}</p>
            <p className="font-extrabold text-emerald-400">{data[hoveredIdx].value}% Improvement</p>
          </div>
        )}
      </div>
    </div>
  );
}
