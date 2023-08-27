import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import styles from '@styles/Styles.module.scss';
import SubcategoriesList from '@/pages/ProductsLsitPage/SubcategoriesList';
import { useQuery } from 'react-query';
import { getProducts } from '@/api/products';
import Loader from '@/components/ui/Loader';

const AccessoriesPage: React.FC = (): React.ReactElement => {
  const { data: products, isLoading, isError } = useQuery('products', getProducts);

  if(!products) {
    return <></>;
  }

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.accessories} />
      <MainLayout>
        {isLoading && <Loader />}
        <div className={`${styles.container}`}>
          <SubcategoriesList accessories={products.data.accessories}/>
        </div>
      </MainLayout>
    </div>
  );
};

export default AccessoriesPage;
