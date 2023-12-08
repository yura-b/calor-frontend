import React, { FC } from 'react';
import { IProduct } from '@pages/admin/catalog/variations/components/ProductVariation.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
interface IProps {
  products: IProduct[];
  handler: (_id: string) => void;
  saveHandler: () => void;
}
const ChosenVariation: FC<IProps> = ({ handler, products, saveHandler }) => {
  return (
    <div
      className={
        'fixed w-5/6 right-0 bottom-0 bg-custom-grey border-r border-white border-[2px] p-5 z-10 overflow-x-auto'
      }
    >
      <CustomButton title={'save'} handler={saveHandler} styles={'relative right-0 !px-8'} />
      <div className={'flex flex-row gap-3'}>
        {products.map(({ photos, title, _id }) => {
          return (
            <div key={_id} className={'flex flex-col gap-2 w-1/5 items-center mt-4'} onClick={() => handler(_id)}>
              <img
                src={photos[0]}
                alt={'photo'}
                className={'aspect-[2/1] h-[115px] cursor-pointer object-contain hover:fill-red'}
              />
              <p className={'font-bold'}>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChosenVariation;
