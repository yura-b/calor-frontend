import React, { useEffect, useState } from 'react';
import OrderInformation from '@pages/admin/main/components/orderPage/OrderInformation.tsx';
import OrderPageHeader from '@pages/admin/main/components/orderPage/OrderPageHeader.tsx';
import { useParams } from 'react-router';
import { changeOrderStatus, getOrder } from '@/api/orders.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import { IOrder, OrderStatus } from '@/constants/interfaces/order.ts';
import UserInfo from '@pages/admin/users/components/userProfile/components/UserInfo.tsx';
import { IUser } from '@/constants/interfaces/user.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import OrderStatusComponent from './components/orderPage/OrderStatusComponent';
import CustomButton from '@components/button/CustomButton.tsx';
import reloadPage from '@/helpers/functions/reloadPage.ts';
import DeliveryInfo from '@pages/admin/main/components/orderPage/DeliveryInfo.tsx';
import Details from './components/orderPage/Details';
import Measurement from '@pages/admin/main/components/orderPage/Measurement.tsx';
import { Role } from '@/constants/enums/role.enum';
import ShippingAddress from '@pages/admin/main/components/orderPage/ShippingAddress.tsx';

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector((state) => state.user);
  const [orderData, setOrderData] = useState<IOrder>();
  const [userData, setUserData] = useState<IUser>();
  const { id } = useParams();

  useEffect(() => {
    if (access_token && id) {
      dispatch(loading());

      getOrder(access_token, id).then((res) => {
        setOrderData(res.data.order);
        setUserData(res.data.user);
        dispatch(loadingFinished());
      });
    }
  }, []);

  const startProduction = () => {
    if (!access_token || !orderData?._id) return;
    changeOrderStatus(access_token, {
      orderStatus: OrderStatus.PRODUCTION,
      _id: orderData?._id,
    }).then(() => {
      reloadPage();
    });
  };
  if (!id || !access_token || !orderData) return <></>;
  const { email, phoneNumber, status } = orderData;
  const { firstName, secondName } = orderData;
  if (typeof phoneNumber === 'undefined') return;

  return (
    <AdminLayout>
      <div className={'mb-24'}>
        <OrderPageHeader id={id} invoiceUrl={orderData.invoiceUrl} />
        <OrderStatusComponent status={status} id={id} />
        <OrderInformation order={orderData} />
        <Details details={orderData.details} />

        <div className={'flex flex-row gap-20 justify-start mx-8 mb-8 '}>
          <Measurement measurement={orderData.measurement} />
          <ShippingAddress info={orderData.shippingInfo} />
        </div>
        <hr />
        <div className={'pl-7'}>
          <UserInfo
            withDelivery={true}
            userDataState={{
              state: {
                ...userData,
                firstName,
                secondName,
                phoneNumber,
                email,
                roles: userData?.roles || [Role.USER],
                registered: userData?.registered || false,
              },
            }}
            delivery={<DeliveryInfo _id={id} />}
          />
        </div>
        {orderData.status === OrderStatus.PROCESSING && orderData.shoes && (
          <div className={'flex justify-end mr-32'}>
            <CustomButton title={'Start Production'} handler={startProduction} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderPage;
