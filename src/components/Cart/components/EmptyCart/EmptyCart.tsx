import React from 'react';
import styles from '@styles/Styles.module.scss';
import basketLayout from '@assets/cartImages/basketLayout.svg';
import layout from '@assets/cartImages/layout.svg';
interface Props {
  title: string;
}

const EmptyCart: React.FC<Props> = ({ title }): React.ReactElement => {
  return (
    <>
      <div
        className={`${styles.body1} bg-custom-turquoise w-full flex items-center justify-center text-center p-2 mt-4 sm:mt-0 lg:mb-4 lg:text-[18px]`}
      >
        {title}
      </div>
      <div className="flex items-center justify-center relative">
        <img src={layout} />
        <img className="absolute left-1/2 -translate-x-1/2 top-1/2 -ml-2" src={basketLayout} />
      </div>
    </>
  );
};

export default EmptyCart;
