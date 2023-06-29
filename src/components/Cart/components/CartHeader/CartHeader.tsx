import React from 'react';
import Busket from '@/components/ui/Busket';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';

interface Props {
  title: string;
  onClose: () => void;
}

const CartHeader: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  return (
    <div className="h-16 flex items-center w-full bg-custom-red text-white sticky top-0">
      <p className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">{title.toUpperCase()}</p>
      <Busket count={2} />
      <img src={closeBtnImage} onClick={onClose} className="mr-6" />
    </div>
  );
};

export default CartHeader;
