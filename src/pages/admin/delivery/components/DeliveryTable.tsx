import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { getDeliveryPrices, saveDeliveryPrice } from '@/api/delivery.ts';
import { DeliveryPrice, SaveDeliveryPrice } from '@/constants/interfaces/deliveryPrice.ts';
import DeliveryPriceComponent from '@pages/admin/delivery/components/DeliveryPriceComponent.tsx';
import { errorCorrupted, loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';

const DeliveryTable = () => {
  const { access_token } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const [prices, setPrices] = useState<DeliveryPrice[]>([]);
  const [reload, forceReload] = useState(0);

  useEffect(() => {
    if (!access_token) return;
    getDeliveryPrices(access_token).then(res => {
      setPrices(res.data);
    });
  }, [reload]);

  const saveButtonHandler = (data: SaveDeliveryPrice) => {
    if (!access_token) return;
    dispatch(loading());
    saveDeliveryPrice(access_token, data)
      .then(() => {
        dispatch(loadingFinished());
        dispatch(showMessage('price was successfully changed'));
        forceReload(prevState => prevState + 1);
      })
      .catch(e => {
        dispatch(errorCorrupted(e.response.data.message));
      });
  };


  if (!prices) return <p>loading</p>;
  return (
    <div className={'flex flex-col gap-12 p-5 ml-5'}>
      <div className={'flex flex-row gap-8 ml-8'}>
        <p className={'basis-1/5 font-bold'}>Name</p>
        <p className={'basis-1/5 font-bold'}>Stripe naming</p>
        <p className={'basis-1/5 font-bold'}>Higher price</p>
        <p className={'basis-1/5 font-bold'}>Lower price</p>
      </div>
      {
        prices.map((price) => {
          return <DeliveryPriceComponent
            deliveryPrice={price} key={price._id}
            saveHandler={saveButtonHandler} />;
        })
      }
    </div>
  );
};

export default DeliveryTable;