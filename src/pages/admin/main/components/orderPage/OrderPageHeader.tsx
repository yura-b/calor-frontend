import React from 'react';
import { ArrowSquareLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

interface IProps {
  id: string;
}

const OrderPageHeader: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigate();
  const returnHandler = () => {
    navigate('/admin');
  };
  return (
    <div className={'mb-4'}>
      <div className={'flex flex-row justify-between mx-12 py-6'}>
        <div className={'flex flex-row'}>
          <ArrowSquareLeft size={32} weight="fill" className={'h-full'} onClick={returnHandler} />
          <div className={'flex flex-col'}>
            <p>Back to orders list list</p>
            <h1 className={'font-bold'}>Order {id}</h1>
          </div>
        </div>
        <div className={'flex gap-8'}>
          <div className={'px-16 flex items-center bg-black text-white'}>
            Invoice
          </div>
          <div className={'px-16 flex items-center bg-black text-white'}>
            Checklist
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderPageHeader;
