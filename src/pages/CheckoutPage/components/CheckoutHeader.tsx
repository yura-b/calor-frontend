import React from 'react';
import arrow from '../../../assets/images/SignUpHeaderImg/arrow.png';
import { useNavigate } from 'react-router';

const CheckoutHeader = () => {
  const navigate = useNavigate();
  const xHandler = () => {
    navigate('/');
  };

  const arrowHandler = () => {
    console.log('1');
  };
  return (
    <div className={'flex flex-row align-baseline p-5 mb-12'}>
      <img src={arrow} onClick={arrowHandler} alt={''} />
      <h3 className={'uppercase font-bold'}>Checkout</h3>
    </div>
  );
};

export default CheckoutHeader;
