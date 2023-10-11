import React, { FC } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { capturePayPalOrder, createPayPalOrder, deletePayPalID, stripePayment } from '@/api/payment.ts';
import CustomButton from '@components/button/CustomButton.tsx';

interface IProps {
  order_ids: string[];
}
const PaymentButtons: FC<IProps> = ({ order_ids }) => {
  const stripeHandler = () => {
    stripePayment(order_ids).then((res) => {
      window.location.href = res.data?.url;
    });
  };
  return (
    <>
      {/* <PayPalScriptProvider
        options={{
          clientId: 'test',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        {' '}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          disabled={false}
          forceReRender={['USD']}
          fundingSource={undefined}
          createOrder={async () => {
            const res = await createPayPalOrder(order_ids);
            return res.data.id;
          }}
          onApprove={async (data) => {
            console.log(data);
            capturePayPalOrder(data).then((res) => {
              console.log(res);
            });
          }}
          onCancel={(data) => {
            deletePayPalID(data).then();
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </PayPalScriptProvider> */}

      <CustomButton title={'Credit Card'} handler={stripeHandler} />
    </>
  );
};

export default PaymentButtons;
