import React, {useEffect, useState} from 'react';
import GridHeader from '@components/admin/GridHeader.tsx';
import {useNavigate} from 'react-router-dom';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import {getProducts} from '@/api/products.ts';
import {useAppDispatch} from '@/store/hooks/hooks.ts';
import {loading, loadingFinished} from '@/store/reducers/StatusReducer.ts';
import ProductsGrid from '@pages/admin/catalog/components/ProductsGrid.tsx';
import {Product} from '@/constants/interfaces/product.ts';

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const headerClickHandler = () => {
        navigate('/admin/createitem')
    }
    useEffect(() => {
        dispatch(loading())
        getProducts().then(res => {
            setProducts(res.data)
        })

        dispatch(loadingFinished())
    }, [])

    if (products.length === 0) return

    return (
        <AdminLayout>
            <GridHeader title={'Catalog'} click={headerClickHandler} buttonTitle={'+ create item'}/>
            <ProductsGrid  products={products}/>
        </AdminLayout>
    );
};

export default CatalogPage;
