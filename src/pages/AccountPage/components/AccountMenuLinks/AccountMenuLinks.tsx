import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { paths } from '@routes/paths.ts';
import CustomSignOut from '@components/logout/SignOut.tsx';
import styles from '@styles/Styles.module.scss';
import Orders from '@assets/images/account/orders.svg';
// import Design from '@assets/images/account/design.svg';
import Preview from '@assets/images/account/preview.svg';
import Details from '@assets/images/account/details.svg';
import Address from '@assets/images/account/address.svg';
import Password from '@assets/images/account/password.svg';
import { useAppSelector } from '@/store/hooks/hooks.ts';

interface Props {
  firstName: string;
  secondName: string;
  account?: boolean;
}
const AccountMenuLinks: React.FC<Props> = ({ firstName, secondName, account }): React.ReactElement => {
  const location = useLocation();
  const { googleAccount } = useAppSelector((state) => state.user);

  const menuItems = [
    { path: paths.accountDetails, label: 'Account Details', img: Details },
    { path: paths.myOrders, label: 'My Orders', img: Orders },
    // TODO
    // { path: paths.designList, label: 'Design List', img: Design },
    { path: paths.shippingAddress, label: 'Shipping Address', img: Address },
  ];

  if (!googleAccount) {
    menuItems.push({ path: paths.changePassword, label: 'Change Password', img: Password });
  }

  menuItems.push({ path: paths.reviews, label: 'Reviews', img: Preview });

  return (
    <div className="h-auto py-2">
      <h1 className={`${account ? styles.subtitle : styles.body2} font-bold mb-2`}>
        {firstName} {secondName}
      </h1>
      <div className="flex flex-col ">
        {menuItems.map((menuItem) => (
          <NavLink key={menuItem.path} to={menuItem.path} className={'py-2 w-[220px] hover:font-bold'}>
            <div
              className={`flex items-center gap-2 ${
                location.pathname === menuItem.path ? 'bg-custom-turquoise py-2 px-3 -ml-3' : ''
              }`}
            >
              <div className={` ${account ? 'border border-mint rounded-full bg-mint w-[36px] h-[36px] flex' : ''}`}>
                <img src={menuItem?.img} alt="" className={` ${account ? 'filter brightness-0 invert m-auto' : ''}`} />
              </div>
              {menuItem.label}
            </div>
          </NavLink>
        ))}
        <div className=" mt-6">
          <CustomSignOut size={26} />
        </div>
      </div>
    </div>
  );
};

export default AccountMenuLinks;
