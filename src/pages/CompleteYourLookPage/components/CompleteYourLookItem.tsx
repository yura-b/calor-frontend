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
      oldPrice: number;
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
    <div className="flex flex-col py-2 sm:py-5 w-full items-center max-w-2xl">
      <span className="text-mint text-center">{item.title}</span>
      {item.product ? (
        <div
          className="flex flex-col w-full sm:w-auto
         sm:flex-row gap-6 mt-9 justify-between lg:justify-center items-center sm:items-start"
        >
          <div className=" relative min-h-10 sm:min-w-[180px] sm:w-[180px] flex justify-end">
            <LazyLoadImage
              src={item?.product?.photos[0]}
              className="max-w-[140px] w-[140px] max-h-[180px] md:max-w-[160px] md:w-[160px] md:max-h-[200px] lg:max-w-[180px] lg:w-[180px] lg:max-h-[220px]"
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
          <div className=" flex flex-col text-gray w-full max-w-[400px] sm:max-w-[260px]">
            <span className="font-bold text-center sm:text-start">{item?.product?.title}</span>
            <span className="mt-1">Details</span>
            <div className="flex flex-row">
              <span className="font-bold pr-2">Shiping:</span>
              <span>Free</span>
            </div>
            <div
              className={`flex flex-row justify-between items-center ${
                item?.product?.oldPrice ? 'text-mint' : 'text-gray'
              }   ml-2`}
            >
              <div>
                <span className="pr-2">$</span>
                <span>{item?.product?.price}</span>
              </div>
              {item?.product?.oldPrice !== 0 && item?.product?.oldPrice && (
                <div className="relative  flex flex-row text-custom-red px-2">
                  <span>$ {item?.product?.oldPrice}</span>
                  <div className="absolute top-[44%] lg:top-[44%] left-0  w-full  border-b-[2px] border-custom-red "></div>
                </div>
              )}
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
