import React from 'react';
import StarRating from '../../../ui/StartRating';

interface Props {
  title: string;
  img: string;
  priceFrom: number;
  rating: number;
}

const LikesGoods: React.FC<Props> = ({ img, priceFrom, title, rating }): React.ReactElement => {
  return (
    <div className="basis-1/2 text-darkGray">
      <div className=" w-33 ">
        <img src={img} />
      </div>
      <div>
        <p className="text-xl font-bold">{title}</p>
        <div className="flex justify-between items-center">
          <StarRating rating={rating} />
          <p>XXX</p>
        </div>
        <p className="text-base">Category</p>
        <p className="text-base">
          <span className="text-sm">From</span> <span className="font-bold"> $ {priceFrom}</span>
        </p>
        <div className="flex justify-between mt-4 items-center">
          <button className="base-text h-9 w-full border border-darkGray font-bold">Add</button>
        </div>
      </div>
    </div>
  );
};

export default LikesGoods;
