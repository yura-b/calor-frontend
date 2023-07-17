import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import UsersGrid from '@pages/admin/users/components/userGrid/UsersGrid.tsx';

const UserGridPage = () => {
    return (
        <AdminLayout>
            <UsersGrid/>
        </AdminLayout>
    );
};

export default UserGridPage;
