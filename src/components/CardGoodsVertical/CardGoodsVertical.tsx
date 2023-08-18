import React from 'react';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';

interface Props {
  title: string;
  img: string;
  priceFrom: number;
  rating: number;
  buttonClass?: string;
  className?: string;
}

const CardGoodsVertical: React.FC<Props> = ({
  img,
  priceFrom,
  title,
  rating,
  buttonClass,
  className,
}): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className={`min-w-[150px] w-[360px] max-w-[400px] px-2  ${className}`}>
      <div className="w-full">
        <img
          src={img}
          alt=""
          className="object-contain object-cover w-[143px] h-full mx-auto lg:max-w-[300px] lg:w-[300px]"
        />
      </div>
      <div>
        <h2 className={`${styles.header2} text-gray`}>{title}</h2>
        <div className="flex justify-between items-center">
          <StarRating rating={rating} />
          <p className="text-xs">XXX</p>
        </div>
        <p className={styles.body1}>Category</p>
        <p className={styles.body1}>
          <span className={`${styles.body2} font-light`}>From</span> <span className="font-medium"> $ {priceFrom}</span>
        </p>
        <div className="flex justify-between mt-4 items-center">
          {buttonClass == 'transparentGray' && (
            <Button color="transparentGray" onClick={handleClick}>
              Add
            </Button>
          )}
          {buttonClass == 'transparentMint' && (
            <Button color="transparentMint" onClick={handleClick}>
              Design
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGoodsVertical;
