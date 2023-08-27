import React from 'react';
import { titles } from '@/translations/titles';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Head from '@/layouts/Head';
import MainLayout from '@/components/MainLayout';
import styles from '@styles/Styles.module.scss';
import AccountMenuLinks from '../AccountMenuLinks';
import { useAppSelector } from '@/store/hooks/hooks.ts';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
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
            <div className="pr-12 border-r border-lighterGray hidden lg:block">
              <AccountMenuLinks firstName={firstName} secondName={secondName} />
            </div>
            <div className="pl-6 lg:w-full">{children}</div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default AccountLayout;
