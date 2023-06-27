import React, { useState } from 'react';
import purchasedGoodsImg from '@assets/cartImages/purchasedGoodsImg.svg';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';

interface Props {
  title: string;
  size: number;
  price: number;
}

const PurchasedGoods: React.FC<Props> = ({ title, size, price }): React.ReactElement => {
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="flex max-w-lg text-darkGray mx-6">
      <div className="basis-4/12">
        <img src={purchasedGoodsImg} />
      </div>
      <div className="w-full basis-8/12">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">{title}</p>
          <div>
            <img src={deleteIcon} />
          </div>
        </div>
        <div className="mt-2 text-base">
          <p>
            {' '}
            Size: <span>{size}</span>
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-base">$ {price}</p>
          <div className="flex justify-between items-center w-12 mt-2 mb-2">
            <div onClick={decrementCount}>-</div>
            <div>
              <span>{count}</span>
            </div>
            <div onClick={incrementCount}>+</div>
          </div>
        </div>
        <p className="text-sm">This product is custom-made and delivered to you in X weeks.</p>
      </div>
    </div>
  );
};

export default PurchasedGoods;
