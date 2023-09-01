import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.scss';
import color from '@styles/Colors.module.scss';
import Logo from '@assets/images/logo.svg';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { EStatus } from '@/store/reducers/StatusReducer.ts';
import { memo, useMemo } from 'react';

const AdminLoader = () => {
  const { status } = useAppSelector((state) => state.status);

  const memoizedStatus = useMemo(() => status, [status]);

  if (memoizedStatus !== EStatus.LOADING) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <img className={styles.logo} src={Logo} alt="logo" />
        <CircularProgress size={20} style={{ color: color.red }} />
      </div>
    </div>
  );
};

export default memo(AdminLoader);
