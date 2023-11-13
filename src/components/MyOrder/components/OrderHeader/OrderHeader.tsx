import React, { useState } from 'react';
import styles from '@/styles/Styles.module.scss';
import { shoes, accessory } from '@/constants/interfaces/order';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';

interface Props {
  product: shoes | accessory;
  index: number;
}

const OrderHeader: React.FC<Props> = ({ product, index }): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { price, title, photos } = product;
  return (
    <div className="border-b-2 border-lightGray py-2 basis-[100%] md:basis-[40%] lg:basis-[100%] h-auto" key={index}>
      <div className="flex justify-between">
        <p className={`${styles.subtitle} font-bold`}>{title}</p>
        <p className="font-bold">$ {price}</p>
      </div>
      <div className="relative">
        <LazyLoadImage
          src={photos[0]}
          className=" object-contain object-cover  mx-auto  w-[180px] min-h-[120px] "
          effect="blur"
          afterLoad={() => {
            setImageLoaded(true);
          }}
          beforeLoad={() => {
            setImageLoaded(false);
          }}
        />
        {imageLoaded ? null : <Spinner className="absolute left-1/2 top-1/2" />}
      </div>
    </div>
  );
};

export default OrderHeader;
