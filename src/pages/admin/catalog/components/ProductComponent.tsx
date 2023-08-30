import React, { FC } from 'react';
import { Product } from '@/constants/interfaces/product.ts';

const ProductComponent: FC<Product> = ({ price, photos, title, category, subcategory }) => {
  return (
    <div className={'flex flex-col gap-5 w-1/4'}>
      <img src={photos[0]} alt={'photo'} className={'aspect-[2/1]'} />
      <p className={'font-bold'}>{title}</p>
      <div className={'flex flex-row'}>
        <p>{category.categoryTitle} | </p>
        <p className={'ml-2'}> {subcategory}</p>
      </div>
      <p className={'font-medium'}>{price}$</p>
    </div>
  );
};

export default ProductComponent;
