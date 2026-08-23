/**
 * Card — reusable design-system card component.
 * Variants: default | elevated | hover | kpi | stat
 */
export default function Card({
  children,
  variant = 'default',
  className = '',
  padding = true,
  ...props
}) {
  const VARIANT_MAP = {
    default:  'card',
    elevated: 'card-elevated',
    hover:    'card-hover',
    kpi:      'kpi-card',
    stat:     'stat-card',
  };

  const base = VARIANT_MAP[variant] ?? 'card';
  const padClass = padding && variant !== 'kpi' && variant !== 'stat' ? 'p-5' : '';

  return (
    <div className={`${base} ${padClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
