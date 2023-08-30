import React, {FC} from 'react';
import {OrderStatus} from '@/constants/interfaces/order.ts';
import {Clipboard} from '@phosphor-icons/react';
import CustomButton from '@components/button/CustomButton.tsx';
import {changeOrderStatus} from '@/api/orders.ts';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import reloadPage from '@/helpers/functions/reloadPage.ts';

const OrderStatusComponent: FC<{ status: OrderStatus, id: string }> = ({ status, id }) => {
    const {access_token} = useAppSelector(state => state.user)
   const changeStatusToQualityControl = () =>{
        if (!access_token) return
        changeOrderStatus(access_token, {_id: id, orderStatus: OrderStatus.QualityControl}).then(()=>{
            reloadPage()
        })
   }


  return (
    <div className={'mb-5'}>
      <div className={'p-5'}>
        <div className={'flex flex-row gap-3 align-middle mb-2'}>
          <Clipboard weight={'fill'} size={32} />
          <p className={'font-bold'}>Order’s Status</p>
        </div>
        <p className={'font-bold'}>{status}</p>
          {status === OrderStatus.PRODUCTION &&  <CustomButton handler={changeStatusToQualityControl} title={'Start Quality Control'}/>}
      </div>
      <hr />
    </div>
  );
};

export default OrderStatusComponent;
