import React, { useState, useEffect } from 'react';
import styles from '@/styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';

interface Props {
  orderData?: any;
}

const HistoryOrder: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { number, date, product, phoneNumber } = orderData.order;
  const { username, company, address, city, state, zip, country, region } = orderData.shippingInfo;
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
    <div className="mb-5 mt-2 xl:flex xl:justify-between  xl:gap-4 lg:border-b-2 lg:border-lightGray lg:pb-5 mr-6">
      <div className="xl:basis-[50%] ">
        <h2 className={`${styles.subtitle} text-gray mt-4 `}>Order №{number}</h2>
        <p className="border-b-2 border-gray py-2 lg:border-none">Date {date.toISOString().substring(0, 10)}</p>
        <div className="border-b-2 border-gray py-2 lg:border-none">
          <div className="flex justify-between">
            <p>Item Name</p>
            <p>{product}</p>
            <p className="">XXX</p>
          </div>

          <p>Color: Color Name / Category</p>
        </div>
        {showDetails && (
          <>
            <div className="border-b-2 border-gray py-2 lg:border-none">
              <p className={`${styles.subtitle}`}>Shipping Information</p>
              <div className="flex justify-between">
                <p className="py-2">Name Surname</p>
                <p>{username}</p>
              </div>
              <div className="flex justify-between">
                <p>Company</p>
                <p>{company}</p>
              </div>
              <div className="flex justify-between py-2">
                <p>Address</p>
                <p>{address}</p>
              </div>
              <div className="flex justify-between">
                <p>City, State, ZIP</p>
                <p>
                  {city}, {state}, {zip}{' '}
                </p>
              </div>
              <div className="flex justify-between py-2">
                <p>Country/Region</p>
                <p>
                  {country}/{region}{' '}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Phone Number</p>
                <p>{phoneNumber} </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="xl:basis-[30%]">
        <div className="border-b-2 border-mint py-2 lg:border-none">
          <p className={`${styles.subtitle}`}>Order Summary </p>
          <div className="flex justify-between">
            <p>Item</p>
            <p>$XXX </p>
          </div>
          <div className="flex justify-between py-2">
            <p>Order Delivery</p>
            <p>$XXX </p>
          </div>
          <div className="flex justify-between">
            <p>Taxes</p>
            <p>$XXX </p>
          </div>
        </div>
        <div className="border-b-2 border-mint py-2 lg:border-none">
          <div className={`${styles.body2} font-bold text-mint flex justify-between`}>
            <h2>Subtotal</h2>
            <h2>$XXX</h2>
          </div>
        </div>
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
    </div>
  );
};

export default HistoryOrder;
