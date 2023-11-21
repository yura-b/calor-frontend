import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import SubCategoriesProductsList from '@/components/SubCategoriesProductsList/SubCategoriesProductsList';
import styles from '@styles/Styles.module.scss';
import Loader from '@/components/ui/Loader';
import { useLocation } from 'react-router-dom';
import { ReadyMadeProduct } from '@/constants/enums/products.enum';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';

const ReadyMadeProductsPage: React.FC = (): React.ReactElement => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('accessories', getAccessories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const readyProducts = products?.data || [];
  const location = useLocation();
  const filteredCareProduct = readyProducts.filter(
    (readyProduct) => readyProduct.category.categoryTitle === ReadyMadeProduct.READYMADEPRODUCT
  );
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.readyMadeProductsPage} />
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        {isLoading && <Loader />}
        {isError && <p>Error loading data...</p>}
        {!filteredCareProduct.length && (
          <p className={`${styles.header1} ${styles.container} py-6 text-gray`}>
            {' '}
            {ReadyMadeProduct.READYMADEPRODUCT} coming soon
          </p>
        )}
        <div className={`${styles.container}`}>
          <SubCategoriesProductsList products={filteredCareProduct} path={location.pathname} />
        </div>
      </MainLayout>
    </div>
  );
};

export default ReadyMadeProductsPage;
