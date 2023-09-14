import styles from '@styles/Styles.module.scss';

import CustomButton from '@/components/button/CustomButton';
import { useNavigate } from 'react-router-dom';

const CheckoutOrderNotSuccessfully = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className={`${styles.body2} text-red-600 font-bold`}>Your order is not a successful order</h2>
        <h2 className={`${styles.body2} text-red-600 `}>Pleace try again</h2>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <CustomButton styles={'w-full'} title={'Main Page'} type={'submit'} handler={() => navigate('/')} />
      </div>
    </div>
  );
};
export default CheckoutOrderNotSuccessfully;
