import React, { FC } from 'react';

const UsesLeftComponent: FC<{ amountOfUses: number }> = ({ amountOfUses }) => {
  return (
    <p className={'font-bold'}>
      {amountOfUses}
    </p>
  );
};

export default UsesLeftComponent;
