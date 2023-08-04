import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UserProfile from '@pages/admin/users/components/userProfile/UserProfile.tsx';
import UserPageHeader from '@pages/admin/users/components/userProfile/UserPageHeader.tsx';

const UserProfilePage = () => {
  return (
    <AdminLayout>
      <UserPageHeader bottomText={'Customers profile'} upperText={'Back to Customers List'} buttonAvailable={true} url={'/admin/users'}/>
      <UserProfile />
    </AdminLayout>
  );
};

export default UserProfilePage;
