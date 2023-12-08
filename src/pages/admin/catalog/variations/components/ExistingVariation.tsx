import React, { FC } from 'react';
import ProductVariation from '@pages/admin/catalog/variations/components/ProductVariation.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { IBaseProduct } from '@/constants/interfaces/product.ts';
import { EditVariationElementDto } from '@/api/dto/products.dto.ts';

interface IProps {
  variants: { variations: IBaseProduct[]; _id: string }[] | undefined;
  forceRerender: React.Dispatch<React.SetStateAction<number>>;
  setCurrentVariantId: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setDataToDeleteItem: React.Dispatch<React.SetStateAction<EditVariationElementDto | null>>;
}

const ExistingVariation: FC<IProps> = ({
  variants,
  setConfirmation,
  setCurrentVariantId,
  setOpenModal,
  setDataToDeleteItem,
}) => {
  const deleteFromDBVariation = (data: EditVariationElementDto) => {
    setDataToDeleteItem(data);
    setConfirmation(true);
  };

  if (!variants) return <></>;

  return (
    <div>
      {variants?.length !== 0 && <h1 className={'font-bold text-lg mb-12'}>Existing variations:</h1>}

      {variants?.map((variant) => {
        const customHandler = (_id: string) => {
          deleteFromDBVariation({ variantId: variant._id, elementId: _id });
        };

        return (
          <div key={variant._id} className={'flex flex-col gap-8 py-8'}>
            <ProductVariation
              key={variant._id}
              productList={variant.variations.map((variant) => ({
                ...variant,
                photos: [variant.photo],
              }))}
              handler={customHandler}
            />

            <div className={'flex flex-row justify-start gap-8'}>
              <CustomButton
                title={'Add Item'}
                handler={() => {
                  setCurrentVariantId(variant._id);
                  setOpenModal(true);
                }}
              />
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ExistingVariation;
