import React, { FC } from 'react';
import { ShippingInfoDto } from '@/api/dto/orders.dto.ts';
import { House } from '@phosphor-icons/react';

interface IProps {
  shippingInfo: ShippingInfoDto | null | undefined;
}

const DefaultShippingInfo: FC<IProps> = ({ shippingInfo }) => {
  if (!shippingInfo)
    return (
      <>
        <div>
          <House size={32} weight="fill" />
          <h2 className={'font-bold'}>Default Shipping Address</h2>
        </div>
        <div>
          <p>The Customer has not yet specified their default shipping address</p>
        </div>
      </>
    );

  return (
    <>
      <div>
        <House size={32} weight="fill" />
        <h2 className={'font-bold'}>Default Shipping Address</h2>
      </div>

      <div className={'grid grid-cols-2 gap-y-2'}>
        <p>Country / Region</p>
        <p className={'font-medium'}>{shippingInfo.country}</p>

        <p>Street Address</p>
        <p className={'font-medium'}>{shippingInfo.streetAddress}</p>

        <p>Apt, Suite, Building</p>
        <p className={'font-medium'}>{shippingInfo.ASB}</p>

        <p>City</p>
        <p className={'font-medium'}>{shippingInfo.city}</p>

        <p>State</p>
        <p className={'font-medium'}>{shippingInfo.state}</p>

        <p>ZIP Code</p>
        <p className={'font-medium'}>{shippingInfo.ZIP}</p>

        <p>Phone Number</p>
        <p className={'font-medium'}>{shippingInfo.receiverPhoneNumber}</p>
      </div>
    </>
  );
};

export default DefaultShippingInfo;
