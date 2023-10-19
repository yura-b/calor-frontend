import React, { FC, memo, useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { EStatus, showMessage } from '@/store/reducers/StatusReducer.ts';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} color={'success'} variant="filled" {...props} />;
});

const CustomizedSnackbars: FC<{ bottom?: string }> = ({ bottom = '80px' }) => {
  const { message, status } = useAppSelector((state) => state.status);
  const dispatch = useAppDispatch();

  const severity = status === EStatus.ERROR ? 'error' : 'success';

  useEffect(() => {
    if (status === EStatus.OK && message === null) return;

    setTimeout(() => {
      dispatch(showMessage(null));
    }, 3000);
  }, [message, status]);

  if (!message) return <></>;

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px', // Adjust the right margin as needed
        bottom: bottom,
      }}
    >
      <Alert severity="error" color={severity}>
        {message}
      </Alert>
    </div>
  );
};

export default memo(CustomizedSnackbars);
