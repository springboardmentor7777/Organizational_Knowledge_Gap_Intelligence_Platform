export function Stat({ label, value, suffix, tone = "brand", hint }) {
  const tones = {
    brand: "text-brand",
    danger: "text-danger",
    warn: "text-warn",
    slate: "text-slate-700",
  };
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${tones[tone]}`}>
        {value}
        {suffix && <span className="text-lg font-semibold">{suffix}</span>}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SeverityBadge({ severity }) {
  const map = {
    NONE: "bg-emerald-100 text-emerald-700",
    LOW: "bg-slate-100 text-slate-700",
    MEDIUM: "bg-amber-100 text-amber-800",
    HIGH: "bg-orange-100 text-orange-800",
    CRITICAL: "bg-red-100 text-red-700",
  };
  return <span className={`badge ${map[severity] || map.NONE}`}>{severity}</span>;
}

export function LevelBar({ current = 0, required = 0 }) {
  return (
    <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full bg-brand" style={{ width: `${(current / 4) * 100}%` }} />
      <div className="relative -mt-2 h-2">
        <div
          className="absolute top-0 h-2 w-0.5 bg-slate-700"
          style={{ left: `${(required / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function Progress({ value = 0 }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Loader({ label = "Loading…" }) {
  return <p className="py-10 text-center text-sm text-slate-500">{label}</p>;
}

export function Empty({ label }) {
  return <p className="py-8 text-center text-sm text-slate-500">{label}</p>;
}
