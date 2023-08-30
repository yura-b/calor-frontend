import AccountMenuLinks from './components/AccountMenuLinks';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import MainFrame from '@/components/mainFrame';
import AccountLayout from './components/AccountLayout';
import styles from '@styles/Styles.module.scss';

const AccountPage = () => {
  const { firstName, secondName } = useAppSelector((state) => state.user);
  return (
    <AccountLayout>
      <MainFrame title={'Account'} showCloseBtn={true}>
        <div className={`${styles.container}`}>
          <AccountMenuLinks firstName={firstName} secondName={secondName} account={true} />
        </div>
      </MainFrame>
    </AccountLayout>
  );
};

export default AccountPage;
