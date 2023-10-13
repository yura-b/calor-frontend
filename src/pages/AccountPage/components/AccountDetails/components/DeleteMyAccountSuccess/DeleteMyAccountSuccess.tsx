import MainFrame from '@/components/mainFrame';
import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import MainLayout from '@/components/MainLayout';
import { paths } from '@/routes/paths';

const DeleteMyAccountComponent: React.FC = (): React.ReactElement => {
  return (
    <MainLayout>
      <MainFrame title={'Delete Account'} showCloseBtn={true} headerBg={'grayLight'}>
        <div className={`${styles.container} `}>
          <div className="flex flex-col justify-center items-center mt-8 min-h-[50vh]">
            <p className={`${styles.body1} font-bold text-center`}>Your account is deleted</p>
            <p className={`${styles.body1} text-center`}>Thanks for using our product</p>
            <Button color="gray" className="my-8" to={paths.home}>
              Home
            </Button>
          </div>
        </div>
      </MainFrame>
      ;
    </MainLayout>
  );
};

export default DeleteMyAccountComponent;
