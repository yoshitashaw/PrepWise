import {ReactNode} from 'react'
import { isAuthenticated } from '@/lib/actions/auth.actions';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) {
     redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </div>
  );
};

export default AuthLayout;