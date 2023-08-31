import React from 'react';
import styles from '@styles/Styles.module.scss';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';

interface Props {
  title: string;
  onClose: () => void;
}

const ReviewHeader: React.FC<Props> = ({ title, onClose }): React.ReactElement => {
  return (
    <div className="py-3 flex items-center w-full bg-custom-red lg:bg-mint sticky top-0 justify-end lg:h-[50px]">
      <h1 className={`${styles.header2} text-white absolute left-1/2 transform -translate-x-1/2 uppercase`}>{title}</h1>
      <div className="flex h-5 items-center justify-center">
        <img src={closeBtnImage} onClick={onClose} className="mr-6" />
      </div>
    </div>
  );
};

export default ReviewHeader;
