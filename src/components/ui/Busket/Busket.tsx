import React from 'react';
import basketImage from '@/assets/cartImages/basketIcon.svg';
import { useAppSelector } from '@/store/hooks/hooks';

interface Props {
  count: number;
  onClick?: () => void;
}

const Busket: React.FC<Props> = ({ count, onClick }) => {
  return (
    <div className="" onClick={onClick}>
      <div className="relative">
        {count > 0 && (
          <div className="-top-1.5 absolute left-5">
            <p className="flex w-4 h-4 items-center justify-center rounded-full bg-mint p-2.5 text-xs text-white">
              {count}
            </p>
          </div>
        )}
        <img src={basketImage} alt="Basket" className="mr-6 mt-0" />
      </div>
    </div>
  );
};

export default Busket;
