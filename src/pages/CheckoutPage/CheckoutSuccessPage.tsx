import React from 'react';
import CheckoutOrderSuccessfully from './components/CheckoutOrderSuccessfully';
import MainLayout from '@/components/MainLayout';

const CheckoutSuccessPage = () => {
  return (
    <>
      <div className="font-poppins h-screen ">
        <MainLayout>
          <div className=" flex flex-col justify-center items-center w-full mb-12">
            <div className="lg:w-[60%]">
              <CheckoutOrderSuccessfully />
            </div>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default CheckoutSuccessPage;
