import React from 'react';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
interface Props {
  title: string;
  img: string;
  priceFrom: number;
  rating: number;
  buttonClass?: string;
  className: string;
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
    <div className={`w-36 grow text-gray max-w-xs h-auto +  ${className}`}>
      <div className="w-33 ">
        <img src={img} />
      </div>
      <div>
        <p className="text-base font-bold">{title}</p>
        <div className="flex justify-between items-center">
          <StarRating rating={rating} />
          <p>XXX</p>
        </div>
        <p className="text-base">Category</p>
        <p className="text-base">
          <span className="text-sm">From</span> <span className="font-bold"> $ {priceFrom}</span>
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
