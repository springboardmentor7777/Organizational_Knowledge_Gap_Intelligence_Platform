import { useState } from 'react';

/**
 * AreaChart.jsx
 * SVG-based Area Chart for Gap Reduction Trend.
 */
export default function AreaChart({ data = [], title = 'Gap Reduction Trend' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const width = 500;
  const height = 220;
  const padding = 35;

  const maxGap = Math.max(...data.map((d) => d.totalGaps || d.criticalGaps || 50));
  const minGap = 0;

  const getX = (idx) => padding + (idx * (width - 2 * padding)) / (data.length - 1);
  const getY = (val) => height - padding - ((val - minGap) / (maxGap - minGap)) * (height - 2 * padding);

  const criticalPoints = data.map((d, idx) => `${getX(idx)},${getY(d.criticalGaps)}`).join(' ');
  const firstX = getX(0);
  const lastX = getX(data.length - 1);
  const bottomY = height - padding;

  const criticalArea = `${firstX},${bottomY} ${criticalPoints} ${lastX},${bottomY}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
            <span className="text-gray-500 font-medium">Critical Gaps</span>
          </span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, Math.round(maxGap / 2), maxGap].map((val) => (
            <g key={val}>
              <line
                x1={padding}
                y1={getY(val)}
                x2={width - padding}
                y2={getY(val)}
                stroke="#F1F5F9"
                strokeDasharray="4 4"
              />
            </g>
          ))}

          {/* Area Fill */}
          <polygon points={criticalArea} fill="url(#areaGrad)" />

          {/* Line */}
          <polyline
            points={criticalPoints}
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Nodes */}
          {data.map((d, idx) => {
            const cx = getX(idx);
            const cy = getY(d.criticalGaps);
            const isHovered = hoveredIdx === idx;

            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#7C3AED"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                <text x={cx} y={height - 10} textAnchor="middle" fontSize="11" fill="#64748B" fontWeight="500">
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-slate-900 text-white text-xs rounded-lg px-2.5 py-1.5 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 transition-all"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
              top: `${(getY(data[hoveredIdx].criticalGaps) / height) * 100}%`,
            }}
          >
            <p className="font-bold text-purple-300">{data[hoveredIdx].label}</p>
            <p className="font-extrabold text-white">{data[hoveredIdx].criticalGaps} Critical Gaps</p>
          </div>
        )}
      </div>
    </div>
  );
}
