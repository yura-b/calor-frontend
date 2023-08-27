import AccountMenuLinks from './components/AccountMenuLinks';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import arrow from '@assets/images/SignUpHeaderImg/arrow.png';
import { paths } from '@routes/paths';
import { Link } from 'react-router-dom';
import MainFrame from '@/components/mainFrame';
import HelpFooter from '@components/MainLayout/components/HelpFooter';

const AccountPage = () => {
  const { firstName, secondName } = useAppSelector((state) => state.user);
  return (
    <div className={'font-poppins text-gray absolute bg-white w-[100vw] h-screen top-0 left-0 z-50 relative'}>
      <Link to={paths.home}>
        {' '}
        <img src={arrow} alt={''} className="p-10 absolute -top-5 -left-4" />
      </Link>
      <MainFrame title={'Account'} showCloseBtn={true}>
        <AccountMenuLinks firstName={firstName} secondName={secondName} />
        <footer className="bg-custom-turquoise h-full px-6 text-gray">
          <div className="xl:hidden">
            <HelpFooter title={'Need Help?'} color="gray" />
          </div>
        </footer>
      </MainFrame>
    </div>
  );
};

export default AccountPage;
