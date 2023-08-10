import React, { useState } from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useQuery } from 'react-query';
import { getOrders } from '@/api/orders.ts';
import { useCleanUserDataAndNavigateToLogin } from '@/hooks/CleanUserData.ts';
import OrdersTable from '@pages/admin/main/components/OrdersGrid.tsx';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

enum chosenOrders {
  current = 'Current Orders',
  history = 'Orders History',
}

const sections: chosenOrders[] = [chosenOrders.current, chosenOrders.history];

const OrderGridPage = () => {
  const [chosenSection, setChosenSection] = useState<chosenOrders>(chosenOrders.current);
  const [filter, setFilter] = useState('');

  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useQuery('getOrders', () => getOrders(access_token));

  const cleanAndRedirect = useCleanUserDataAndNavigateToLogin();
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';

  if (isLoading) {
    dispatch(loading())
    return <></>;
  }
  if (error) {
    cleanAndRedirect(error);
    return <></>;
  }
  dispatch(loadingFinished())


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
      <OrdersTable orderList={data?.data} />
    </div>
  );
};

export default OrderGridPage;
