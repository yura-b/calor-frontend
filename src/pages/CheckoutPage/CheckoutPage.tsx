import { useEffect, useState } from 'react';
import MainLayout from '@components/MainLayout';
import CheckoutHeader from '@pages/CheckoutPage/components/CheckoutHeader.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { CheckoutSteps, saveOrderIds, setCheckoutStep } from '@/store/reducers/CheckoutReducer.ts';
import ContactInformation from '@pages/CheckoutPage/pages/ContactInformation.tsx';
import CheckoutStepper from '@pages/CheckoutPage/components/CheckoutStepper.tsx';
import ShippingInformation, { shippingForm } from '@pages/CheckoutPage/pages/ShippingInformation.tsx';
import Payment from '@pages/CheckoutPage/pages/Payment.tsx';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { createOrder } from '@/api/orders.ts';

const CheckoutPage = () => {
  const { phoneNumber, email, secondName, firstName, step } = useAppSelector((state) => state.checkout);
  const { userId } = useAppSelector((state) => state.user);
  const { items: basketProducts } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();
  const [data, setData] = useState<shippingForm | null>(null);

  useEffect(() => {
    if (!data) return;
    dispatch(loading());
    createOrder({
      email,
      firstName,
      secondName,
      phone_number: phoneNumber,
      shippingInfo: {
        ...data,
        user_id: userId,
        save: data.save,
      },
      purchases: basketProducts.map((item) => ({
        count: item.count,
        product: item.shoes || item.accessory,
        details: item.details[0],
      })),
    })
      .then((res) => {
        dispatch(saveOrderIds(res.data));
        dispatch(setCheckoutStep(CheckoutSteps.THIRD));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(loadingFinished());
  }, [data]);

  return (
    <div className="font-poppins h-screen ">
      <MainLayout>
        <div className=" flex flex-col justify-center items-center w-full mb-12">
          <div className=" lg:w-[40%]">
            <CheckoutHeader />
            <CheckoutStepper />
            {step === CheckoutSteps.FIRST && <ContactInformation />}
            {step === CheckoutSteps.SECOND && (
              <ShippingInformation setData={setData} buttonTitle={'Save'} shippingData={data} />
            )}
            {step === CheckoutSteps.THIRD && <Payment />}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default CheckoutPage;
