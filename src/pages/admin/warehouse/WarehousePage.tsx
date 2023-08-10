import React, {useEffect, useState} from 'react';
import {getDetails} from '@/api/warehouse.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';

import GridHeader from '@components/admin/GridHeader.tsx';
import DetailsGrid from '@pages/admin/warehouse/components/DetailsGrid.tsx';
import { Detail,  products } from '@/constants/interfaces/details.ts';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

export interface DetailsAndProductName {
    detail: Detail,
    products: products[]
}

const WarehousePage = () => {
    const [details, setDetails] = useState<DetailsAndProductName[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loading())
        getDetails().then(res => {
            setDetails(res.data)


            dispatch(loadingFinished())
        })
    }, []);

    if (!details) return
    return (
        <AdminLayout>
            <GridHeader title={'Details'}/>
            <DetailsGrid  details={details} setDetails={setDetails} />
        </AdminLayout>
    );
};

export default WarehousePage;
