import React, { memo, useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { EStatus, showMessage } from '@/store/reducers/StatusReducer.ts';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} color={'success'} variant="filled" {...props} />;
});

const CustomizedSnackbars = () => {
  const { message, status } = useAppSelector((state) => state.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === EStatus.OK && message === null) return;

    setTimeout(() => {
      dispatch(showMessage(null));
    }, 3000);
  }, [message, status]);

  if (!message) return <></>;

  return (
    <div className={'fixed right-10 bottom-10'}>
      <Alert severity="success">{message}</Alert>
    </div>
  );
};

export default memo(CustomizedSnackbars);
