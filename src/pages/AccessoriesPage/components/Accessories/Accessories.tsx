import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import styles from '@styles/Styles.module.scss';
import Loader from '@/components/ui/Loader';
import { useLocation } from 'react-router-dom';
import { AccessoriesProduct } from '@/constants/enums/products.enum';
import ProductCart from '@/components/ProductCart/ProductCart';
// import {Product} from '@/constants/interfaces/product'

const Accessories: React.FC = (): React.ReactElement => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<{ data }, Error>('accessories', getAccessories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const accessories = products?.data || [];
  const location = useLocation();
  const match = location.pathname.match(/\/([^/]+)$/);
  const subPath = match ? match[1] : null;
  const filteredAccessories = accessories.filter(
    (category) => category.category.categoryTitle === AccessoriesProduct.ACCESSORIES
  );
  const filteredSubAccessories = filteredAccessories.filter(
    (category) => category.subcategory.toUpperCase() === subPath?.toUpperCase()
  );

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.shoeCareProductPage} />
      <MainLayout>
        {isLoading && <Loader />}
        <div className={styles.container}>
          <h1 className={styles.header1}>{subPath?.toLocaleUpperCase()}</h1>
          <div className="flex gap-6 justify-start flex-wrap">
            {!filteredSubAccessories.length && (
              <p className={`${styles.header2} py-6 text-gray uppercase`}> {subPath} coming soon</p>
            )}
            {filteredSubAccessories &&
              filteredSubAccessories.map((subAccessories, i) => (
                <div key={i} className=" lg:basis-[32%] sm:basis-[45%] basis-[100%] ">
                  <ProductCart product={subAccessories} type="accessories" />
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Accessories;
