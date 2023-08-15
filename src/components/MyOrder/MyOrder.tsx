import React, { useState, useEffect } from 'react';

import MainFrame from '@/components/mainFrame';

import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import Order from './components/order';
import HistoryOrder from './components/HistoryOrder';
import { Modal } from '@mui/material';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import { IOrder } from '@/constants/interfaces/order';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForOrderNumber } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';
import styles from '@/styles/Styles.module.scss';
import emptyCurrent from '@assets/images/order/emptyCurrent.svg';
import emptyHistory from '@assets/images/order/emptyHistory.svg';

const MyOrder = ({ isOpen, onClose }): React.ReactElement => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);

  const formik = useFormik({
    initialValues: {
      orderNumber: '',
    },
    validationSchema: validationSchemaForOrderNumber,
    onSubmit: (values) => {
      setFormSubmitted(true);
      console.log(values);
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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
    <Modal className="flex items-center justify-center" open={isOpen} onClose={onClose}>
      <>
        {isOpen && (
          <motion.div
            className="absolute bg-white shadow-lg w-full lg:w-1/2 h-full  lg:h-4/5 max-h-full lg:rounded-md overflow-hidden"
            {...layoutFadeAnimation}
          >
            <MainFrame isOpen={isOpen} closeFrame={onClose} title={'My Order'} className="">
              <div className={isRegisteredUser ? 'bg-mintExtraLight' : ''}>
                <div className={`${styles.container} lg:p-10`}>
                  {isRegisteredUser && (
                    <div className={`flex justify-around text-gray ${styles.header2} mb-8`}>
                      <button
                        className={`px-4 py-1  mr-2  ${
                          activeTab === 1 ? ' border-b-2 border-gray text-gray' : 'text-[#949494]'
                        }`}
                        onClick={() => setActiveTab(1)}
                      >
                        Current
                      </button>
                      <button
                        className={`px-4 py-1  ${
                          activeTab === 2 ? ' border-b-2 border-gray text-gray' : 'text-[#949494]'
                        }`}
                        onClick={() => setActiveTab(2)}
                      >
                        History
                      </button>
                    </div>
                  )}
                  <div>
                    {activeTab === 1 && (
                      <motion.div {...layoutFadeAnimation}>
                        {!isRegisteredUser && (
                          <div>
                            {!formSubmitted && (
                              <div className="pt-6">
                                <p className={`${styles.body1}`}>
                                  To check the status of your order, please enter your order number
                                </p>
                                <p className={`${styles.body1} font-bold`}>Order Number</p>

                                <form onSubmit={formik.handleSubmit} className={'mb-4 lg:basis-[40%] lg:-mt-4'}>
                                  <CustomInput
                                    id={'orderNumber'}
                                    name={'orderNumber'}
                                    placeholder={'e.g. XXXXX'}
                                    value={formik.values.orderNumber}
                                    onChange={formik.handleChange}
                                    errorMessage={formik.errors.orderNumber}
                                    error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
                                  />
                                  <Button color="gray" type="submit">
                                    Check
                                  </Button>
                                </form>
                              </div>
                            )}

                            {formSubmitted && <Order orderData={OrderItems[0]} />}
                          </div>
                        )}
                        {isRegisteredUser && OrderItems.length ? (
                          <div>
                            {OrderItems.map((item) => (
                              <Order orderData={item} />
                            ))}
                          </div>
                        ) : (
                          isRegisteredUser && (
                            <div className="m-auto">
                              <p className={`${styles.body1} text-center`}>You have nothing ordered</p>
                              <img src={emptyCurrent} alt="empty" className="mx-auto my-5" />
                            </div>
                          )
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
        )}
      </>
    </Modal>
  );
};

export default MyOrder;
