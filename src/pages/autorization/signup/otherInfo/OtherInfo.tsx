import React, { useState } from 'react';
import { Steps } from '@/store/reducers/RegistrationReducer.ts';
import ContactInfo from '@pages/autorization/signup/otherInfo/pages/ContactInfo.tsx';
import SignupHeader from '@pages/autorization/signup/otherInfo/components/SignupHeader.tsx';
import Password from '@pages/autorization/signup/otherInfo/pages/Password.tsx';
import SuccessPage from '@pages/autorization/signup/otherInfo/pages/SuccessPage.tsx';
import { initialState, IUser } from '@/store/reducers/UserReducer.ts';

interface IProps {
  step: Steps;
}

const OtherInfo: React.FC<IProps> = ({ step }) => {
  const [userData, setUserData] = useState<IUser>(initialState);

  return (
    <div>
      <SignupHeader />
      {step === Steps.SECOND && <ContactInfo />}
      {step === Steps.THIRD && <Password setUserData={setUserData} />}
      {step === Steps.FOURTH && userData.access_token && <SuccessPage userData={userData} />}
    </div>
  );
};

export default OtherInfo;
