import { FC } from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import ShoesList from './ShoesList';
import { useQuery } from 'react-query';
import { getProducts } from '@/api/products';
import Loader from '@/components/ui/Loader';
import styles from '@styles/Styles.module.scss';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import constants from '@/constants/constants';

const DesignShoePage: FC = (): React.ReactElement => {
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
    <div className="font-poppins h-screen">
      <Head title={titles.designShoePage} />
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        {isLoading && <Loader />}
        <div className={`${styles.container}`}>
          <ShoesList shoes={shoes} winterShoePrice={winterShoePrice} />
        </div>
      </MainLayout>
    </div>
  );
};

export default DesignShoePage;
