import React, { useState } from 'react';
import MainFrame from '@/components/mainFrame';
import Order from './components/Order';
import HistoryOrder from './components/HistoryOrder';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import { IOrder } from '@/constants/interfaces/order';
import styles from '@/styles/Styles.module.scss';
import emptyCurrent from '@assets/images/order/emptyCurrent.svg';
import emptyHistory from '@assets/images/order/emptyHistory.svg';

const MyOrder = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState(1);

  const OrderItem: IOrder[] = {
    _id: 1,
    userID: '1',
    number: 100,
    details: {
      shoe: [],
    },
    quantity: 1,
    product: 'Shoe',
    address: 'Test Address',
    totalPrice: 100,
    email: '1@1',
    username: 'TestName',
    phoneNumber: '0000000000',
    paypal_id: '1',
    date: new Date(),
    productionDays: 3,
    purchases: [
      {
        product: {
          type: 'shoe',
          title: 'SunRize',
          price: 100,
          description: 'Test description',
        },
        count: 2,
        details: {
          bag: { material: 'test material', color: 'gray' },
        },
      },
    ],
  };
  const ShippingInfo = {
    username: 'Test',
    company: 'Test',
    address: 'Test Address',
    city: 'Test City',
    state: 'Test State',
    zip: '12345',
    country: 'Test Country',
    region: 'Test Region',
  };
  const OrderItems = [
    {
      order: OrderItem,
      shippingInfo: ShippingInfo,
    },
    {
      order: OrderItem,
      shippingInfo: ShippingInfo,
    },
    {
      order: OrderItem,
      shippingInfo: ShippingInfo,
    },
  ];
  const HistoryOrderItems = [
    {
      order: OrderItem,
      shippingInfo: ShippingInfo,
    },
    {
      order: OrderItem,
      shippingInfo: ShippingInfo,
    },
  ];

  return (
    <motion.div className="w-full   h-full  lg:max-h-[600px] max-h-full  lg:overflow-hidden" {...layoutFadeAnimation}>
      <MainFrame title={'My Orders'}>
        <div className="">
          <div className={`${styles.container} lg:pt-0`}>
            <div className={`flex justify-around text-gray ${styles.body2} mb-8 lg:justify-start`}>
              <button
                className={`px-4 py-1  mr-2  ${
                  activeTab === 1 ? ' border-b-2 border-gray text-gray font-bold' : 'text-[#949494]'
                }`}
                onClick={() => setActiveTab(1)}
              >
                Current
              </button>
              <button
                className={`px-4 py-1  ${
                  activeTab === 2 ? ' border-b-2 border-gray text-gray font-bold' : 'text-[#949494]'
                }`}
                onClick={() => setActiveTab(2)}
              >
                History
              </button>
            </div>

            <div>
              {activeTab === 1 && (
                <motion.div {...layoutFadeAnimation}>
                  {OrderItems.length ? (
                    <div>
                      {OrderItems.map((item) => (
                        <Order orderData={item} />
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
              {activeTab === 2 && HistoryOrderItems.length ? (
                <motion.div {...layoutFadeAnimation}>
                  {HistoryOrderItems.map((item) => (
                    <HistoryOrder orderData={item} />
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
          </div>
        </div>
      </MainFrame>
    </motion.div>
  );
};

export default MyOrder;
