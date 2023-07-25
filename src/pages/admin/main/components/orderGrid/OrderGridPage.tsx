import React, { useState } from 'react';
import OrdersTable from '@pages/admin/main/components/orderGrid/OrdersGrid.tsx';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { useQuery } from 'react-query';
import { getOrders } from '@/api/orders.ts';
import { useCleanUserDataAndNavigateToLogin } from '@components/hooks/CleanUserData.ts';

enum chosenOrders {
  current = 'Current Orders',
  history = 'Orders History',
}

const sections: chosenOrders[] = [chosenOrders.current, chosenOrders.history];

const OrderGridPage = () => {
  const [chosenSection, setChosenSection] = useState<chosenOrders>(chosenOrders.current);
  const [filter, setFilter] = useState('');

  const { access_token } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useQuery('getOrders', () => getOrders(access_token));

  const cleanAndRedirect = useCleanUserDataAndNavigateToLogin();
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';

  if (isLoading) return <></>;
  if (error) cleanAndRedirect(error);

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
