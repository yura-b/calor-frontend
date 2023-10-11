import React, { FC } from 'react';

export interface IProduct {
  photos: string[];
  title: string;
  _id: string;
}
const ProductVariation: FC<{ productList: IProduct[]; handler: (_id: string) => void }> = ({
  productList,
  handler,
}) => {
  if (productList.length === 0) {
    return <p className={'text-lg font-medium'}> List is empty</p>;
  }

  return (
    <div className={'flex flex-row flex-wrap gap-12 '}>
      {productList.map(({ photos, title, _id }) => {
        return (
          <div key={_id} className={'flex flex-col gap-5 w-1/5 items-center'} onClick={() => handler(_id)}>
            <img src={photos[0]} alt={'photo'} className={'aspect-[2/1] h-[200px] object-contain'} />
            <p className={'font-bold'}>{title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariation;
