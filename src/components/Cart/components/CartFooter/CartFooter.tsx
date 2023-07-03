import React, { useState } from 'react';
import Button from '@components/ui/Button';

interface Props {
  title: string;
  data: object[];
}

const CartFooter: React.FC<Props> = ({ title, data }): React.ReactElement => {
  const [promoCode, setPromoCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleInputChange = (event) => {
    const code = event.target.value.slice(0, 9);
    setPromoCode(code);
    setIsValid(code.length === 9);
  };

  const handleInputBlur = () => {
    setShowHint(promoCode.length < 9);
    setIsValid(promoCode.length === 9);
  };

  const getInputClass = () => {
    if (promoCode.length === 0) {
      return '';
    } else if (isValid) {
      return 'bg-custom-turquoise';
    } else if (showHint) {
      return 'bg-custom-red';
    } else {
      return '';
    }
  };
  const handleClick = () => {
    console.log('Checkout Button clicked!');
  };
  return (
    <div className="max-w-lg px-6 py-2.5 text-gray">
      <h1 className="my-4 text-gray text-xl font-semibold">{title}</h1>
      <div className="text-base">
        <div className="flex justify-between mt-4 items-center">
          <p>{data.length} Item</p>
          <p>$ XXX</p>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <p>Order Delivery</p>
          <p>$ XXX</p>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <p>Taxes</p>
          <p>$ XXX</p>
        </div>
        <div className="flex justify-between mt-4 items-center text-mint text-xl font-bold">
          <p>Subtotal</p>
          <p>$ XXX</p>
        </div>
        <input
          type="text"
          className={`mt-6 px-2 py-1 border border-lightGray w-full text-center font-bold ${getInputClass()}`}
          placeholder="Add promo code"
          value={promoCode}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          maxLength={9}
        />
        {showHint && <p className="text-red-500 mt-1 text-sm">Please enter at least 9 characters.</p>}
        <Button color="mint" className="mt-8" onClick={handleClick}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
