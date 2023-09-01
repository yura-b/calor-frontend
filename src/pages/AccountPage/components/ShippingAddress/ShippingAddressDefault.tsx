import { FC } from 'react';
import AccountLayout from '../AccountLayout';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';
import MainFrame from '@/components/mainFrame';

interface IProps {
  handleClick: () => void;
}

const ShippingAddressDefault: FC<IProps> = ({ handleClick }) => {
  return (
    <div>
      <AccountLayout>
        <MainFrame title={'Shipping Address'} className="overflow-hidden">
          <div className={'flex flex-col items-center justify-center w-full'}>
            <div className={styles.body1}>
              There is no shipping address yet. <br /> Would you like to add a shipping <br /> address for faster
              checkout?
            </div>

            <Button color="gray" className="mt-2" onClick={handleClick}>
              Add Address
            </Button>
          </div>
        </MainFrame>
      </AccountLayout>
    </div>
  );
};

export default ShippingAddressDefault;
