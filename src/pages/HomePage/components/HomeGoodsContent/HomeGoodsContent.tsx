import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from '@styles/Styles.module.scss';
import IconButton from '@mui/material/IconButton';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { useQuery } from 'react-query';
import { getProducts } from '@/api/products';
import ShoesList from '@/pages/DesignShoePage/ShoesList';
import Loader from '@/components/ui/Loader';
import constants from '@/constants/constants';

const headerBlock = (title: string, linkPath: string) => (
  <div className="flex justify-between items-center mt-4">
    <h1 className={styles.header1}>{title}</h1>
    <Link to={linkPath}>
      <IconButton>
        <ReactSVG
          src={rightArrowIcon}
          beforeInjection={(svg) => {
            svg.classList.add('icon');
            svg.setAttribute('stroke', '#E2E0E0');
          }}
        />
      </IconButton>
    </Link>
  </div>
);
const HomeGoodsContent: React.FC = (): React.ReactElement => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('products', getProducts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const shoes = products?.data?.shoes.filter((item) => item._id !== constants.DAYGER_WINTER_ID) || [];
  const winterShoePrice = products?.data?.shoes.find((item) => item._id == constants.DAYGER_WINTER_ID).price;

  return (
    <div className={`${styles.container} w-full bg-white pt-1`}>
      {headerBlock('Our Shoe Models', paths.design_shoe)}
      {isLoading && <Loader />}
      <ShoesList shoes={shoes} winterShoePrice={winterShoePrice} />
    </div>
  );
};

export default HomeGoodsContent;
