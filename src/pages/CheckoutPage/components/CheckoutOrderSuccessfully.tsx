import styles from '@styles/Styles.module.scss';
import CheckoutOrderItem from './CheckoutOrderItem';
import CustomButton from '@/components/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendOrderForNotAuthUser } from '@/api/orders.ts';
import { useParams } from 'react-router';
import { ShippingInfoDto } from '@/api/dto/orders.dto.ts';
import { Product } from '@/constants/interfaces/product.ts';
import { useDispatch } from 'react-redux';
import { clearBasketNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { useAppSelector } from '@/store/hooks/hooks';
import { useQuery } from 'react-query';
import { clearBasketAuthUser } from '@/api/basket';

export interface IOrderPurchaseInfo {
  price: number;
  productTitle: string;
  photo: string;
}

interface OrderInfo {
  date: string;
  products: Product[];
  shippingInfo: ShippingInfoDto;
  purchases: IOrderPurchaseInfo[];
  shippingPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  discountValue: number;
}

const CheckoutOrderSuccessfully = () => {
  const navigate = useNavigate();
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { userId } = useAppSelector((state) => state.user);
  const [order, setOrder] = useState<OrderInfo>();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [email, order_number] = atob(id || '').split(' ');

  const basketProductsIds = basketProducts.map((id) => id._id);
  const { data } = useQuery('clearBasketAuthUser', () => clearBasketAuthUser(userId, basketProductsIds), {
    staleTime: Infinity,
    enabled: !!userId && !!basketProducts,
  });

  useEffect(() => {
    sendOrderForNotAuthUser(email, Number(order_number)).then((res) => {
      setOrder(res.data);
    });

    dispatch(clearBasketNonRegisterUser());
  }, []);

  if (!order) return;
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20 w-full">
        <h2 className={`${styles.body2} text-mint font-bold`}>Order Successfully</h2>
        <h2 className={`${styles.body2} text-mint`}>Check your email for your order confirmation</h2>
      </div>
      <div className="lg:flex mb-10 w-full justify-center">
        <CheckoutOrderItem order_number={Number(order_number)} date={order.date} products={order.purchases} />
        <div className="lg:ml-20 lg:w-[50%]">
          <div>
            <h3 className="font-bold mt-5">Shipping Information</h3>
            <p>
              Address<span className="float-right">{order.shippingInfo.streetAddress}</span>
            </p>
            <p>
              City, State, ZIP
              <span className="float-right">
                {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.ZIP}
              </span>
            </p>
            <p>
              Country/Region <span className="float-right">{order.shippingInfo.country}</span>
            </p>
          </div>
          <hr className="lg:hidden mt-3 mb-3" />
          <div>
            <h3 className="font-bold mt-5">Order Summary </h3>
            <p>
              Item <span className="float-right">{order.total} $</span>
            </p>
            <p>
              Order Delivery<span className="float-right">{order.shippingPrice} $</span>
            </p>
            {order.discountValue && (
              <p>
                Discount <span className="float-right">{order.discountValue} $</span>
              </p>
            )}
            <p>
              Taxes<span className="float-right">{order.tax.toFixed(2)} $ </span>
            </p>
            <p className="text-mint font-bold">
              Subtotal<span className="float-right">{order.subtotal.toFixed(2)} $ </span>
            </p>
            <hr className="lg:hidden mt-3 mb-3 text-mint" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-20 ">
        <div className="w-full lg:w-[40%]">
          <CustomButton styles={'w-full mt-5'} title={'Main Page'} type={'submit'} handler={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};
export default CheckoutOrderSuccessfully;
