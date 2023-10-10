import React, { FC } from 'react';
import ProductVariation, { IProduct } from '@pages/admin/catalog/variations/components/ProductVariation.tsx';
import CustomButton from '@components/button/CustomButton.tsx';

interface IProps {
  products: IProduct[],
  handler: (_id: string) =>void
  title: string
}
const ProductRow:FC<IProps> = ({products, handler, title}) => {
  return (
     <div className={'flex flex-col gap-12'}>
       <h1 className={'font-bold text-lg'}>{title}</h1>
       <ProductVariation productList={products} handler={handler}/>
     </div>
  );
};

export default ProductRow;