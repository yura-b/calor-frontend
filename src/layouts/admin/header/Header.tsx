import React from 'react';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <div className={'flex flex-col gap-44 w-1/12 h-full justify-center bg-mint p-5' + styles.header}>
      <p>Orders</p>
      <p>Products</p>
      <p>Reviews</p>
      <p>ETC</p>
    </div>
  );
};

export default Header;
