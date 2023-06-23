import React from 'react';

import style from './cart.module.scss';
import basketImage from '@/assets/cartImages/basketIcon.svg';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  const cartPurchasedItems = [
    {
      title: 'Sunrise',
      size: 38,
      price: 10,
    },
    {
      title: 'Sun',
      size: 36,
      price: 100,
    },
  ];
  return (
    <div className={style.cartContainer}>
      <div className={style.cartHeader}>
        <div className={style.title}>{title.toUpperCase()}</div>
        <div className={style.headerNavigation}>
          <div className={style.customBadgeContainer}>
            <img src={basketImage} alt="Basket" />
            {cartPurchasedItems.length ? <span className={style.customBadge}>{cartPurchasedItems.length}</span> : ''}
          </div>
          <img src={closeBtnImage} onClick={onClose} className="mr-6" />
        </div>
      </div>
      <div className={style.cartBody}>
        {!cartPurchasedItems.length ? (
          <>
            <div className={style.itemsInfo}>The are no items in your card</div>
            <EmptyCart title="" />
          </>
        ) : (
          ''
        )}
        {cartPurchasedItems.length ? (
          <>
            <div className={style.itemsInfo}>Items in your cart are not reserved - checkout now to make them yours</div>
            {cartPurchasedItems.map((item) => (
              <PurchasedGoods title={item.title} size={item.size} price={item.price} />
            ))}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Cart;
