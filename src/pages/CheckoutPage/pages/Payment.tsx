import { useAppSelector } from '@/store/hooks/hooks.ts';
import PaymentButtons from '@components/payment/PaymentButtons.tsx';

const Payment = () => {
  const { order_ids, numberOfItems, totalPrice, shippingPrice, tax } = useAppSelector((state) => state.checkout);

  if (!order_ids) return <div>order ID is missing</div>;

  return (
    <div className={'flex flex-col gap-5 justify-center p-5'}>
      <p className={'font-bold'}>Order Summary</p>
      <div className={'grid grid-cols-2'}>
        <p>{numberOfItems} item</p>
        <p>{totalPrice}$</p>

        <p>Order Delivery</p>
        <p>{shippingPrice.toFixed(2)}$</p>

        <p>Taxes</p>
        <p>{tax.toFixed(2)}$</p>
      </div>

      <p className={'font-bold'}>Payment Method</p>
      <p>Please a choose payment method</p>

      <PaymentButtons order_ids={order_ids} />
    </div>
  );
};

export default Payment;
