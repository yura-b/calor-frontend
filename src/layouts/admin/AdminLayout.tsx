import React, { ReactNode, useEffect } from 'react';
import Header from '@layouts/admin/header/Header.tsx';
import SubmitDialog from '@components/dialogs/admin/SubmitDialog.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { useNavigate } from 'react-router';

interface IProps {
  children: ReactNode;
}

const AdminLayout: React.FC<IProps> = ({ children }) => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isAdmin = !!(roles?.includes(Role.ADMIN) || (roles?.includes(Role.MANAGER) && access_token));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin]);
  return (
    <div className={'flex'}>
      <Header />
      <div className={'w-5/6 ml-marginForLeftHeader'}>
        {children}
      </div>
      <SubmitDialog />
    </div>
  );
};

export default AdminLayout;
