import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import purchasedGoodsImg from '@assets/cartImages/purchasedGoodsImg.svg';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';
interface Props {
  title: string;
  size: number;
  price: number;
  countGoogs: number;
}

const PurchasedGoods: React.FC<Props> = ({ title, size, price, countGoogs }): React.ReactElement => {
  const [count, setCount] = useState(countGoogs);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className="flex max-w-lg text-gray">
      <div className="basis-4/12">
        <img src={purchasedGoodsImg} />
      </div>
      <div className="w-full basis-8/12">
        <div className="flex justify-between items-center">
          <h2 className={`${styles.header2} text-gray`}>{title}</h2>
          <div className="p-1 flex items-center justify-center" onClick={handleClick}>
            <img src={deleteIcon} />
          </div>
        </div>
        <p className={`${styles.body1} mt-2`}>
          {' '}
          Size: <span>{size}</span>
        </p>
        <div className="flex justify-between items-baseline">
          <p className={styles.body1}>$ {price}</p>
          <div className="flex justify-between items-center w-12 mt-2 mb-2">
            <div onClick={decrementCount}>-</div>
            <div>
              <span>{count}</span>
            </div>
            <div onClick={incrementCount}>+</div>
          </div>
        </div>
        <p className={styles.body2}>This product is custom-made and delivered to you in X weeks.</p>
      </div>
    </div>
  );
};

export default PurchasedGoods;
