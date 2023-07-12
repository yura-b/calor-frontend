import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '@pages/admin/main/MainPage.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';

const AdminRoutes = () => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isAdmin = roles?.includes(Role.ADMIN) || (roles?.includes(Role.MANAGER) && access_token);

  if (!access_token) return <Navigate to={'/login'} />;
  if (!isAdmin) return <></>;

  return (
    <Routes>
      <Route path={''} element={<MainPage />} />
    </Routes>
  );
};

export default AdminRoutes;
