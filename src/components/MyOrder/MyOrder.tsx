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
import { sendOrderForNotAuthUser } from '@/api/orders';

const MyOrder = (): React.ReactElement => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [orderResponse, setOrderResponse] = useState<IOrder[] | null>(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      order_id: '',
    },
    validationSchema: validationSchemaForOrderNumber,
    onSubmit: async (values) => {
      try {
        const response = await sendOrderForNotAuthUser(values.email, parseInt(values.order_id));
        setOrderResponse(response.data);
      } catch (error) {
        console.error('Error sending order:', error);
      }
    },
  });

  return (
    <motion.div className="w-full   h-full  lg:max-h-[100vh] max-h-full   " {...layoutFadeAnimation}>
      {!isRegisteredUser && (
        <MainLayout>
          <div className={`${isMobile ? '' : styles.container} `}>
            <div className=" hidden lg:block lg:my-4">
              <NavigationLinks color="gray" className=" w-auto" />
            </div>
            <motion.div {...layoutFadeAnimation}>
              {!orderResponse && (
                <div className="pt-6 shadow-2xl max-w-[88vw] md:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[40vw]  mx-auto">
                  <header className=" bg-mint flex  items-center  px-6  h-[60px] ">
                    <h1 className={`${styles.header2} m-auto text-white uppercase`}>MY Order</h1>
                  </header>
                  <div className="p-8 text-center">
                    <p className={`${styles.body1} pb-4`}>
                      To check the status of your order, please enter your email and order number
                    </p>
                    <form
                      onSubmit={formik.handleSubmit}
                      className={'mb-4 lg:basis-[40%] lg:-mt-4 lg:max-w-[500px] mx-auto'}
                    >
                      <CustomInput
                        id={'email'}
                        name={'email'}
                        placeholder={'Enter email'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                      />
                      <CustomInput
                        id={'order_id'}
                        name={'order_id'}
                        placeholder={'e.g. XXXXX'}
                        value={formik.values.order_id}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.order_id}
                        error={formik.touched.order_id && Boolean(formik.errors.order_id)}
                      />
                      <Button color="gray" type="submit">
                        Check
                      </Button>
                    </form>
                  </div>
                </div>
              )}
              {orderResponse && (
                <MainFrame title={'My Order'}>
                  <div className={`${styles.container}`}>
                    {orderResponse?.length ? (
                      <div>
                        {orderResponse?.map((item) => (
                          <Order orderData={item} className="lg:max-w-[60vw] m-auto" token={access_token} />
                        ))}
                      </div>
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
