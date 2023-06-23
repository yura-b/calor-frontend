import React, { useState } from 'react';
import style from './EmptyCart.module.scss';
import basketLayout from '@assets/cartImages/basketLayout.svg';
import layout from '@assets/cartImages/layout.svg';
import Button from '../../../ui/Button';

interface Props {
  title: string;
}

const EmptyCart: React.FC<Props> = ({ title }): React.ReactElement => {
  return (
    <>
      <div className="flex items-center justify-center relative">
        <img src={layout} />
        <img className={style.busketImg} src={basketLayout} />
      </div>
      <Button styled={'primary'} className="mt-10">
        Continue Shopping
      </Button>
    </>
  );
};

export default EmptyCart;
