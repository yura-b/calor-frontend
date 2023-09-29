import React, { ChangeEvent, FC, useState } from 'react';
import { Truck } from '@phosphor-icons/react';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import CustomInput from '@/components/input/CustomInput';
import { patchOrderDeliveryInfo } from '@/api/orders.ts';
import { useNavigate } from 'react-router';

const DeliveryInfo: FC<{ _id: string }> = ({ _id }) => {
  const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);
  const { access_token } = useAppSelector((state) => state.user);

  const navigation = useNavigate();

  const [courier, setCourier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [approxDeliveryDate, setApproxDeliveryDate] = useState('');

  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: ChangeEvent<any>) => {
      setState(e.target.value);
    };
  };
  const uploadDeliveryInfo = () => {
    if (!access_token) return;
    patchOrderDeliveryInfo(
      {
        approxDeliveryDate,
        courier,
        trackingNumber,
        order_id: _id,
      },
      access_token
    ).then(() => {
      navigation('/admin');
    });
  };

  return (
    <div className={'flex flex-col w-1/2 mt-4'}>
      <div className={'flex flex-row gap-5 items-center'}>
        <Truck size={32} weight={'fill'} />
        <h2 className={'font-bold'}>Delivery</h2>
      </div>
      {openDeliveryInfo ? (
        <div>
          <CustomInput value={courier} onChange={changeHandler(setCourier)}>
            Courier
          </CustomInput>
          <CustomInput value={trackingNumber} onChange={changeHandler(setTrackingNumber)}>
            trackingNumber
          </CustomInput>
          <CustomInput value={approxDeliveryDate} onChange={changeHandler(setApproxDeliveryDate)}>
            approxDeliveryDate
          </CustomInput>
        </div>
      ) : (
        <p>Delivery info</p>
      )}

      {openDeliveryInfo ? (
        <CustomButton title={'set status to "Shipped"'} handler={uploadDeliveryInfo} />
      ) : (
        <CustomButton
          title={'+ add delivery information'}
          handler={() => {
            setOpenDeliveryInfo((prevState) => !prevState);
          }}
        />
      )}
    </div>
  );
};

export default DeliveryInfo;
