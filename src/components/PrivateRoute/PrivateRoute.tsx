import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';

const PrivateRoute = ({ element }) => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);

  if (!isRegisteredUser) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
