import React from 'react';
import { titles } from '@/translations/titles';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Head from '@/layouts/Head';
import MainLayout from '@/components/MainLayout';
import styles from '@styles/Styles.module.scss';
import AccountMenuLinks from '../AccountMenuLinks';
import { useMediaQuery } from '@react-hook/media-query';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';

const AccountLayout = ({ children, bgColor = 'mintExtraLight' }: { children: React.ReactNode; bgColor?: string }) => {
  const { roles, access_token, firstName, secondName } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <div className={'font-poppins text-gray '}>
      <Head title={titles.accountPage} />
      <MainLayout>
        <div
          className={`${isMobile ? 'px-0 py-0 max-w-full' : styles.container} ${
            isRegisteredUser && isMobile ? `bg-${bgColor}` : ''
          } `}
        >
          <div className="relative hidden lg:block">
            <NavigationLinks color="gray" className=" w-auto" />
          </div>
          <div className="flex lg:mt-4  min-h-[500px]">
            <div className="pr-12 border-r border-lighterGray hidden lg:block">
              <AccountMenuLinks firstName={firstName} secondName={secondName} />
            </div>
            <div className="lg:pl-6 w-full">{children}</div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default AccountLayout;
