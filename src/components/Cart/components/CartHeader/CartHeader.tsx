import React from 'react';
import styles from '@styles/Styles.module.scss';
import Busket from '@/components/ui/Busket';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';

interface Props {
  title: string;
  onClose: () => void;
  cartCount: number;
}

const CartHeader: React.FC<Props> = ({ title, onClose, cartCount }): React.ReactElement => {
  return (
    <div className="py-3 flex items-center w-full bg-custom-red sticky top-0">
      <h1 className={`${styles.header2} text-white absolute left-1/2 transform -translate-x-1/2`}>
        {title.toUpperCase()}
      </h1>
      <Busket count={cartCount} />
      <img src={closeBtnImage} onClick={onClose} className="mr-6" />
    </div>
  );
};

export default CartHeader;
