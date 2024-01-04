import React from 'react';

interface Props {
  oldPrice: string | number;
}

const OldPrice: React.FC<Props> = ({ oldPrice }) => {
  return (
    <div className={'relative flex flex-row text-thinGray px-1'}>
      <span className="font-bold">$ {oldPrice}</span>
      <div
        className="absolute top-[40%] lg:top-[44%] left-0  w-full  border-b-[1px] border-gray"
        style={{ transform: 'rotate(14deg)' }}
      ></div>
    </div>
  );
};

export default OldPrice;
