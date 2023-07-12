import React from 'react';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <div className={'flex gap-44 w-full justify-center bg-mint p-5 ' + styles.header}>
      <p>Orders</p>
      <p>Products</p>
      <p>Reviews</p>
      <p>ETC</p>
    </div>
  );
};

export default Header;
