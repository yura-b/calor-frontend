import styles from '@styles/Styles.module.scss';
import EmptyCart from './components/EmptyCart';
import PurchasedGoods from './components/PurchasedGoods';
import CartFooter from './components/CartFooter';
import CartHeader from './components/CartHeader';
import { useAppSelector } from '@/store/hooks/hooks';
import { BasketProduct } from '@/store/reducers/BasketSlice';

interface Props {
  title: string;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose, title }): React.ReactElement => {
  const { userId } = useAppSelector((state) => state.user);
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  return (
    <div className="font-poppins  h-full flex flex-col">
      <CartHeader
        title={title}
        onClose={onClose}
        cartCount={userId ? basketProducts.length : basketNonRegisterUser.length}
      />
      <div className="flex-1 overflow-y-auto md:my-4">
        <div className="flex flex-col  justify-center mx-6 my-4 gap-4 text-gray lg:max-h-[500px] ">
          {!basketProducts.length && userId && <EmptyCart title="No items in your cart" />}
          {!basketNonRegisterUser.length && <EmptyCart title="No items in your cart" />}
          {basketProducts.length ? (
            <>
              <p
                className={`${styles.body1} bg-custom-turquoise w-full h-auto  flex items-center justify-center text-center p-2 lg:my-4 lg:text-[18px]`}
              >
                The items in your cart are not reserved. Check out now to make them yours.
              </p>
              <div className="lg:flex lg:gap-2">
                <div className="h-auto lg:basis-[52%] lg:overflow-auto lg:max-h-[480px] lg:px-4">
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
            </>
          ) : null}
          {!userId && basketNonRegisterUser.length ? (
            <>
              <p
                className={`${styles.body1} bg-custom-turquoise w-full h-auto  flex items-center justify-center text-center p-2 lg:my-4 lg:text-[18px]`}
              >
                The items in your cart are not reserved. Check out now to make them yours.
              </p>
              <div className="lg:flex lg:gap-2 mt-5">
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
