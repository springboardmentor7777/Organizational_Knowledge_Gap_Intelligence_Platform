import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">

      {/* Brand */}
      <Link
        to="/dashboard"
        className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors"
      >
        Org Knowledge Gap Platform
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {user && (
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800 leading-none">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{user.role}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
