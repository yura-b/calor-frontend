import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { paths } from '@routes/paths.ts';
import CustomSignOut from '@components/logout/SignOut.tsx';
import styles from '@styles/Styles.module.scss';

import Orders from '@assets/images/account/orders.svg';
import Design from '@assets/images/account/design.svg';
import Preview from '@assets/images/account/preview.svg';
import Details from '@assets/images/account/details.svg';
import Address from '@assets/images/account/address.svg';
import Password from '@assets/images/account/password.svg';
interface Props {
  firstName: string;
  secondName: string;
}
const AccountMenuLinks: React.FC<Props> = ({ firstName, secondName }): React.ReactElement => {
  const location = useLocation();

  const menuItems = [
    { path: paths.accountDetails, label: 'Account Details', img: Details },
    { path: paths.myOrders, label: 'My Orders', img: Orders },
    { path: paths.designList, label: 'Design List', img: Design },
    { path: paths.shippingAddress, label: 'Shipping Address', img: Address },
    { path: paths.changePassword, label: 'Change Password', img: Password },
    { path: paths.reviews, label: 'Reviews', img: Preview },
  ];

  return (
    <div className="h-auto">
      <h1 className={`${styles.body2} font-bold mb-4`}>
        {firstName} {secondName}
      </h1>
      <div className="flex flex-col ">
        {menuItems.map((menuItem) => (
          <NavLink
            key={menuItem.path}
            to={menuItem.path}
            className={`${
              location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === menuItem.path
                ? 'bg-custom-turquoise'
                : ''
            } py-2 px-3 -ml-3`}
          >
            <div className="flex gap-2">
              <img src={menuItem?.img} />
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
