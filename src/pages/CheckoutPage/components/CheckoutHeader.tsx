import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';

const CheckoutHeader = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const arrowHandler = () => {
    navigate(-1);
    setIsCartOpen(true);
  };

  return (
    <div className={` ${styles.container} flex flex-row justify-center items-center align-baseline mb-4 py-4 relative`}>
      <div className={'cursor-pointer mr-auto'} onClick={arrowHandler}>
        <ReactSVG
          src={leftArrowIcon}
          beforeInjection={(svg) => {
            svg.classList.add('icon');
            svg.setAttribute('stroke', '#404040');
          }}
        />
      </div>
      <h2 className={`${styles.header1} text-gray uppercase font-bold m-auto ml-0`}>Checkout</h2>
    </div>
  );
};

export default CheckoutHeader;
