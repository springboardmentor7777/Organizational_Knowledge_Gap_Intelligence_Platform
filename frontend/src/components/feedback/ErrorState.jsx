/**
 * ErrorState
 * Displayed when a data fetch fails.
 * Accepts an optional onRetry callback.
 */
export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="empty-container animate-fadeIn">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 shadow-sm">
        <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-800 mb-1.5">
        Something went wrong
      </h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          id="error-state-retry-btn"
          onClick={onRetry}
          className="btn-primary"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}
