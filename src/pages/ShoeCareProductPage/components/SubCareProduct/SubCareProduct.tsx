import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import styles from '@styles/Styles.module.scss';
import Loader from '@/components/ui/Loader';
import { useLocation } from 'react-router-dom';
import { CareProduct } from '@/constants/enums/products.enum';
import ProductCart from '@/components/ProductCart/ProductCart';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';

const SubCareProduct: React.FC = (): React.ReactElement => {
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
    (category) => category.category.categoryTitle === CareProduct.CAREPRODUCT
  );
  const filteredSubCareProduct = filteredCareProduct.filter(
    (category) => category.subcategory.toUpperCase() === subPath?.toUpperCase()
  );

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.shoeCareProductPage} />
      <MainLayout>
        <div className="hidden lg:block lg:my-4">
          <NavigationLinks color="gray" className="w-auto" />
        </div>
        {isLoading && <Loader />}
        <div className={styles.container}>
          <h1 className={styles.header1}>{subPath?.toLocaleUpperCase()}</h1>
          <div className="flex gap-6 justify-start flex-wrap">
            {!filteredSubCareProduct.length && (
              <p className={`${styles.header2} py-6 text-gray uppercase`}> {subPath} coming soon</p>
            )}
            {filteredSubCareProduct &&
              filteredSubCareProduct.map((subCareProduct, i) => (
                <div key={i} className=" lg:basis-[32%] sm:basis-[45%] basis-[100%] ">
                  <ProductCart product={subCareProduct} type="accessories" winterShoePrice="" />
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default SubCareProduct;
