import React, { memo, useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { EStatus, showMessage } from '@/store/reducers/StatusClientReducer.ts';
import { motion } from "framer-motion";
import { scaleAnimationFast } from '@styles/Animations';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} color={'success'} variant="filled" {...props} />;
});

const CustomSnackBar = () => {
  const { message, status } = useAppSelector((state) => state.statusClient);
  const dispatch = useAppDispatch();

  const severity = status === EStatus.ERROR ? 'error' : 'success';

  useEffect(() => {
    if (status === EStatus.OK && message === null) return;

    setTimeout(() => {
      dispatch(showMessage(null));
    }, 4000);
  }, [message, status]);

  if (!message) return <></>;

  return (
    <motion.div className="absolute right-3 top-3 z-[3000] opacity-95" {...scaleAnimationFast}>
      <Alert severity="success" color={severity} sx={{ backgroundColor: '#1EC1AA' }}>
        {message}
      </Alert>
    </motion.div>
  );
};

export default memo(CustomSnackBar);
