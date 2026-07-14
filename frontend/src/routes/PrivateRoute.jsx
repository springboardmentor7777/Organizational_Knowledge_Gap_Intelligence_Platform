import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuthContext();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
        <Spinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard
    const roleRoutes = {
      EMPLOYEE: '/employee-dashboard',
      MANAGER: '/manager-dashboard',
      HR: '/hr-dashboard',
      ADMIN: '/admin-dashboard',
    };
    return <Navigate to={roleRoutes[user.role] || '/dashboard'} replace />;
  }

  return children;
};

export default PrivateRoute;
