import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import styles from '@styles/Styles.module.scss';
import SubCategoriesProductsList from '@/components/SubCategoriesProductsList/SubCategoriesProductsList';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import Loader from '@/components/ui/Loader';
import { useLocation } from 'react-router-dom';
import { AccessoriesProduct } from '@/constants/enums/products.enum';

const AccessoriesPage: React.FC = (): React.ReactElement => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('accessories', getAccessories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const accessories = products?.data || [];
  const location = useLocation();
  const filteredAccessories = accessories.filter(
    (category) => category.category.categoryTitle === AccessoriesProduct.ACCESSORIES
  );
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.accessories} />
      <MainLayout>
        {isLoading && <Loader />}
        {!filteredAccessories.length && (
          <p className={`${styles.header1} ${styles.container} py-6 text-gray`}>
            {AccessoriesProduct.ACCESSORIES} coming soon
          </p>
        )}
        {filteredAccessories && (
          <div className={`${styles.container}`}>
            <SubCategoriesProductsList products={filteredAccessories} path={location.pathname} />
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default AccessoriesPage;
