import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import { IOrder } from '@/constants/interfaces/order';
import ShippingInfo from '../ShippingInfo';
import OrderSummary from '../OrderSummary';
import OrderHeader from '../OrderHeader';

interface Props {
  orderData: IOrder;
  loading: boolean;
  error: any;
}

const HistoryOrder: React.FC<Props> = ({ orderData, loading, error }): React.ReactElement => {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1024) {
        setShowDetails(true);
      } else {
        setShowDetails(false);
      }
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="lg:pb-5 mb-6 xl:flex xl:justify-between  xl:gap-4 lg:border-b-2 lg:border-lightGray">
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <>
          <div className="xl:basis-[50%] ">
            <OrderHeader orderData={orderData} />
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ShippingInfo shippingInfo={orderData.shippingInfo} />
              </motion.div>
            )}
          </div>
          <div className="xl:basis-[30%]">
            <OrderSummary orderData={orderData} />
          </div>
          <div className=" flex  w-full justify-end text-gray  lg:w-0 lg:hidden">
            <motion.button
              className="text-base underline cursor-pointer font-bold  py-3 pl-3 focus:text-mint"
              onClick={() => setShowDetails(!showDetails)}
              {...hoverOnButtonAnimation}
            >
              {showDetails ? 'Hide' : 'Show All'} Details
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryOrder;
