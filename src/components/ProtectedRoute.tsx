
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'moderator' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();

  // If still loading auth state, show nothing
  if (isLoading) {
    return null;
  }

  // If not logged in, redirect to auth page
  if (!user) {
    toast.error('Please sign in to access this page', {
      id: 'auth-required',
      duration: 3000,
    });
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If role is required but user doesn't have it
  if (requiredRole && userRole !== requiredRole && userRole !== 'moderator') {
    toast.error(`You need ${requiredRole} privileges to access this page`, {
      id: 'role-required',
      duration: 3000,
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
