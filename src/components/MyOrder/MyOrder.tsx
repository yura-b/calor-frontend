import React, { useState } from 'react';
import MainFrame from '@/components/mainFrame';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import Order from '../MyOrdersAuth/components/Order';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import { IOrder } from '@/constants/interfaces/order';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForOrderNumber } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';
import styles from '@/styles/Styles.module.scss';
import emptyCurrent from '@assets/images/order/emptyCurrent.svg';
import MainLayout from '@/components/MainLayout';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import { useMediaQuery } from '@react-hook/media-query';

const MyOrder = (): React.ReactElement => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
  const isMobile = useMediaQuery('(max-width: 1023px)');
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

  return (
    <motion.div className="w-full   h-full  lg:max-h-[100vh] max-h-full   " {...layoutFadeAnimation}>
      {!isRegisteredUser && (
        <MainLayout>
          <div className={`${isMobile ? '' : styles.container} `}>
            <div className=" hidden lg:block lg:my-4">
              <NavigationLinks color="gray" className=" w-auto" />
            </div>
            <motion.div {...layoutFadeAnimation}>
              {!formSubmitted && (
                <div className="pt-6 shadow-2xl max-w-[88vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[40vw]  mx-auto">
                  <header className=" bg-mint flex  items-center  px-6  h-[60px] ">
                    <h1 className={`${styles.header2} m-auto text-gray uppercase`}>MY Order</h1>
                  </header>
                  <div className="p-8 text-center">
                    <p className={`${styles.body1}`}>
                      To check the status of your order, please enter your order number
                    </p>
                    <p className={`${styles.body1} font-bold`}>Order Number</p>

                    <form
                      onSubmit={formik.handleSubmit}
                      className={'mb-4 lg:basis-[40%] lg:-mt-4 lg:max-w-[500px] mx-auto'}
                    >
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
                </div>
              )}
              {formSubmitted && (
                <MainFrame title={'My Order'}>
                  <div className={`${styles.container}`}>
                    {OrderItems.length ? (
                      <Order orderData={OrderItems[0]} className="lg:max-w-[60vw] m-auto" />
                    ) : (
                      <div className="m-auto">
                        <p className={`${styles.body1} text-center`}>You have nothing ordered</p>
                        <img src={emptyCurrent} alt="empty" className="mx-auto my-5" />
                      </div>
                    )}
                  </div>
                </MainFrame>
              )}
            </motion.div>
          </div>
        </MainLayout>
      )}
    </motion.div>
  );
};

export default MyOrder;
