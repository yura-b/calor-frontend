import React, { FC } from 'react';
import ProductCart from '@/components/ProductCart/ProductCart';
import { paths } from '@/routes/paths';
import { useLocation } from 'react-router-dom';

const ShoesList: React.FC = ({ shoes }): React.ReactElement => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  return (
    <div
      className={`${
        isHome
          ? 'flex justify-between items-center m-auto overflow-x-auto gap-2 flex-row lg:py-6 lg:gap-10 2xl:max-w-screen-2xl'
          : 'flex-wrap '
      } flex gap-6 sm:justify-start justify-center`}
    >
      {shoes.map((product, i) => (
        <div
          key={i}
          className={`${
            isHome ? 'min-w-[200px] 2xl:min-h-[460px] lg:min-h-[380px]' : ''
          } flex  sm:basis-[40%]  lg:basis-[30%] `}
        >
          <ProductCart product={product} type="shoes" />
        </div>
      ))}
    </div>
  );
};

export default ShoesList;
