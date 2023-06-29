import React from 'react';
import basketLayout from '@assets/cartImages/basketLayout.svg';
import layout from '@assets/cartImages/layout.svg';
import Button from '@/components/ui/Button';

interface Props {
  title: string;
}

const EmptyCart: React.FC<Props> = ({ title }): React.ReactElement => {
  const handleClick = () => {
    console.log('Continue Shopping Button clicked!');
  };
  return (
    <>
      <div className="bg-custom-turquoise w-full h-12 mb-6 flex items-center justify-center text-center p-2 text-sm">
        {title}
      </div>
      <div className="flex items-center justify-center relative">
        <img src={layout} />
        <img className="absolute left-1/2 -translate-x-1/2 top-1/2 -ml-2" src={basketLayout} />
      </div>
      <Button backgroundColor="gray" textColor="white" className="w-full mt-6" onClick={handleClick}>
        Continue Shopping
      </Button>
    </>
  );
};

export default EmptyCart;
