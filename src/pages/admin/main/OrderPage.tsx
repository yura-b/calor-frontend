import React, {useEffect, useState} from 'react';
import OrderInformation from '@pages/admin/main/components/orderPage/OrderInformation.tsx';
import OrderPageHeader from '@pages/admin/main/components/orderPage/OrderPageHeader.tsx';
import {useParams} from 'react-router';
import {getOrder} from '@/api/orders.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import {IOrder} from '@/constants/interfaces/order.ts';
import UserInfo from '@pages/admin/users/components/userProfile/components/UserInfo.tsx';
import {IUser} from '@/constants/interfaces/user.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

const OrderPage = () => {
    const dispatch = useAppDispatch()
    const {access_token} = useAppSelector(state=>state.user)
    const [orderData, setOrderData] = useState<IOrder>()
    const [userData, setUserData] = useState<IUser>()
    const {id} = useParams()

    useEffect(()=> {
      if (access_token && id){

        dispatch(loading())

        getOrder(access_token, id)
          .then(res => {
            setOrderData(res.data.order)
            setUserData(res.data.user)


            dispatch(loadingFinished())
          })
    }
    }, [])


    if (!id || !access_token || !orderData) return <></>
    const {email, phoneNumber} = orderData;
    console.log(orderData)
    console.log(userData)
    const [firstName, secondName] = orderData.username.split(' ')
    // console.log(orderData)

    return (
        <AdminLayout>
            <OrderPageHeader id={id}/>
            <OrderInformation order={orderData}/>
            <div className={'pl-7'}>
              <UserInfo withDelivery={true} userDataState={{state: {phoneNumber, email, secondName, firstName}}}/>
            </div>
        </AdminLayout>
    );
};

export default OrderPage;
