import React, { FC } from 'react';
import ProductCart from '@/components/ProductCart/ProductCart';

const ShoesList: React.FC = ({ shoes }): React.ReactElement => {
  return (
    <div className="flex flex-wrap gap-6 lg:justify-between justify-center">
      {shoes.map((product) => (
        <div className="flex sm:basis-[40%]  lg:basis-[30%] ">
          <ProductCart product={product} type="shoes" />
        </div>
      ))}
    </div>
  );
};

export default ShoesList;
