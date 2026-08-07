export default function Heatmap({ cells }) {
  if (!cells?.length) return <p className="py-6 text-sm text-slate-500">No gap data yet.</p>;

  const groups = [...new Set(cells.map((c) => c.group))];
  const skills = [...new Set(cells.map((c) => c.skillName))];
  const lookup = new Map(cells.map((c) => [`${c.group}||${c.skillName}`, c]));

  const color = (gap) => {
    if (gap === undefined || gap === null) return "bg-slate-50 text-slate-300";
    if (gap === 0) return "bg-emerald-100 text-emerald-800";
    if (gap === 1) return "bg-amber-100 text-amber-800";
    if (gap === 2) return "bg-orange-200 text-orange-900";
    return "bg-red-300 text-red-900";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white p-2 text-left font-semibold">Group / Skill</th>
            {skills.map((s) => (
              <th key={s} className="p-2 text-left font-semibold">
                <span className="block w-24 leading-tight">{s}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g}>
              <td className="sticky left-0 bg-white p-2 font-medium">{g}</td>
              {skills.map((s) => {
                const cell = lookup.get(`${g}||${s}`);
                return (
                  <td key={s} className="p-0">
                    <div
                      className={`grid h-9 w-24 place-items-center rounded font-bold ${color(
                        cell?.averageGap
                      )}`}
                      title={cell ? `${s}: avg gap ${cell.averageGap}` : "not required"}
                    >
                      {cell ? cell.averageGap : "–"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
        <Legend className="bg-emerald-100" label="No gap" />
        <Legend className="bg-amber-100" label="1 level" />
        <Legend className="bg-orange-200" label="2 levels" />
        <Legend className="bg-red-300" label="3+ levels (critical)" />
      </div>
    </div>
  );
}

function Legend({ className, label }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-3 w-5 rounded ${className}`} /> {label}
    </span>
  );
}
