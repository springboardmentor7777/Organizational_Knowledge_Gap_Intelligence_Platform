import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuthContext();

  if (loading) return null;

  if (isAuthenticated && user) {
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

export default PublicRoute;
