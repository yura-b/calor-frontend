import React from 'react';
import styles from '@styles/Styles.module.scss';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import CartFooter from './components/CartFooter';
import CartHeader from './components/CartHeader';
import { useQuery } from 'react-query';
import { getUser } from '@/api/users';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose, title }): React.ReactElement => {
  const { access_token, userId } = useSelector((state) => state.user);
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(['userBasket', getUser], () => getUser(access_token, userId), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  let cartPurchasedItems = [];

  if (!isLoading) {
    cartPurchasedItems = [...user?.data?.user.basket];
  }

  return (
    <div className="font-poppins  h-full flex flex-col">
      <CartHeader title={title} onClose={onClose} cartCount={cartPurchasedItems.length} />
      <div className="flex-1 overflow-y-auto md:my-0">
        <div className="flex flex-col  justify-center mx-6 my-4 gap-4 text-gray lg:max-h-[500px] ">
          {!cartPurchasedItems.length ? <EmptyCart title="The are no items in your card" /> : null}
          {cartPurchasedItems.length ? (
            <>
              <p
                className={`${styles.body1} bg-custom-turquoise w-full h-auto  flex items-center justify-center text-center p-2 lg:my-4 lg:text-[18px]`}
              >
                The items in your cart are not reserved. Check out now to make them yours.
              </p>
              <div className="lg:flex lg:gap-2">
                <div className="h-auto lg:basis-[52%] lg:overflow-auto lg:max-h-[480px] lg:px-4">
                  {cartPurchasedItems.map((item, index) => (
                    <PurchasedGoods
                      title={item.title}
                      size={item.size}
                      price={item.price}
                      countGoogs={item.count}
                      key={index}
                      id={item._id}
                      photo={item.photo}
                    />
                  ))}
                </div>
                {
                  <div className="hidden lg:block lg:basis-[48%]">
                    <CartFooter title={'ORDER SUMMARY'} data={cartPurchasedItems} />
                  </div>
                }
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
