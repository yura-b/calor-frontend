import React, { FC } from 'react';
import ProductCart from '../ProductCart/ProductCart';
import { Link } from 'react-router-dom';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';
import arrow from '@assets/images/SignUpHeaderImg/arrow.png';

const SubCategoriesProductsList: FC = ({ products, path }): React.ReactElement => {
  const subcategories = [...new Set(products.map((item) => item.subcategory))];
  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col w-full">
        {subcategories.map((subcategory) => {
          const productsInSubcategory = products.filter((product) => product.subcategory === subcategory);

          return (
            <>
              <div className="flex items-center justify-between">
                <h1 className={styles.header1}>{subcategory}</h1>
                <motion.div {...hoverOnButtonAnimation}>
                  <Link to={path + '/' + subcategory.toLowerCase()} className={`${styles.subtitle} underline`}>
                    Show more <img src={arrow} className="rotate-180 ml-2 inline-block" />
                  </Link>
                </motion.div>
              </div>
              <div className="flex gap-6 justify-start flex-wrap mb-4">
                {productsInSubcategory.map((product) => (
                  <div className="lg:basis-[32%] sm:basis-[45%] basis-[100%]">
                    <ProductCart product={product} type="accessories" />
                  </div>
                ))}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategoriesProductsList;
