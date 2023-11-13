import React, { FC } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { capturePayPalOrder, createPayPalOrder, deletePayPalID, stripePayment } from '@/api/payment.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';

interface IProps {
  order_ids: string[];
}
const PaymentButtons: FC<IProps> = ({ order_ids }) => {
  const navigate = useNavigate();

  const stripeHandler = () => {
    stripePayment(order_ids).then((res) => {
      window.location.href = res.data?.url;
    });
  };
  return (
    <>
      <CustomButton
        title={'Stripe | Credit Card'}
        handler={stripeHandler}
        styles="h-[55px]"
        borderRadius="4"
        isBoxShadow={false}
        bgColor="transparent"
        textColor="#6058f7"
        border="1px solid #6058f7"
        hoverBgColor="#6772e4"
        isHoveredBg={true}
        isBtnWithIcon={true}
      />

      <PayPalScriptProvider
        options={{
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
          components: 'buttons',
          currency: 'USD',
        }}
      >
        {' '}
        <PayPalButtons
          style={{ layout: 'vertical', disableMaxWidth: true }}
          disabled={false}
          forceReRender={['USD']}
          fundingSource={undefined}
          createOrder={async () => {
            const res = await createPayPalOrder(order_ids);
            return res.data.id;
          }}
          onApprove={async (data) => {
            capturePayPalOrder(data)
              .then((res) => {
                navigate(`/checkout_success/${res.data}`);
              })
              .catch(() => {
                // navigate('/checkout_failed');
              });
          }}
          onCancel={(data) => {
            deletePayPalID(data).then(() => {
              // navigate('/checkout_failed');
            });
          }}
          onError={() => {
            // navigate('/checkout_failed');
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaymentButtons;
