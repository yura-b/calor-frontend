import Semicircle from '@components/semicircle/Semicircle.tsx';
import logo from '@assets/images/logo.png';

const AuthorizationHeader = () => {
  return (
    <div className={'w-full h-36 bg-custom-red'}>
      <Semicircle position={'-left-16 -top-1'} />
      <div className={'h-full flex items-center justify-center'}>
        <img src={logo} alt={''} />
      </div>
    </div>
  );
};

export default AuthorizationHeader;
