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
    <div className="mb-4">
      <div className="flex  text-gray ">
        <div className="basis-[30%] lg:basis-[50%] lg:relative">
          <img
            src={purchasedGoodsImg}
            className="object-contain object-cover w-[120px] h-auto sm:w-[140px] md:w-[160px] lg:w-[140px] lg:z-20 lg:absolute lg:-top-3 lg:left-1/2 lg:transform lg:-translate-x-1/2"
          />
          <div className="hidden lg:block w-[100px] h-[100px] lg:bg-grayExtraLight lg:rounded-full lg:absolute  lg:z-10 lg:top-1 lg:left-1/2 lg:transform -translate-x-1/2"></div>
        </div>
        <div className="w-full basis-[70%]">
          <div className="flex justify-between items-center">
            <h2 className={`${styles.header2} text-gray text-xl`}>{title}</h2>
            <div className="p-1 flex items-center justify-center" onClick={handleClick}>
              <img src={deleteIcon} />
            </div>
          </div>
          <p className={`${styles.body2} mt-2`}>
            {' '}
            Size: <span>{size}</span>
          </p>
          <div className="flex justify-between items-baseline">
            <p className={`${styles.body2} font-bold`}>$ {price}</p>
            <div className="flex justify-between items-center w-12 mt-2 mb-2">
              <div onClick={decrementCount}>-</div>
              <div>
                <span>{count}</span>
              </div>
              <div onClick={incrementCount}>+</div>
            </div>
          </div>
          <p className={`${styles.body2} lg:text-[16px]  lg:hidden`}>
            This product is custom-made and delivered to you in X weeks.
          </p>
        </div>
      </div>
      <p className={`${styles.body2} lg:text-[16px] hidden lg:block `}>
        This product is custom-made and delivered to you in X weeks.
      </p>
    </div>
  );
};

export default PurchasedGoods;
