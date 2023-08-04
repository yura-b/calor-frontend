import React from 'react';
import CardGoodsVertical from '@components/CardGoodsVertical';
import styles from '@styles/Styles.module.scss';
import IconButton from '@mui/material/IconButton';
import shoeModel1 from '@assets/cartImages/shoeModel1.svg';
import shoeModel2 from '@assets/cartImages/shoeModel2.svg';
import shoeModel3 from '@assets/cartImages/shoeModel3.svg';
import bag1 from '@assets/cartImages/bag1.svg';
import bag2 from '@assets/cartImages/bag2.svg';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

const separateContainer =
  'flex justify-between items-center m-auto overflow-x-auto gap-2 flex-row py-4 lg:py-6 lg:gap-6 2xl:max-w-screen-2xl';

const headerBlock = (title: string, linkPath: string) => (
  <div className="flex justify-between items-center mt-4">
    <h1 className={styles.header1}>{title}</h1>
    <Link to={linkPath}>
      <IconButton>
        <img src={rightArrowIcon} />
      </IconButton>
    </Link>
  </div>
);
interface goodsModels {
  title: string;
  img: string;
  priceFrom: number;
  rating: number;
}
const renderGoods = (data: goodsModels[]) => (
  <div className={separateContainer}>
    {data.map((item, i) => (
      <CardGoodsVertical
        title={item.title}
        img={item.img}
        priceFrom={item.priceFrom}
        rating={item.rating}
        key={i}
        buttonClass="transparentMint"
      />
    ))}
  </div>
);

const HomeGoodsContent: React.FC = (): React.ReactElement => {
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
  ];

  const ShoeModels = [
    {
      title: 'Dayger',
      img: shoeModel1,
      priceFrom: 10,
      rating: 4,
    },
    {
      title: 'Yolo',
      img: shoeModel2,
      priceFrom: 100,
      rating: 0,
    },
    {
      title: 'Yolo',
      img: shoeModel3,
      priceFrom: 100,
      rating: 0,
    },
  ];

  return (
    <div className={`${styles.container} w-full bg-white`}>
      {headerBlock('Our Shoe Models', paths.design_shoe)}
      {renderGoods(ShoeModels)}
      {headerBlock('Our Bag Models', paths.design_bag)}
      {renderGoods(BagModels)}
    </div>
  );
};

export default HomeGoodsContent;
