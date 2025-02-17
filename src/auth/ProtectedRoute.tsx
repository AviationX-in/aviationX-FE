import { useAuth0 } from '@auth0/auth0-react';
import Homepage from '@/components/pages/Homepage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Homepage />;
  }

  return children;
}

export default ProtectedRoute;
