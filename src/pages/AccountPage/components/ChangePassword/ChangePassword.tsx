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
        dispatch(showMessage(`A password reset email has been sent to your email address!`));
      }
    });
  };

  return (
    <AccountLayout>
      <MainFrame title={'Change Password'} className="overflow-hidden">
        {!isSent && (
          <div className={'flex flex-col items-center justify-center w-full'}>
            <h2 className={`${style.header2} text-gray mb-10`}>NEW PASSWORD</h2>
            <div className={style.body2}>
              Are you sure you want to change your <br /> password?
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-5">
              <Button color="gray" onClick={handleClick}>
                Change Password
              </Button>
            </div>
          </div>
        )}
        {isSent && (
          <div className="flex items-center justify-center w-full m-auto ">
            <div className={' flex flex-col items-center justify-center w-full'}>
              <h2 className={`${style.header2} text-gray mb-10`}>NEW PASSWORD</h2>
              <div className={style.body1}>
                A password reset email has been sent <br /> to your email address. No letter?
              </div>
              <div className="w-full flex flex-col items-center justify-center mt-5">
                <Button color="gray" onClick={handleClick}>
                  Send Again
                </Button>
              </div>
            </div>
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
