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
    <div className={`w-36 grow max-w-xs h-auto +  ${className}`}>
      <div className="w-33">
        <img src={img} />
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
              Customize
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGoodsVertical;
