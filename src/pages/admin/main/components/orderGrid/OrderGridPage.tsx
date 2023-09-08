import React, { useState } from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useQuery } from 'react-query';
import { getOrders } from '@/api/orders.ts';
import { useCleanUserDataAndNavigateToLogin } from '@/hooks/CleanUserData.ts';
import OrdersTable from '@pages/admin/main/components/orderGrid/OrdersGrid.tsx';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { IOrder, OrderStatus } from '@/constants/interfaces/order.ts';
import OrderHistoryGrid from '@pages/admin/main/components/orderGrid/OrderHistoryGrid.tsx';

enum chosenOrders {
  current = 'Current Orders',
  history = 'Orders History',
}

const sections: chosenOrders[] = [chosenOrders.current, chosenOrders.history];

const OrderGridPage = () => {
  const [chosenSection, setChosenSection] = useState<chosenOrders>(chosenOrders.current);
  const [filter, setFilter] = useState('');

  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useQuery('getOrders', () => getOrders(access_token, filter));

  const cleanAndRedirect = useCleanUserDataAndNavigateToLogin();
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';

  if (isLoading) {
    dispatch(loading());
    return <></>;
  }
  if (error) {
    cleanAndRedirect(error);
    return <></>;
  }
  dispatch(loadingFinished());

  let filteredOrder = data?.data as IOrder[];

  filteredOrder = filteredOrder.filter((order) => {
    if (chosenSection === chosenOrders.history)
      return order.status === OrderStatus.Shipped || order.status === OrderStatus.Refunded;

    return order.status !== OrderStatus.Shipped && order.status !== OrderStatus.Refunded;
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
      {chosenSection === chosenOrders.current && <OrdersTable orderList={filteredOrder} />}
      {chosenSection === chosenOrders.history && <OrderHistoryGrid orders={filteredOrder} />}
    </div>
  );
};

export default OrderGridPage;
