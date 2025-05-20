import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/User.context';
import { JSX } from 'react';

type Props = {
  children: JSX.Element;
  inverse?: boolean; // true = route for unauthenticated users (e.g. login)
};

const ProtectedRoute = ({ children, inverse = false }: Props) => {
  const { user } = useUser();
  const location = useLocation();

  if (inverse) {
    // This route is for guests only (e.g., login/register)
    // If user is already logged in, redirect to dashboard
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  // This route is protected — only logged-in users can access
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
