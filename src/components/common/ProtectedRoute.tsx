import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route guard that redirects unauthenticated users to /login.
 * Preserves the attempted URL so the user can be redirected back after login.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
