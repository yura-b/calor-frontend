import React, { FC } from 'react';
import ProductCart from '@/components/ProductCart/ProductCart';

const ShoesList: React.FC = ({ shoes }): React.ReactElement => {
    
  return (
    <div className="flex flex-wrap">
      {shoes.map(product => (
        <ProductCart product={product} type="shoes"/>
      ))}
    </div>
  );
};

export default ShoesList;
