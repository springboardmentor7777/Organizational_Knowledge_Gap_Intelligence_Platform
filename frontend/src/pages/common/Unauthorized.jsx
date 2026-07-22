import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <p className="text-7xl font-black text-slate-200 mb-2">401</p>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Access denied</h1>
        <p className="text-sm text-slate-500 mb-7 max-w-xs mx-auto">
          You don&apos;t have permission to view this page. Please sign in with the correct account.
        </p>
        <Link to="/login" className="btn-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
}
