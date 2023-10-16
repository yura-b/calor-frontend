import React from 'react';
import { ArrowSquareLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { errorCorrupted } from '@/store/reducers/StatusReducer.ts';

interface IProps {
  id: string;
  invoiceUrl: string;
  checkListUrl: string;
}
const buttonStyles = 'px-16 flex items-center bg-black text-white cursor-pointer';

const OrderPageHeader: React.FC<IProps> = ({ id, invoiceUrl, checkListUrl }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const returnHandler = () => {
    navigate('/admin');
  };
  const downloadInvoice = () => {
    if (!invoiceUrl) {
      dispatch(errorCorrupted('This order does not have an invoice'));
      return;
    }

    window.location.href = invoiceUrl;
  };
  const downloadChecklist = () => {
    if (!checkListUrl) {
      dispatch(errorCorrupted('This order does not have an invoice'));
      return;
    }

    window.location.href = checkListUrl;
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
          <div className={buttonStyles} onClick={downloadInvoice}>
            Invoice
          </div>
          <div className={buttonStyles} onClick={downloadChecklist}>
            Checklist
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderPageHeader;
