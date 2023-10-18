import { useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import CartFooter from './components/CartFooter';
import CartHeader from './components/CartHeader';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import { BasketProduct, fetchUserProductsInBasket } from '@/store/reducers/BasketSlice';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose, title }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { userId, access_token } = useAppSelector((state) => state.user);
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  useEffect(() => {
    dispatch(fetchUserProductsInBasket({ access_token, userId }));
  }, [access_token, userId]);

  return (
    <div className="font-poppins h-full flex flex-col">
      <CartHeader
        title={title}
        onClose={onClose}
        cartCount={userId ? basketProducts.length : basketNonRegisterUser.length}
      />
      <div className="flex-1 overflow-y-auto md:mb-4 sm:my-4">
        <div className="flex flex-col  justify-center mx-6 mb-4 gap-4 text-gray lg:max-h-[530px] ">
          {(!basketNonRegisterUser.length && !userId) || (!basketProducts.length && userId) ? (
            <EmptyCart title="No items in your cart" />
          ) : null}
          {userId && basketProducts.length ? (
            <div>
              <div className={'bg-custom-turquoise h-[44px]'}>
                <p
                  className={`${styles.body1} bg-custom-turquoise w-full flex items-center justify-center text-center p-2 mt-4 sm:mt-0 lg:mb-4 lg:text-[18px]`}
                >
                  The items in your cart are not reserved. Check out now to make them yours.
                </p>
              </div>

              <div className="h-auto mt-12 md:mt-3 lg:flex lg:gap-2">
                <div className=" lg:basis-[52%] lg:overflow-auto lg:max-h-[480px] lg:px-4">
                  {basketProducts.map((item: BasketProduct, index) => (
                    <PurchasedGoods item={item} key={index} />
                  ))}
                </div>
                {
                  <div className="lg:block lg:basis-[48%]">
                    <hr className="lg:hidden mt-10" />
                    <CartFooter title={'ORDER SUMMARY'} data={basketProducts} />
                  </div>
                }
              </div>
            </div>
          ) : null}
          {!userId && basketNonRegisterUser.length ? (
            <div>
              <div className={'bg-custom-turquoise h-[44px]'}>
                <p
                  className={`${styles.body1} bg-custom-turquoise w-full h-auto  flex items-center justify-center text-center p-2 mt-4 sm:mt-0 lg:mb-4 lg:text-[18px]`}
                >
                  The items in your cart are not reserved. Check out now to make them yours.
                </p>
              </div>
              <div className="h-auto mt-12 md:mt-2 lg:flex lg:gap-2">
                <div className="h-auto lg:basis-[52%] lg:overflow-auto lg:max-h-[480px] lg:px-4">
                  {basketNonRegisterUser.map((item: BasketProduct, index) => (
                    <PurchasedGoods item={item} key={index} />
                  ))}
                </div>
                {
                  <div className="lg:block lg:basis-[48%]">
                    <hr className="lg:hidden mt-10" />
                    <CartFooter title={'ORDER SUMMARY'} data={basketNonRegisterUser} />
                  </div>
                }
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
