import React from 'react';
import basketLayout from '@assets/cartImages/basketLayout.svg';
import layout from '@assets/cartImages/layout.svg';

interface Props {
  title: string;
}

const EmptyCart: React.FC<Props> = ({ title }): React.ReactElement => {
  return (
    <>
      <div className="flex items-center justify-center relative">
        <img src={layout} />
        <img className="absolute left-1/2 -translate-x-1/2 top-1/2 -ml-2" src={basketLayout} />
      </div>
      <button className="mt-10 base-text h-9 w-full border border-darkGray font-bold text-white bg-darkGray max-w-xs">
        Continue Shopping
      </button>
    </>
  );
};

export default EmptyCart;
