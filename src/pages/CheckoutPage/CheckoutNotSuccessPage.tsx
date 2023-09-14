import React from 'react';
import MainLayout from '@/components/MainLayout';
import CheckoutOrderNotSuccessfully from './components/CheckoutOrderNotSuccessfully';

const CheckoutNotSuccessPage = () => {
  return (
    <>
      <div className="font-poppins h-screen ">
        <MainLayout>
          <div className=" flex flex-col justify-center items-center w-full mb-12">
            <div className=" lg:w-[40%]">
              <CheckoutOrderNotSuccessfully />{' '}
            </div>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default CheckoutNotSuccessPage;
