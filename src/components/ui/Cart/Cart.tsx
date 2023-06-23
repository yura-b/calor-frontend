import React from 'react';

import style from './cart.module.scss';
import basketImage from '@/assets/cartImages/basket.png';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';
import basketLayout from '@assets/cartImages/basketLayout.svg';
import layout from '@assets/cartImages/layout.svg';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  return (
    <div className={style.cartContainer}>
      <div className={style.cartHeader}>
        <div>{title.toUpperCase()}</div>
        <div>
          <img src={basketImage} />
          <img src={closeBtnImage} onClick={onClose} />
        </div>
      </div>
      <div className={style.cartBody}>
        <div className={style.itemsInfo}>The are no items in your cart</div>
        <div className={style.bodyLayout}>
          <img src={layout} />
          <img src={basketLayout} />
        </div>
        <button style={{ marginTop: '50px' }}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
