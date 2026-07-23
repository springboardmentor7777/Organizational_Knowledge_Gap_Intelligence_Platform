/**
 * SummaryCard.jsx
 * Premium KPI dashboard summary card component.
 */
export default function SummaryCard({
  title,
  value,
  subtext,
  icon,
  accent = 'blue',
}) {
  const ACCENT_MAP = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      iconBg:   'bg-blue-50 text-blue-600 ring-1 ring-blue-100',
      value:    'text-blue-700',
      subBg:    'bg-blue-50/60',
      bar:      'bg-blue-500',
    },
    red: {
      gradient: 'from-red-500 to-rose-600',
      iconBg:   'bg-red-50 text-red-600 ring-1 ring-red-100',
      value:    'text-red-700',
      subBg:    'bg-red-50/60',
      bar:      'bg-red-500',
    },
    amber: {
      gradient: 'from-amber-400 to-amber-500',
      iconBg:   'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
      value:    'text-amber-700',
      subBg:    'bg-amber-50/60',
      bar:      'bg-amber-400',
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-500',
      iconBg:   'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
      value:    'text-emerald-700',
      subBg:    'bg-emerald-50/60',
      bar:      'bg-emerald-500',
    },
    purple: {
      gradient: 'from-purple-500 to-indigo-600',
      iconBg:   'bg-purple-50 text-purple-600 ring-1 ring-purple-100',
      value:    'text-purple-700',
      subBg:    'bg-purple-50/60',
      bar:      'bg-purple-500',
    },
    indigo: {
      gradient: 'from-indigo-500 to-indigo-700',
      iconBg:   'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
      value:    'text-indigo-700',
      subBg:    'bg-indigo-50/60',
      bar:      'bg-indigo-500',
    },
  };

  const style = ACCENT_MAP[accent] || ACCENT_MAP.blue;

  return (
    <div className="card-hover overflow-hidden group">
      {/* Top gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${style.gradient} rounded-t-xl`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 leading-tight pr-2">
            {title}
          </p>
          {icon && (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-110 ${style.iconBg}`}>
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline justify-between gap-2">
          <span className={`text-3xl font-extrabold tracking-tight ${style.value}`}>
            {value}
          </span>
        </div>

        {/* Subtext */}
        {subtext && (
          <div className={`mt-3 pt-3 border-t border-slate-100`}>
            <p className="text-xs text-slate-500 font-medium">{subtext}</p>
          </div>
        )}
      </div>
    </div>
  );
}
