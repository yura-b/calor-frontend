import MainFrame from '@/components/mainFrame';
import React from 'react';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import styles from '@styles/Styles.module.scss';

const Details: React.FC = (): React.ReactElement => {
  const { secondName, firstName, email, phoneNumber } = useAppSelector((state) => state.user);

  return (
    <MainFrame title={'Account Details'} showCloseBtn={true}>
      <div className={`${styles.body2} mt-8 lg:mt-0 ${styles.container}`}>
        <div className="lg:flex justify-start gap-20">
          <div className="basis-[30%]">
            <p className={'font-bold pt-8'}>First Name </p>
            <p>{firstName} </p>
            <p className={'font-bold pt-8'}>Last Name </p>
            <p>{secondName}</p>
          </div>
          <div className="basis-[30%]">
            <p className={'font-bold pt-8'}>Email</p>
            <p>{email} </p>
            <p className={'font-bold pt-8'}>Phone Number</p>
            <p>{phoneNumber && phoneNumber} </p>
            <p>{!phoneNumber && '-'} </p>
          </div>
        </div>
      </div>
    </MainFrame>
  );
};

export default Details;
