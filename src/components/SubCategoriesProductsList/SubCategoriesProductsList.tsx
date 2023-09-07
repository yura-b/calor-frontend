import React, { FC } from 'react';
import ProductCart from '../ProductCart/ProductCart';

const SubCategoriesProductsList: FC = ({ products }): React.ReactElement => {
  const subcategories = [...new Set(products.map((item) => item.subcategory))];

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col">
        {subcategories.map((subcategory) => {
          const productsInSubcategory = products.filter((product) => product.subcategory === subcategory);

          return (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <span>{subcategory}</span>
                </div>
                <div>Show more</div>
              </div>
              {productsInSubcategory.map((product) => (
                <ProductCart product={product} type="accessories" />
              ))}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategoriesProductsList;
