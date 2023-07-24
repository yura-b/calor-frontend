import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserProfile from '@pages/admin/users/components/userProfile/UserProfile.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';

const UserProfilePage = () => {
  return (
    <AdminLayout>
      <UserPageHeader />
      <UserProfile />
    </AdminLayout>
  );
};

export default UserProfilePage;
