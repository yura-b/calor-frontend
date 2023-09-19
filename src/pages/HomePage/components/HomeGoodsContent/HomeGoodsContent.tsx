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

  const shoes = products?.data?.shoes.filter((item) => item.stripeID !== constants.DAYGER_WINTER_STRIPE_ID) || [];

  return (
    <div className={`${styles.container} w-full bg-white`}>
      {headerBlock('Our Shoe Models', paths.design_shoe)}
      {isLoading && <Loader />}
      <ShoesList shoes={shoes} />
    </div>
  );
};

export default HomeGoodsContent;
