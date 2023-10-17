import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setStep, Steps } from '@/store/reducers/CompleteLookReducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';
import SizeSelection from '@components/ui/SizeSelection';

interface IProps {
  item: {
    title: string;
    product: {
      title: string;
      price: number;
      photos: string[];
      size: string[];
    };
    emptyProduct: string;
  };
  sizeButtonStyles: Record<number, string>;
  setSizeButtonStyles: (styles: Record<number, string>) => void;
  handleSizeClick: (size: string, index: number) => void;
}

const CompleteYourLookItem: FC<IProps> = ({ item, setSizeButtonStyles, sizeButtonStyles, handleSizeClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="flex flex-col py-5 w-full items-center max-w-2xl">
      <span className="text-mint text-center">{item.title}</span>
      {item.product ? (
        <div className="flex flex-row gap-2 mt-9 justify-between lg:justify-center lg:gap-14">
          <div className="basis-[40%] lg:basis-[30%] relative min-h-10 min-w-[100px]">
            <LazyLoadImage
              src={item?.product?.photos[0]}
              className="md:max-w-[140px] md:max-h-[140px]"
              alt=""
              effect="blur"
              afterLoad={() => {
                setImageLoaded(true);
              }}
              beforeLoad={() => {
                setImageLoaded(false);
              }}
            />
            {imageLoaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
          </div>
          <div className="basis-[55%] lg:basis-[60%] flex flex-col">
            <span className="font-bold">{item?.product?.title}</span>
            <span className="mt-1">Details</span>
            <div className="flex flex-row">
              <span className="font-bold pr-2">Shiping:</span>
              <span>Free</span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row">
                <span className="pr-2">$</span>
                <span>{item?.product?.price}</span>
              </div>
            </div>
            <>
              {!!item?.product?.size.length && (
                <SizeSelection
                  sizes={item?.product?.size || []}
                  setSizeButtonStyles={setSizeButtonStyles}
                  sizeButtonStyles={sizeButtonStyles}
                  handleSizeClick={handleSizeClick}
                />
              )}
            </>
          </div>
        </div>
      ) : (
        <>
          <div className="font-bold mt-2 uppercase text-gray">{item?.emptyProduct}</div>
        </>
      )}
    </div>
  );
};

export default CompleteYourLookItem;
