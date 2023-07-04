import React from 'react';
import CardGoodsVertical from '@components/CardGoodsVertical';
import likesCategoryImg1 from '@assets/cartImages/likesCategoryImg1.svg';
import likesCategoryImg2 from '@assets/cartImages/likesCategoryImg2.svg';

const HomeGoodsContent: React.FC = (): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  const LikesGoodsItems = [
    {
      title: 'Dayger',
      img: likesCategoryImg1,
      priceFrom: 10,
      rating: 4,
    },
    {
      title: 'Yolo',
      img: likesCategoryImg2,
      priceFrom: 100,
      rating: 0,
    },
    {
      title: 'Yolo',
      img: likesCategoryImg2,
      priceFrom: 100,
      rating: 0,
    },
    {
      title: 'Yolo',
      img: likesCategoryImg2,
      priceFrom: 100,
      rating: 0,
    },
  ];
  return (
    <div className="w-full bg-white pl-6">
      <p className="text-2xl font-black text-gray ">{'Our Shoe Models'.toLocaleUpperCase()}</p>
      <div className="flex gap-4 flex-nowrap overflow-scroll justify-around items-center">
        {LikesGoodsItems.map((item, index) => (
          <CardGoodsVertical
            title={item.title}
            img={item.img}
            priceFrom={item.priceFrom}
            rating={item.rating}
            key={index}
            buttonClass="transparentMint"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeGoodsContent;
