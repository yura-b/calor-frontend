import React from 'react';
import basketImage from '@/assets/cartImages/basketIcon.svg';

interface Props {
  count: number;
  onClick?: () => void;
}

const Busket: React.FC<Props> = ({ count, onClick }) => {
  return (
    <div className="flex ml-auto">
      <div className="relative mr-6 w-10" onClick={onClick}>
        <img src={basketImage} alt="Basket" className="mr-2" />
        {count > 0 && (
          <span className="absolute top-0 right-0 bg-mint text-white rounded-full p-1 text-xs w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};

export default Busket;
