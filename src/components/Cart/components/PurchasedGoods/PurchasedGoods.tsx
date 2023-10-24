import React, { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import deleteIcon from '@/assets/cartImages/deleteIcon.svg';
import { useMutation, useQueryClient } from 'react-query';
import { deleteFromBasket, updateBasketItemQuantity } from '@/api/basket';
import { useDispatch } from 'react-redux';
import { BasketProduct, decreaseQuantity, increaseQuantity, removeFromBasket } from '@/store/reducers/BasketSlice';
import { useAppSelector } from '@/store/hooks/hooks';
import {
  removeFromCartNonRegisterUser,
  decreaseQuantityNonRegisterUser,
  increaseQuantityNonRegisterUser,
} from '@/store/reducers/BasketForNonRegisterUser';
import { debounce } from 'lodash';
import { removeFromCartGTMEvent } from '@/helpers/functions/gtm';

const PurchasedGoods = ({ item }: { item: BasketProduct }): React.ReactElement => {
  const dispatch = useDispatch();
  const { userId } = useAppSelector((state) => state.user);
  const [count] = useState(item.count);

  const mutationUpdateItemQuantity = useMutation(updateBasketItemQuantity);

  const mutation = useMutation(deleteFromBasket, {
    onSuccess: (data) => {
      dispatch(removeFromBasket(item._id));
    },
  });

  useEffect(() => {
    if (count !== item.count) {
      mutationUpdateItemQuantity.mutate({ userId, basketItemId: item.basketItemId, count: item.count });
    }
  }, [item.count]);

  const incrementCount = debounce(() => {
    if (userId) {
      dispatch(increaseQuantity({ basketItemId: item.basketItemId }));
    } else {
      dispatch(increaseQuantityNonRegisterUser({ basketItemId: item.basketItemId }));
    }
  }, 200);

  const decrementCount = debounce(() => {
    if (userId) {
      dispatch(decreaseQuantity({ basketItemId: item.basketItemId }));
    } else {
      dispatch(decreaseQuantityNonRegisterUser({ basketItemId: item.basketItemId }));
    }
  }, 200);

  const handleClick = () => {
    const requestData = {
      recordId: item._id,
      userId: userId,
    };
    if (userId) {
      mutation.mutate(requestData);
      removeFromCartGTMEvent('remove_from_cart', {
        id: item?.accessory?._id || item?.shoes?._id,
        title: item?.accessory?.title || item?.shoes?.title,
      });
    } else {
      dispatch(removeFromCartNonRegisterUser(item.basketItemId));
      removeFromCartGTMEvent('remove_from_cart', { id: item._id, title: item.title });
    }
  };

  return (
    <div className="mb-10">
      <div className="flex text-gray gap-5">
        <div className="basis-[30%] lg:basis-[50%] lg:relative flex justify-center items-center">
          <img
            src={item.photo}
            className="object-contain object-cover w-[120px] h-auto sm:w-[140px] md:w-[160px] lg:w-[140px] lg:z-20"
          />
        </div>
        <div className="w-full basis-[70%]">
          <div className="flex justify-between items-center">
            <div className="w-[80%]">
              {Boolean(item?.shoes) && (
                <h2 className={`${styles.header2} text-gray text-base`}>{item?.shoes?.title}</h2>
              )}
              {Boolean(item?.accessory) && (
                <h2 className={`${styles.header2} text-gray text-base`}>{item?.accessory?.title}</h2>
              )}
              {Boolean(item?.title) && <h2 className={`${styles.header2} text-gray text-base`}>{item?.title}</h2>}
            </div>

            <div className="p-1 flex items-center justify-center cursor-pointer text-lg" onClick={handleClick}>
              <img width={15} height={15} src={deleteIcon} />
            </div>
          </div>
          {Boolean(item?.shoes) && item?.measurement?.size && (
            <p className={`${styles.body2} mt-2`}>
              Size: <span>{item.measurement.size}</span>
            </p>
          )}
          {Boolean(!item?.shoes) && !userId && item?.measurement?.size && (
            <p className={`${styles.body2} mt-2`}>
              Size: <span>{item.measurement.size}</span>
            </p>
          )}
          {Boolean(!item?.shoes) && !Array.isArray(item?.size) && item?.size !== null && item?.size && !userId && (
            <p className={`${styles.body2} mt-2`}>
              Size: <span>{item.size}</span>
            </p>
          )}
          {Boolean(!item?.shoes) && userId && item?.measurement?.size && (
            <p className={`${styles.body2} mt-2`}>
              Size: <span>{item.measurement.size}</span>
            </p>
          )}
          <div className="flex justify-between items-baseline">
            {Boolean(item?.shoes) && <p className={`${styles.body2} font-bold`}>$ {item?.shoes?.price}</p>}
            {Boolean(item?.accessory) && <p className={`${styles.body2} font-bold`}>$ {item?.accessory?.price}</p>}
            {Boolean(item?.price) && <p className={`${styles.body2} font-bold`}>$ {item.price}</p>}
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
          {Boolean(item?.shoes) && (
            <p className={`${styles.body2} lg:text-[16px]  lg:hidden`}>Your shoes will be manufactured in 7-10 days.</p>
          )}
        </div>
      </div>
      {Boolean(item?.category == 'shoes') && (
        <p className={`${styles.body2} lg:text-[16px] block `}>Your shoes will be manufactured in 7-10 days.</p>
      )}
      {Boolean(item?.shoes) && (
        <p className={`${styles.body2} lg:text-[16px] hidden lg:block`}>
          Your shoes will be manufactured in 7-10 days.
        </p>
      )}
    </div>
  );
};

export default PurchasedGoods;
