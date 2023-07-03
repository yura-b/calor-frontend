import React, { ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}
const TokenGuard: React.FC<IProps> = ({ children }) => {
  const { access_token } = useAppSelector((state) => state.user);
  if (access_token) return <Navigate to={'/'} />;

  return <>{children}</>;
};

export default TokenGuard;
