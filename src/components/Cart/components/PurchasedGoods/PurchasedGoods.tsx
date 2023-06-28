import React, { useState } from 'react';
import purchasedGoodsImg from '@assets/cartImages/purchasedGoodsImg.svg';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';
import Button from '../../../ui/Button';
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
          <p className="text-xl font-bold">{title}</p>
          <Button className="w-8 border-0 flex items-center justify-center h-8" onClick={handleClick}>
            <img src={deleteIcon} />
          </Button>
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
