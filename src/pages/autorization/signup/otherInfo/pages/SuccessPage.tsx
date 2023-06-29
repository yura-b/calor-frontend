import React from 'react';
import successImg from '../../../../../assets/images/success.png';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { IUser, setUserData } from '@/store/reducers/UserReducer.ts';

interface IProps {
  userData: IUser;
}
const SuccessPage: React.FC<IProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const handler = () => {
    dispatch(setUserData(userData));
  };

  return (
    <div className={'flex flex-col items-center p-5 gap-8'}>
      <img src={successImg} alt={'w-full'} />
      <p className={'text-mint text-center font-bold'}>
        Your account has been created, a <br /> verification letter has been sent to your <br /> email
      </p>
      <CustomButton styles={'w-full'} title={'Main Page'} handler={handler} />
    </div>
  );
};

export default SuccessPage;
