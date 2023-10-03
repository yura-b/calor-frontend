import React, { FC } from 'react';
import { shippingDetails } from '@/constants/interfaces/order.ts';

const ShippingAddress:FC<{info: shippingDetails }> = ({ info }) => {

  return (
        <div className={'flex flex-col gap-5'}>
            <p className={'font-bold'}>Shipping Address</p>
            <div className={'grid grid-cols-2 gap-y-2 gap-x-8'}>
                <p>Country / Region</p>
                <p className={'font-medium'}>{info.country}</p>

                <p>Street Address</p>
                <p className={'font-medium'}>{info.streetAddress}</p>

                <p>Apt, Suite, Building</p>
                <p className={'font-medium'}>{info.ASB}</p>

                <p>City</p>
                <p className={'font-medium'}>{info.city}</p>

                <p>State</p>
                <p className={'font-medium'}>{info.state}</p>

                <p>ZIP Code</p>
                <p className={'font-medium'}>{info.ZIP}</p>

                <p>Phone Number</p>
                <p className={'font-medium'}>{info.receiverPhoneNumber}</p>
            </div>
        </div>
  );
};

export default ShippingAddress;