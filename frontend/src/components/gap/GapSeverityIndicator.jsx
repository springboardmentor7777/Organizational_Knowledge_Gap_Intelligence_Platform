import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import './GapSeverityIndicator.css';

const GapSeverityIndicator = ({ score = 65, maxScore = 100 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Calculations for SVG Gauge
  const radius = 100;
  const circumference = Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  
  // Progress goes from 0 to circumference
  const progress = (animatedScore / maxScore) * circumference;
  const strokeDashoffset = circumference - progress;

  // Rotation goes from -90 to 90 degrees
  const rotation = (animatedScore / maxScore) * 180 - 90;

  return (
    <div className="severity-indicator-container">
      <div className="indicator-glow"></div>
      
      <h2 className="indicator-title">
        <Activity className="icon-gradient" size={24} />
        Overall Gap Severity
      </h2>

      <div className="gauge-wrapper">
        <svg viewBox="0 0 250 125" width="250" height="125" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />   {/* Green */}
              <stop offset="50%" stopColor="#eab308" />  {/* Yellow */}
              <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            className="gauge-background"
            d="M 25,125 A 100,100 0 0,1 225,125"
          />

          {/* Progress Track */}
          <path
            className="gauge-progress"
            d="M 25,125 A 100,100 0 0,1 225,125"
            style={{ 
              strokeDasharray, 
              strokeDashoffset 
            }}
          />

          {/* Needle */}
          <g 
            className="gauge-needle"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <path
              className="needle-path"
              d="M 120,125 L 125,35 L 130,125 Z"
            />
            <circle className="needle-center" cx="125" cy="125" r="8" />
          </g>
        </svg>

        <div className="gauge-value-display">
          <motion.div 
            className="score-number"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {animatedScore}
          </motion.div>
          <div className="score-label">Current Index</div>
        </div>
      </div>

      <div className="gauge-labels">
        <span>Healthy</span>
        <span>Critical</span>
      </div>
    </div>
  );
};

export default GapSeverityIndicator;
