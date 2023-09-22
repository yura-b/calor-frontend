import Semicircle from '@components/semicircle/Semicircle.tsx';
import logo from '@assets/images/logo.png';
import { useNavigate } from 'react-router';

const AuthorizationHeader = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className={'w-full h-36 bg-custom-red'}>
      <Semicircle position={'-left-16 -top-1'} />
      <div className={'h-full flex items-center justify-center'}>
        <img className="hover:cursor-pointer" src={logo} alt="logo" onClick={goToHomePage} />
      </div>
    </div>
  );
};

export default AuthorizationHeader;
