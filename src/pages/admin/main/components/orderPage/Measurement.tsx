import React, { FC } from 'react';
import { IMeasurement } from '@/constants/interfaces/order.ts';

interface IProps {
  measurement: IMeasurement;
}

const Measurement: FC<IProps> = ({ measurement }) => {
  if (!measurement) return <></>;
  return (
    <div className={'flex flex-col gap-5'}>
      <p className={'font-bold'}>Measurement</p>
      <div className={'grid grid-cols-2 gap-y-2 gap-x-8'}>
      <p>size</p>
      <span>{measurement.size}</span>
      <p>Right foot length</p>
      <span>{measurement.rightFootLength}</span>
      <p>Right foot width</p>
      <span>{measurement.rightFootWidth}</span>
      <p>Right foot length</p>
      <span>{measurement.leftFootLength}</span>
      <p>Right foot width</p>
      <span>{measurement.leftFootWidth}</span>
      <p>Insole length</p>
      <span>{measurement.insoleLength}</span>
      <p>Insole width</p>
      <span>{measurement.insoleWidth}</span>
    </div>
  </div>

  );
};

export default Measurement;
