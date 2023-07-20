import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserProfile from '@pages/admin/users/components/userProfile/UserProfile.tsx';

const UserProfilePage = () => {
  return (
    <AdminLayout>
      <UserProfile />
    </AdminLayout>
  );
};

export default UserProfilePage;
