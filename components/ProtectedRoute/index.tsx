import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../../AuthProvider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) {
      router.push('/');
    }
  }, [router, user]);

  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;
