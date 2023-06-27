import React from 'react';
import basketImage from '@/assets/cartImages/basketIcon.svg';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';

interface Props {
  title: string;
  data: any[];
  onClose: () => void;
}

const CartHeader: React.FC<Props> = ({ title, data, onClose }): React.ReactElement => {
  return (
    <div className="h-16 flex items-center w-full bg-custom-red text-white sticky top-0">
      <p className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">{title.toUpperCase()}</p>
      <div className="ml-auto flex">
        <div className="relative mr-6">
          <img src={basketImage} alt="Basket" className="mr-2" />
          {data.length ? (
            <span className="absolute top-0 right-0 bg-green text-white rounded-full p-1 text-xs w-4 h-4 flex items-center justify-center">
              {data.length}
            </span>
          ) : (
            ''
          )}
        </div>
        <img src={closeBtnImage} onClick={onClose} className="mr-6" />
      </div>
    </div>
  );
};

export default CartHeader;
