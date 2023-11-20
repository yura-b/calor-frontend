import React, { useState } from 'react';
import AccountLayout from '../AccountLayout';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { sendEmailForReset } from '@/api/authorization';
import { showMessage } from '@/store/reducers/StatusReducer';
import style from '@styles/Styles.module.scss';
import MainFrame from '@/components/mainFrame';

const ChangePassword: React.FC = (): React.ReactElement => {
  const [isSent, setIsSent] = useState(false);
  const dispatch = useAppDispatch();
  const { access_token, email } = useAppSelector((state) => state.user);
  const handleClick = () => {
    if (!access_token) return;
    sendEmailForReset(email).then((res) => {
      if (res) {
        setIsSent(true);
        dispatch(showMessage('A password reset email has been sent to your email address!'));
      }
    });
  };

  return (
    <AccountLayout>
      <MainFrame title={'Change Password'} className="overflow-hidden">
        {!isSent && (
          <div className={'flex flex-col items-center justify-center  mx-6 mt-4'}>
            <h2 className={`${style.header2} text-gray mb-6 lg:mb-10`}>NEW PASSWORD</h2>
            <div className={style.body2}>
              Are you sure you want to change your <br /> password?
            </div>
            <Button color="gray" onClick={handleClick} className="mt-6">
              Change Password
            </Button>
          </div>
        )}
        {isSent && (
          <div className={' flex flex-col items-center justify-center mx-6 mt-4'}>
            <h2 className={`${style.header2} text-gray mb-6 lg:mb-10`}>NEW PASSWORD</h2>
            <div className={style.body1}>
              A password reset email has been sent <br /> to your email address. No letter?
            </div>
            <Button color="gray" onClick={handleClick} className="mt-6">
              Send Again
            </Button>
          </div>
        )}
      </MainFrame>
    </AccountLayout>
  );
};

export default ChangePassword;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
