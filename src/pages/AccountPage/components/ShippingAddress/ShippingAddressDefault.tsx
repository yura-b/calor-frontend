import { FC } from 'react';
import AccountLayout from '../AccountLayout';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';
interface IProps {
  handleClick: () => void;
}

const ShippingAddressDefault: FC<IProps> = ({ handleClick }) => {
  return (
    <div>
      <AccountLayout>
        <p className={`${styles.body1}`}>
          There is no shipping address yet. Would you like to add a shipping address for faster checkout?
        </p>
        <Button color="gray" className="mt-2" onClick={handleClick}>
          Add Address
        </Button>
      </AccountLayout>
    </div>
  );
};

export default ShippingAddressDefault;
