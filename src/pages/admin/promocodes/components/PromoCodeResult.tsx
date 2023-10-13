import React, { FC } from 'react';
import { Copy } from '@phosphor-icons/react';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';
const PromoCodeResult:FC<{promoCode: string}> = ({promoCode}) => {
  const dispatch = useAppDispatch()
  const copyToClipboard = () =>{
    navigator.clipboard.writeText(promoCode).then(()=>{
      dispatch(showMessage('Text was successfully copied to clipboard'))
    })
  }
  return (
    <div className={'flex flex-col gap-12 p-24'}>
      <h1 className={'text-xl font-bold'}>Your generated promo code</h1>
      <div className={'flex flex-row gap-6'}>
        <p className={''}>{promoCode}</p>
        <Copy className={'cursor-pointer'} weight={'fill'} size={25} onClick={copyToClipboard}/>
      </div>
    </div>
  );
};

export default PromoCodeResult;