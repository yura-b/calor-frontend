import { FC } from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import ShoesList from './ShoesList';
import { useQuery } from 'react-query';
import { getProducts } from '@/api/products';
import Loader from '@/components/ui/Loader';
import styles from '@styles/Styles.module.scss';


const DesignShoePage: FC = (): React.ReactElement => {

  const { data: products, isLoading, isError } = useQuery('products', getProducts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  const shoes = products?.data?.shoes || [];

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.designShoePage} />
      <MainLayout>
        { isLoading && <Loader /> }
        <div className={`${styles.container}`}>
          <ShoesList shoes={shoes} />
        </div>
      </MainLayout>
    </div>
  );
};

export default DesignShoePage;
