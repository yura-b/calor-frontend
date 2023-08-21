import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { titles } from '@/translations/titles';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Head from '@/layouts/Head';
import MainLayout from '@/components/MainLayout';
import AccountDetails from './components/AccountDetails';
import MyOrders from './components/MyOrders';
import DesignList from './components/DesignList';
import ShippingAddress from './components/ShippingAddress';
import ChangePassword from './components/ChangePassword';
import Rewiews from './components/Rewiews';
import styles from '@styles/Styles.module.scss';
import AccountMenuLinks from './components/AccountMenuLinks';
import { useAppSelector } from '@/store/hooks/hooks.ts';

const AccountPage: React.FC = (): React.ReactElement => {
  const { firstName, secondName } = useAppSelector((state) => state.user);

  return (
    <div className={'font-poppins text-gray '}>
      <Head title={titles.accountPage} />
      <MainLayout>
        <div className={` ${styles.container} `}>
          <div className="relative hidden lg:block">
            <NavigationLinks color="gray" className=" w-auto" />
          </div>
          <div className="flex mt-4  min-h-[500px] ">
            <div className="pr-12 border-r border-lighterGray">
              <AccountMenuLinks firstName={firstName} secondName={secondName} />
            </div>
            <div className="pl-6">
              <Routes>
                <Route index element={<Navigate to={paths.accountDetails} />} />
                <Route path={paths.accountDetails} element={<AccountDetails />} />
                <Route path={paths.myOrders} element={<MyOrders />} />
                <Route path={paths.designList} element={<DesignList />} />
                <Route path={paths.shippingAddress} element={<ShippingAddress />} />
                <Route path={paths.changePassword} element={<ChangePassword />} />
                <Route path={paths.reviews} element={<Rewiews />} />
              </Routes>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default AccountPage;
