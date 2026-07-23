import { useAuth } from '../../context/AuthContext';

// ── Small presentational component ────────────────────
function InfoField({ label, value }) {
  return (
    <div>
      <p className="form-label">{label}</p>
      <p className="text-sm text-slate-800 font-medium">{value}</p>
    </div>
  );
}

export default function EmployeeProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="empty-container">
        <p className="text-sm text-slate-500">
          No user session found. Please log in.
        </p>
      </div>
    );
  }

  // Derive avatar initials from the user name or email
  const displayName = user.name || user.username || user.email || 'User';
  const initials = displayName
    .split(/[\s@]+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="page-container max-w-2xl">
      <div>
        <h1 className="page-header-title">My Profile</h1>
        <p className="page-header-subtitle">Your account details and preferences</p>
      </div>

      <div className="card overflow-hidden">

        {/* ── Avatar + name header ─────────────────────── */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-5 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="avatar-xl text-xl shrink-0">{initials}</div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{displayName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge-info text-xs">{user.role || 'ROLE_EMPLOYEE'}</span>
            </div>
          </div>
        </div>

        {/* ── Info grid ────────────────────────────────── */}
        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="Username / Full Name" value={displayName} />
          <InfoField label="Role"                 value={user.role || 'ROLE_EMPLOYEE'} />
          <InfoField label="Email"                value={user.email || '—'} />
          <InfoField label="Account ID"           value={user.id ? `#${user.id}` : '—'} />
        </div>

        {/* ── Skills placeholder ───────────────────────── */}
        <div className="px-6 py-5 border-t border-slate-100">
          <h2 className="section-header mb-3">Skills</h2>
          <p className="text-sm text-slate-400 italic">
            No skills assigned yet.
          </p>
        </div>

        {/* ── Edit profile (placeholder) ──────────────── */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            disabled
            title="Edit profile will be available after backend integration"
            className="btn-primary opacity-40 cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit Profile (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
}
