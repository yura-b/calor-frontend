import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import styles from '@styles/Styles.module.scss';
import Loader from '@/components/ui/Loader';
import { useLocation } from 'react-router-dom';
import { ReadyMadeProduct } from '@/constants/enums/products.enum';
import ProductCart from '@/components/ProductCart/ProductCart';

const SubReadyMadeProduct: React.FC = (): React.ReactElement => {
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
  const match = location.pathname.match(/\/([^/]+)$/);
  const subPath = match ? match[1] : null;
  const filteredCareProduct = accessories.filter(
    (category) => category.category.categoryTitle === ReadyMadeProduct.READYMADEPRODUCT
  );
  const filteredSubCareProduct = filteredCareProduct.filter(
    (category) => category.subcategory.toUpperCase() === subPath?.toUpperCase()
  );

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.shoeCareProductPage} />
      <MainLayout>
        {isLoading && <Loader />}
        {isError && <p>Error loading data...</p>}
        <div className={styles.container}>
          <h1 className={styles.header1}>{subPath?.toLocaleUpperCase()} </h1>
          {!filteredSubCareProduct.length && (
            <p className={`${styles.header2} py-6 text-gray uppercase`}> Ready made {subPath} coming soon</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {filteredSubCareProduct &&
              filteredSubCareProduct.map((subCareProduct, i) => (
                <ProductCart product={subCareProduct} type="accessories" winterShoePrice="" key={i} />
              ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default SubReadyMadeProduct;
