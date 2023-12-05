import React, { FC } from 'react';
import ProductCart from '../ProductCart/ProductCart';
import { Link } from 'react-router-dom';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
import { Product } from '@/constants/interfaces/product.ts';

interface SubCategoriesProductsListProps {
  products: Product[];
  path: string;
}

const SubCategoriesProductsList: FC<SubCategoriesProductsListProps> = ({ products, path }): React.ReactElement => {
  const subcategories = [...new Set(products.map((item) => item.subcategory as string))];
  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col w-full">
        {subcategories.map((subcategory) => {
          const productsInSubcategory = products.filter((product) => product.subcategory === subcategory).reverse();
          // const shuffledProducts = productsInSubcategory.sort(() => Math.random() - 0.5);
          const randomProducts = productsInSubcategory.slice(0, 3);

          return (
            <>
              <div className="flex items-center justify-between">
                <h1 className={styles.header1}>{subcategory}</h1>
                <motion.div {...hoverOnButtonAnimation}>
                  <Link
                    to={path + '/' + subcategory.toLowerCase()}
                    className={`${styles.subtitle} underline flex items-center`}
                  >
                    <p>Show more</p>
                    <ReactSVG
                      src={leftArrowIcon}
                      beforeInjection={(svg) => {
                        svg.classList.add('icon');
                        svg.setAttribute('stroke', '#404040');
                      }}
                      style={{
                        transform: 'rotate(180deg)',
                      }}
                      className="ml-2"
                    />
                  </Link>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4  mb-4">
                {randomProducts.map((product) => (
                  <ProductCart key={product._id} product={product} type="accessories" winterShoePrice="" />
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
