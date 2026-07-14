import { motion } from 'framer-motion';
import './Card.css';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md',
  glow = false,
  gradient = false,
  onClick,
  ...props
}) => {
  const handleMouseMove = (e) => {
    if (!hover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      className={`card card-${variant} card-pad-${padding} ${hover ? 'card-hover' : ''} ${glow ? 'card-glow' : ''} ${gradient ? 'card-gradient' : ''} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      whileHover={hover && onClick ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      {...props}
    >
      <div className="card-spotlight" />
      <div className="card-content-wrapper">
        {children}
      </div>
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '', actions }) => (
  <div className={`card-header-row ${className}`}>
    <div className="card-header-content">{children}</div>
    {actions && <div className="card-header-actions">{actions}</div>}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`card-title ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`card-description ${className}`}>{children}</p>
);

export default Card;
