import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { getUserUsingToken } from '@/api/users.ts';
import { useEffect } from 'react';
import { setUserData } from '@/store/reducers/UserReducer.ts';

export const useGetUserIfRefresh = () => {
  const dispatch = useAppDispatch();
  const { access_token, secondName, phoneNumber, userId, firstName } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (access_token && (!phoneNumber || !secondName || !userId || !firstName)) {
      getUserUsingToken(access_token).then((res) => {
        dispatch(setUserData(res.data));
      });
    }
  }, [access_token]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {};
};
