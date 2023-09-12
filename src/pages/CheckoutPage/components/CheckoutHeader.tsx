import React from 'react';
import arrow from '../../../assets/images/SignUpHeaderImg/arrow.png';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';

const CheckoutHeader = () => {
  const navigate = useNavigate();
  const xHandler = () => {
    navigate('/');
  };

  const arrowHandler = () => {
    console.log('1');
    window.location.reload();
    navigate('/checkout');
  };
  return (
    <div className={'flex flex-row justify-center align-baseline p-5 mb-12 mt-7 relative'}>
      <div className={'cursor-pointer absolute top-0 left-0 lg:left-[-70%] md:left-[-50%] '}>
        <img src={arrow} onClick={arrowHandler} alt={''} />
      </div>
      <h2 className={`${styles.header1} text-gray uppercase font-bold`}>Checkout</h2>
    </div>
  );
};

export default CheckoutHeader;
