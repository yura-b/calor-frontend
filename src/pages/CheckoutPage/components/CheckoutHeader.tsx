import React, { useState } from 'react';
import arrow from '../../../assets/images/SignUpHeaderImg/arrow.png';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';

const CheckoutHeader = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const arrowHandler = () => {
    navigate(-1);
    setIsCartOpen(true);
  };

  return (
    <div className={` ${styles.container} flex flex-row justify-center items-center align-baseline mb-4 py-4 relative`}>
      <div className={'cursor-pointer mr-auto'}>
        <img src={arrow} onClick={arrowHandler} alt={''} />
      </div>
      <h2 className={`${styles.header1} text-gray uppercase font-bold m-auto ml-0`}>Checkout</h2>
    </div>
  );
};

export default CheckoutHeader;
