import React from 'react';
import styles from '@styles/Styles.module.scss';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';
import { useMutation, useQueryClient } from 'react-query';
import { deleteFromBasket } from '@/api/basket';
import { useDispatch } from 'react-redux';
import { BasketProduct, decreaseQuantity, increaseQuantity, removeFromBasket } from '@/store/reducers/BasketSlice';
import { useAppSelector } from '@/store/hooks/hooks';

const PurchasedGoods = ({ item }: { item: BasketProduct }): React.ReactElement => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userId } = useAppSelector((state) => state.user);

  const incrementCount = () => {
    dispatch(increaseQuantity({ id: item._id }));
  };
  const decrementCount = () => {
    dispatch(decreaseQuantity({ id: item._id }));
  };
  const mutation = useMutation(deleteFromBasket, {
    onSuccess: (data) => {
      dispatch(removeFromBasket(item._id));
      queryClient.invalidateQueries('userBasket');
    },
  });
  const handleClick = () => {
    const requestData = {
      recordId: item._id,
      userId: userId,
    };
    mutation.mutate(requestData);
  };

  return (
    <div className="mb-4">
      <div className="flex text-gray gap-5">
        <div className="basis-[30%] lg:basis-[50%] lg:relative flex justify-center items-center">
          <img
            src={item.photo}
            className="object-contain object-cover w-[120px] h-auto sm:w-[140px] md:w-[160px] lg:w-[140px] lg:z-20"
          />
          <div className="hidden lg:block w-[100px] h-[100px] lg:bg-grayExtraLight lg:rounded-full lg:absolute  lg:z-10 lg:top-1 lg:left-1/2 lg:transform -translate-x-1/2"></div>
        </div>
        <div className="w-full basis-[70%]">
          <div className="flex justify-between items-center">
            <h2 className={`${styles.header2} text-gray text-xl`}>{item.title}</h2>
            <div className="p-1 flex items-center justify-center cursor-pointer" onClick={handleClick}>
              <img src={deleteIcon} />
            </div>
          </div>
          <p className={`${styles.body2} mt-2`}>
            {' '}
            Size: <span>{item.size}</span>
          </p>
          <div className="flex justify-between items-baseline">
            <p className={`${styles.body2} font-bold`}>$ {item.price}</p>
            <div className="flex justify-between items-center w-12 mt-2 mb-2">
              <div className="cursor-pointer" onClick={decrementCount}>
                -
              </div>
              <div>
                <span>{item.count}</span>
              </div>
              <div className="cursor-pointer" onClick={incrementCount}>
                +
              </div>
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
