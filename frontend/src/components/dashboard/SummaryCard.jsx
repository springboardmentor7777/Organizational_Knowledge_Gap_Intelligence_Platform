/**
 * SummaryCard.jsx
 * Reusable KPI dashboard summary card component.
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
      bg: 'bg-blue-50/70 hover:bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100 text-blue-600',
    },
    red: {
      bg: 'bg-red-50/70 hover:bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      iconBg: 'bg-red-100 text-red-600',
    },
    amber: {
      bg: 'bg-amber-50/70 hover:bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    emerald: {
      bg: 'bg-emerald-50/70 hover:bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    purple: {
      bg: 'bg-purple-50/70 hover:bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      iconBg: 'bg-purple-100 text-purple-600',
    },
  };

  const style = ACCENT_MAP[accent] || ACCENT_MAP.blue;

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-200 shadow-sm hover:shadow-md ${style.bg} ${style.border}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </p>
        {icon && (
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${style.iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className={`text-3xl font-extrabold ${style.text}`}>{value}</span>
        {subtext && <span className="text-xs text-gray-500 font-medium">{subtext}</span>}
      </div>
    </div>
  );
}
