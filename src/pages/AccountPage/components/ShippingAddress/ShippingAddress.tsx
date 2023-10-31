import React, { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import ShippingAddressDefault from './ShippingAddressDefault';
import ShippingInformation, { shippingForm } from '@/pages/CheckoutPage/pages/ShippingInformation';
import { loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer';
import AccountLayout from '../AccountLayout';
import { assignAdditionalInfo, getShippingById } from '@/api/users';
import Link from '@mui/material/Link';
import MainFrame from '@/components/mainFrame';
import { shippingDetails } from '@/constants/interfaces/order.ts';

const ShippingAddress: React.FC = (): React.ReactElement => {
  const { userId, shippingInfo, access_token } = useAppSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<shippingForm | null>(null);
  const [shippingData, setShippingData] = useState<shippingForm | null>(null);
  const [buttonName, setButtonName] = useState<string>('Add');

  useEffect(() => {
    if (!data) return;
    dispatch(loading());
    assignAdditionalInfo({ ...data, user_id: userId }).then((res) => {
      if (res.status === 200) {
        if (!access_token || !shippingInfo) return;
        getShippingById(access_token, (shippingInfo as shippingDetails)._id).then((res) => {
          setShippingData(res.data);
          dispatch(showMessage('Your shipping information has been updated'));
        });
      }
    });

    dispatch(loadingFinished());
    setIsVisible(!isVisible);
  }, [data]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleEditShippingAddress = () => {
    setButtonName('Submit');
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-100">
      {!isVisible && shippingInfo === null && <ShippingAddressDefault handleClick={handleClick} />}
      <AccountLayout>
        <MainFrame title={'Shipping Address'} className="overflow-hidden">
          {!isVisible && (
            <div className={styles.container}>
              <div className=" w-full lg:w-[640px] flex justify-end">
                <Link color="inherit" className={'cursor-pointer'} onClick={handleEditShippingAddress}>
                  Edit Shipping Address
                </Link>
              </div>
              <div className={`${styles.body2} lg:flex lg:justify-between lg:w-[640px]`}>
                <div className="lg:w-1/2 lg:p-4">
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>Country</p>
                    <p>{shippingInfo?.country}</p>
                  </div>
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>Street Address</p>
                    <p>{shippingInfo?.streetAddress}</p>
                  </div>
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>Apt, Suite, Building</p>
                    <p>{shippingInfo?.ASB}</p>
                  </div>
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>Phone Number</p>
                    <p>{shippingInfo?.receiverPhoneNumber}</p>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:p-4">
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>City</p>
                    <p>{shippingInfo?.city}</p>
                  </div>
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>State</p>
                    <p>{shippingInfo?.state}</p>
                  </div>
                  <div className="mb-2 lg:mb-10">
                    <p className={'font-bold'}>ZIP Code</p>
                    <p>{shippingInfo?.ZIP}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isVisible && <ShippingInformation setData={setData} buttonTitle={buttonName} shippingData={shippingData} />}
        </MainFrame>
      </AccountLayout>
    </div>
  );
};

export default ShippingAddress;
