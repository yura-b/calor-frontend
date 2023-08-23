import React from 'react';

const Payment = () => {
  return (
    <div className={'flex flex-col gap-5 justify-center p-5'}>
      <p className={'font-bold'}>Order Summary</p>
      <div className={'grid grid-cols-2'}>
        <p>x item</p>
        <p>$$$</p>

        <p>Order Delivery</p>
        <p>$$$</p>

        <p>Taxes</p>
        <p>$$$</p>
      </div>
    </div>
  );
};

export default Payment;
