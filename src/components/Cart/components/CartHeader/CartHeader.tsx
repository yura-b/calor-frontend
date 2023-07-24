import React from 'react';
import styles from '@styles/Styles.module.scss';
import Busket from '@/components/ui/Busket';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';

interface Props {
  title: string;
  onClose: () => void;
}

const CartHeader: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  return (
    <div className="h-16 flex items-center w-full bg-custom-red sticky top-0">
      <h1 className={`${styles.header1} text-white absolute left-1/2 transform -translate-x-1/2`}>
        {title.toUpperCase()}
      </h1>
      <Busket count={2} />
      <img src={closeBtnImage} onClick={onClose} className="mr-6" />
    </div>
  );
};

export default CartHeader;
