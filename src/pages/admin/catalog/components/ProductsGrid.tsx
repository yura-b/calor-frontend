import React, {FC} from 'react';
import ProductComponent from '@pages/admin/catalog/components/ProductComponent.tsx';
import {Product} from '@/constants/interfaces/product.ts';

const ProductsGrid: FC<{products:  Product[] }> = ({products}) => {
    console.log(products)
    return (
        <div className={'flex flex-row flex-wrap gap-10 m-5'}>
            {products.map(product => <ProductComponent {...product}/>)}
        </div>
    );
};

export default ProductsGrid;
