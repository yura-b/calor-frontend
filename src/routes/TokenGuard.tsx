import React, { ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Navigate } from 'react-router-dom';
import { Role } from '@/constants/enums/role.enum.ts';

interface IProps {
  children: ReactNode;
}
const TokenGuard: React.FC<IProps> = ({ children }) => {
  const { access_token, roles } = useAppSelector((state) => state.user);
  const isAdmin = !!roles?.find((role) => role !== Role.USER);

  if (!access_token) return <>{children}</>;

  if (isAdmin) return <Navigate to={'/admin/'} />;

  if (!isAdmin) return <Navigate to={'/'} />;
};

export default TokenGuard;
