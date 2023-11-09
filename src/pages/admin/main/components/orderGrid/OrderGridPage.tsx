import React, { useState } from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import {  useAppSelector } from '@/store/hooks/hooks.ts';
import { useQuery } from 'react-query';
import { getOrders } from '@/api/orders.ts';
import { useCleanUserDataAndNavigateToLogin } from '@/hooks/CleanUserData.ts';
import OrdersTable from '@pages/admin/main/components/orderGrid/current/OrdersGrid.tsx';
import { IOrder, OrderStatus } from '@/constants/interfaces/order.ts';
import OrderHistoryGrid from '@pages/admin/main/components/orderGrid/history/OrderHistoryGrid.tsx';
import Loader from '@components/ui/Loader';

enum chosenOrders {
  current = 'Current Orders',
  history = 'Orders History',
  unpaid = 'Unpaid Orders'
}

const sections: chosenOrders[] = [chosenOrders.current, chosenOrders.history, chosenOrders.unpaid];

const OrderGridPage = () => {

  const [chosenSection, setChosenSection] = useState<chosenOrders>(chosenOrders.current);
  const [filter, setFilter] = useState('');
  const { access_token } = useAppSelector((state) => state.user);

  const { data, isLoading, error } = useQuery('getOrders', () => getOrders(access_token, filter));


  const cleanAndRedirect = useCleanUserDataAndNavigateToLogin();
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';


  if (isLoading) {
    return <div className={'flex items-center'}>
      <Loader/>
    </div>;
  }
  if (error) {
    cleanAndRedirect(error);
    return <></>;
  }
  
  let filteredOrder = data?.data as IOrder[];

  filteredOrder = filteredOrder?.filter((order) => {
    if (chosenSection === chosenOrders.unpaid) {
      return order.status === OrderStatus.NotPaid;
    }

    if (chosenSection === chosenOrders.history) {
      return order.status === OrderStatus.Shipped || order.status === OrderStatus.Refunded
    }

    return order.status !== OrderStatus.Shipped && order.status !== OrderStatus.Refunded && order.status !== OrderStatus.NotPaid;
  });



  return (
    <div className={'pl-5'}>
      <CustomSearch searchButton={setFilter} />
      <div className={'flex flex-row mb-6'}>
        {sections.map((section) => {
          if (section === chosenSection) {
            return (
              <div key={section} className={defaultStyles + chosen} onClick={() => setChosenSection(section)}>
                {section}
              </div>
            );
          }
          return (
            <div key={section} className={defaultStyles} onClick={() => setChosenSection(section)}>
              {section}
            </div>
          );
        })}
      </div>
      {filteredOrder && filteredOrder.length > 0 && chosenSection === chosenOrders.current && (
        <OrdersTable orderList={filteredOrder} />
      )}
      {filteredOrder && filteredOrder.length > 0 && chosenSection === chosenOrders.history && (
        <OrderHistoryGrid orders={filteredOrder} />
      )}
      {filteredOrder && filteredOrder.length > 0 && chosenSection === chosenOrders.unpaid && (
        <OrdersTable orderList={filteredOrder} />
      )}
      {filteredOrder && filteredOrder.length === 0 && <div>No orders found.</div>}
    </div>
  );
};

export default OrderGridPage;
