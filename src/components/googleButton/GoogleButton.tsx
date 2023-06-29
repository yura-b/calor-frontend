import React, { ReactNode } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { errorCorrupted, loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { googleLogin } from '@/api/authorization.ts';
import { setUserData } from '@/store/reducers/UserReducer.ts';
import { useAppDispatch } from '@/store/hooks/hooks.ts';

export interface IGoogleButton {
  children: ReactNode;
}

const GoogleButton: React.FC<IGoogleButton> = ({ children }) => {
  const dispatch = useAppDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(loading());

      googleLogin(tokenResponse.access_token).then((res) => {
        console.log(res);
        dispatch(setUserData(res.data));
        dispatch(loadingFinished());
      });

      dispatch(errorCorrupted('something went wrong'));
    },
    onError: () => {
      console.log('login Failed');
    },
  });

  return (
    <Card
      onClick={() => {
        login();
      }}
      sx={{
        borderRadius: '0px',
        height: '44px',
        border: '1px solid #D9D9D9',
        width: '80%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Typography>{children}</Typography>
      </CardContent>
    </Card>
  );
};

export default GoogleButton;
