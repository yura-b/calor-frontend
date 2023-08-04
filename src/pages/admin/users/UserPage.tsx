import React, { useState } from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UsersGrid from '@pages/admin/users/components/userGrid/UsersGrid.tsx';
import UserGridHeader from '@pages/admin/users/components/userGrid/UserGridHeader.tsx';

const UserPage = () => {
  const [nameFilter, setNameFilter] = useState('');
  return (
    <AdminLayout>
      <UserGridHeader nameFilter={{ nameFilter, setNameFilter }} />
      <UsersGrid nameFilter={nameFilter} />
    </AdminLayout>
  );
};

export default UserPage;
