/**
 * EmptyState
 * Displayed when a list has no items to show,
 * either because the data is empty or a filter returned no results.
 */
export default function EmptyState({
  title = 'No results found',
  message,
}) {
  return (
    <div className="empty-container">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
        <svg className="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-700 mb-1.5">
        {title}
      </h3>
      {message && (
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          {message}
        </p>
      )}
    </div>
  );
}
