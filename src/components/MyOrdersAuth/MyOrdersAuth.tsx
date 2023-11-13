import React, { useState } from 'react';
import MainFrame from '@/components/mainFrame';
import Order from './components/Order';
import HistoryOrder from './components/HistoryOrder';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import styles from '@/styles/Styles.module.scss';
import emptyCurrent from '@assets/images/order/emptyCurrent.svg';
import emptyHistory from '@assets/images/order/emptyHistory.svg';
import { useQuery } from 'react-query';
import { getOrdersForUser } from '@/api/orders';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { OrderStatus } from '@/constants/interfaces/order';
import Spinner from '@components/ui/Spinner';

const MyOrder = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState(1);
  const { access_token } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useQuery('getOrdersForUser', () => {
    if (access_token === null) {
      throw new Error('Access token is null');
    }
    return getOrdersForUser(access_token);
  });

  const statusesForCurrentOrders = [OrderStatus.PROCESSING, OrderStatus.PRODUCTION, OrderStatus.QualityControl];
  const statusesForHistoryOrders = [OrderStatus.Shipped];
  const filteredStatusesForCurrentOrders = data?.data.filter((obj) => statusesForCurrentOrders.includes(obj.status));
  const filteredStatusesForHistoryOrders = data?.data.filter((obj) => statusesForHistoryOrders.includes(obj.status));

  return (
    <motion.div className="w-full  overflow-hidden bg-mintExtraLight lg:bg-transparent" {...layoutFadeAnimation}>
      <MainFrame title={'My Orders'} className="overflow-hidden">
        <div className="overflow-hidden">
          <div className={`${styles.container} lg:py-0`}>
            <div className={`flex justify-around text-gray ${styles.body1} mb-8 lg:justify-start gap-6`}>
              <button
                className={`px-12 py-1  mr-2 ${
                  activeTab === 1 ? ' border-b-2 border-gray text-gray font-bold' : 'text-[#949494]'
                }`}
                onClick={() => setActiveTab(1)}
              >
                Current
              </button>
              <button
                className={`px-12 py-1  ${
                  activeTab === 2 ? ' border-b-2 border-gray text-gray font-bold' : 'text-[#949494]'
                }`}
                onClick={() => setActiveTab(2)}
              >
                History
              </button>
            </div>
            <div className={`relative flex items-center justify-center ${isLoading ? 'mt-[100px]' : ''}`}>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="basis-[100%]">
                  {activeTab === 1 && (
                    <motion.div {...layoutFadeAnimation} className="">
                      {filteredStatusesForCurrentOrders?.length ? (
                        <div>
                          {filteredStatusesForCurrentOrders?.map((item) => (
                            <Order orderData={item} loading={isLoading} error={error} token={access_token} />
                          ))}
                        </div>
                      ) : (
                        <div className="m-auto">
                          <p className={`${styles.body1} text-center`}>You have nothing ordered</p>
                          <img src={emptyCurrent} alt="empty" className="mx-auto my-5" />
                        </div>
                      )}
                    </motion.div>
                  )}
                  {activeTab === 2 && filteredStatusesForHistoryOrders?.length ? (
                    <motion.div {...layoutFadeAnimation}>
                      {filteredStatusesForHistoryOrders?.map((item) => (
                        <HistoryOrder orderData={item} loading={isLoading} error={error} />
                      ))}
                    </motion.div>
                  ) : (
                    activeTab === 2 && (
                      <motion.div className="m-auto" {...layoutFadeAnimation}>
                        <p className={`${styles.body1} text-center`}>Your order history is empty</p>
                        <img src={emptyHistory} alt="empty" className="mx-auto my-5" />
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainFrame>
    </motion.div>
  );
};

export default MyOrder;
