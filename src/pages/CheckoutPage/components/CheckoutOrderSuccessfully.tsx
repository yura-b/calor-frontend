import styles from '@styles/Styles.module.scss';
import CheckoutOrderItem from './CheckoutOrderItem';
import CustomButton from '@/components/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks/hooks';

const CheckoutOrderSuccessfully = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useAppSelector((state) => state.user);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20 w-full">
        <h2 className={`${styles.body2} text-mint font-bold`}>Order Successfully</h2>
        <h2 className={`${styles.body2} text-mint`}>Check your email for your order confirmation</h2>
      </div>
      <div className="lg:flex mb-10  w-full">
        <CheckoutOrderItem />
        <div className="lg:ml-20 lg:w-[50%]">
          <div>
            <h3 className="font-bold mt-5">Shipping Information</h3>
            <p>
              Name Surname<span className="float-right">{shippingInfo?.receiverFirstName}</span>
            </p>
            <p>Company</p>
            <p>
              Address<span className="float-right">{shippingInfo?.streetAddress}</span>
            </p>
            <p>
              City, State, ZIP
              <span className="float-right">
                {shippingInfo?.city}, {shippingInfo?.state}, {shippingInfo?.ZIP}
              </span>
            </p>
            <p>
              Country/Region <span className="float-right">{shippingInfo?.country}</span>
            </p>
            <p>
              Phone Number<span className="float-right">{shippingInfo?.receiverPhoneNumber}</span>
            </p>
          </div>
          <hr className="lg:hidden mt-3 mb-3" />
          <div>
            <h3 className="font-bold mt-5">Order Summary </h3>
            <p>
              Item <span className="float-right">$ XXX</span>
            </p>
            <p>
              Order Delivery<span className="float-right">$ XXX</span>
            </p>
            <p>
              Taxes<span className="float-right">$ XXX</span>
            </p>
            <p className="text-mint font-bold">
              Subtotal<span className="float-right">$ XXX</span>
            </p>
            <hr className="lg:hidden mt-3 mb-3 text-mint" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-20 ">
        <div className="w-full lg:w-[40%]">
          <CustomButton styles={'w-full mt-5'} title={'Main Page'} type={'submit'} handler={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};
export default CheckoutOrderSuccessfully;
