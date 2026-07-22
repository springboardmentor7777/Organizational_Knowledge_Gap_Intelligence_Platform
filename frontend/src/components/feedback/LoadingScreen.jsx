/**
 * LoadingScreen
 * Displayed while async data is being fetched.
 */
export default function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 animate-fadeIn">
      {/* Spinner */}
      <div className="relative w-14 h-14 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spinSlow" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
      </div>

      <p className="text-sm font-semibold text-slate-700 mb-1">Please wait</p>
      <p className="text-xs text-slate-400 max-w-xs text-center">{message}</p>
    </div>
  );
}
