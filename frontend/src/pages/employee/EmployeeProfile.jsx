import { useAuth } from '../../context/AuthContext';

// ── Small presentational component ────────────────────
function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}

export default function EmployeeProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        No user session found. Please log in.
      </p>
    );
  }

  // Derive avatar initials from the user name
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Avatar + name header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-blue-600">{initials}</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Info grid */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="Full Name"  value={user.name} />
          <InfoField label="Role"       value={user.role} />
          <InfoField label="Email"      value="demo@company.com" />
          <InfoField label="Department" value="— Not assigned" />
        </div>

        {/* Skills placeholder */}
        <div className="px-6 py-5 border-t border-gray-100">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Skills</h2>
          <p className="text-sm text-gray-400 italic">
            No skills assigned yet.
          </p>
        </div>

        {/* Edit profile (placeholder) */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            disabled
            title="Edit profile will be available after backend integration"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-40 cursor-not-allowed"
          >
            Edit Profile (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
}
