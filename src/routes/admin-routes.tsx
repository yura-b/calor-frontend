import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from '@pages/admin/main/MainPage.tsx';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import {Role} from '@/constants/enums/role.enum.ts';
import UserGridPage from '@pages/admin/users/UserGridPage.tsx';
import {useNavigate} from 'react-router';

const AdminRoutes = () => {
    const {roles, access_token} = useAppSelector((state) => state.user);
    const isAdmin = roles?.includes(Role.ADMIN) || (roles?.includes(Role.MANAGER) && access_token);
    const navigate = useNavigate()

    if (!access_token) return  navigate('login');
    if (!isAdmin) return <></>;

    return (
        <Route path={'admin'}>
            <Route index element={<MainPage/>}/>
            <Route path={'users'} element={<UserGridPage/>}/>
        </Route>
    );
};

export default AdminRoutes;
