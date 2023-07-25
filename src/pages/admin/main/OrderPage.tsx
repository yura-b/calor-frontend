import React, {useEffect, useState} from 'react';
import OrderInformation from '@pages/admin/main/components/orderPage/OrderInformation.tsx';
import OrderPageHeader from '@pages/admin/main/components/orderPage/OrderPageHeader.tsx';
import {useParams} from 'react-router';
import {getOrder} from '@/api/orders.ts';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import {IOrder} from '@/constants/interfaces/order.ts';
import UserInfo from '@pages/admin/users/components/userProfile/components/UserInfo.tsx';

const OrderPage = () => {
    const {access_token} = useAppSelector(state=>state.user)
    const [orderData, setOrderData] = useState<IOrder>()
    const {id} = useParams()

    useEffect(()=>{
        if (access_token && id) getOrder(access_token, id)
            .then(res=>{
             setOrderData(res.data)
         })
    }, [])


    if (!id || !access_token || !orderData) return <></>
    const {email, number} = orderData;
    const [firstName, secondName] = orderData.username.split(' ')
    console.log(orderData)

    return (
        <AdminLayout>
            <OrderPageHeader id={id}/>
            <OrderInformation order={orderData}/>
            <UserInfo withDelivery={true} userDataState={{state: {phoneNumber: number, email, secondName, firstName}}}/>
        </AdminLayout>
    );
};

export default OrderPage;
