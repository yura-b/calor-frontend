import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import purchasedGoodsImg from '@assets/cartImages/purchasedGoodsImg.svg';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';
import { useMutation, useQueryClient } from 'react-query';
import { deleteFromBasket } from '@/api/basket';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '@/store/reducers/UserReducer.ts';
interface Props {
  title: string;
  size: number;
  price: number;
  countGoogs: number;
  id: string;
  photo: string;
}

const PurchasedGoods: React.FC<Props> = ({ id, title, size, price, countGoogs, photo }): React.ReactElement => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const [count, setCount] = useState(countGoogs);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const mutation = useMutation(deleteFromBasket, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('userBasket');
    },
  });
  const handleClick = () => {
    const requestData = {
      recordId: id,
      userId: userId,
    };
    mutation.mutate(requestData);
  };
  return (
    <div className="mb-4">
      <div className="flex text-gray gap-5">
        <div className="basis-[30%] lg:basis-[50%] lg:relative flex justify-center items-center">
          <img
            src={photo}
            className="object-contain object-cover w-[120px] h-auto sm:w-[140px] md:w-[160px] lg:w-[140px] lg:z-20"
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
            Your order will be customized and delivered within 7-10 days.
          </p>
        </div>
      </div>
      <p className={`${styles.body2} lg:text-[16px] hidden lg:block `}>
        Your order will be customized and delivered within 7-10 days
      </p>
    </div>
  );
};

export default PurchasedGoods;
