import React, { useRef, useState } from 'react';
import CardGoodsVertical from '@components/CardGoodsVertical';
import styles from '@styles/Styles.module.scss';
import IconButton from '@mui/material/IconButton';
import likesCategoryImg1 from '@assets/cartImages/likesCategoryImg1.svg';
import likesCategoryImg2 from '@assets/cartImages/likesCategoryImg2.svg';
import bag1 from '@assets/cartImages/bag1.svg';
import bag2 from '@assets/cartImages/bag2.svg';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';

const HomeGoodsContent: React.FC = (): React.ReactElement => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const shoeContainerRef = useRef<HTMLDivElement>(null);
  const bagContainerRef = useRef<HTMLDivElement>(null);

  const BagModels = [
    {
      title: 'Bag By You',
      img: bag1,
      priceFrom: 10,
      rating: 4,
    },
    {
      title: 'Bag By You',
      img: bag2,
      priceFrom: 100,
      rating: 0,
    },
    {
      title: 'Bag By You',
      img: bag1,
      priceFrom: 100,
      rating: 0,
    },
    {
      title: 'Bag By You',
      img: bag2,
      priceFrom: 100,
      rating: 0,
    },
  ];

  const handleClick = (containerRef: React.RefObject<HTMLDivElement>) => () => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScrollPosition = scrollWidth - clientWidth;
      const newScrollPosition = Math.min(scrollPosition + 220, maxScrollPosition);
      setScrollPosition(newScrollPosition);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const ShoeModels = [
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
    <div className={`${styles.container} w-full bg-white`}>
      <div>
        <div className="flex justify-between items-center">
          <h1 className={styles.header1}>Our Shoe Models</h1>
          <IconButton onClick={handleClick(shoeContainerRef)}>
            <img src={rightArrowIcon} className="mr-5" />
          </IconButton>
        </div>
        <div className="flex overflow-x-auto gap-2 flex-row mx-auto " ref={shoeContainerRef}>
          {ShoeModels.map((item, i) => (
            <div className="flex  justify-center items-center px-2  my-4" key={i}>
              <CardGoodsVertical
                title={item.title}
                img={item.img}
                priceFrom={item.priceFrom}
                rating={item.rating}
                key={i}
                buttonClass="transparentMint"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className={styles.header1}>Our Bag Models</h1>
          <IconButton onClick={handleClick(bagContainerRef)}>
            <img src={rightArrowIcon} className="mr-5" />
          </IconButton>
        </div>
        <div className="flex overflow-x-auto flex-row mx-auto" ref={bagContainerRef}>
          {BagModels.map((item, i) => (
            <div className="flex justify-center items-center mr-4 my-4" key={i}>
              <CardGoodsVertical
                title={item.title}
                img={item.img}
                priceFrom={item.priceFrom}
                rating={item.rating}
                key={i}
                buttonClass="transparentMint"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeGoodsContent;
