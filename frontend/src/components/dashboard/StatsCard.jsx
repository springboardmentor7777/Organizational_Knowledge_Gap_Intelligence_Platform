import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../common/Card';
import './StatsCard.css';

const StatsCard = ({ title, value, trend, trendValue, icon: Icon, color = 'purple' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  
  // Format value to extract numbers and suffix
  const numMatch = String(value).match(/[\d,.]+/);
  const suffixMatch = String(value).match(/[^\d,.]+/g);
  
  const targetNum = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : 0;
  const prefix = suffixMatch && String(value).startsWith(suffixMatch[0]) ? suffixMatch[0] : '';
  const suffix = suffixMatch && !String(value).startsWith(suffixMatch[0]) ? suffixMatch.join('') : '';

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = targetNum / (duration / 16); // 60fps

    let current = start;
    const animate = () => {
      current += increment;
      if (current < targetNum) {
        setDisplayValue(current);
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetNum);
      }
    };
    
    if (targetNum > 0) {
      animate();
    } else {
      setDisplayValue(targetNum);
    }
  }, [targetNum]);

  const formatDisplay = (val) => {
    // Basic formatting - could be enhanced based on need
    if (val % 1 !== 0) return val.toFixed(1);
    return Math.floor(val).toLocaleString();
  };

  return (
    <Card className="stats-card" hover padding="md" variant="default">
      <div className="stats-card-header">
        <h3 className="stats-card-title">{title}</h3>
        <div className={`stats-card-icon bg-${color}-alpha text-${color}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="stats-card-body">
        <div className="stats-card-value-wrap">
          <motion.span 
            className="stats-card-value"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {prefix}{formatDisplay(displayValue)}{suffix}
          </motion.span>
        </div>
        
        {trend && (
          <div className={`stats-card-trend trend-${trend}`}>
            {trend === 'up' && <TrendingUp size={14} />}
            {trend === 'down' && <TrendingDown size={14} />}
            {trend === 'neutral' && <Minus size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      {/* Abstract sparkline decoration */}
      <svg className="stats-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
        <path 
          d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,0 L100,30 Z" 
          fill={`var(--color-brand-${color})`} 
          opacity="0.1" 
        />
        <path 
          d="M0,30 L10,25 L20,28 L30,20 L40,22 L50,15 L60,18 L70,10 L80,12 L90,5 L100,0" 
          fill="none" 
          stroke={`var(--color-brand-${color})`} 
          strokeWidth="1.5" 
          opacity="0.4"
        />
      </svg>
    </Card>
  );
};

export default StatsCard;
