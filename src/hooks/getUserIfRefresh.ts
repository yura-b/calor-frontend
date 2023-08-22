import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { getUserUsingToken } from '@/api/users.ts';
import { useEffect } from 'react';
import {cleanUserData, setUserData} from '@/store/reducers/UserReducer.ts';
import {HttpStatusCode} from 'axios';

export const useGetUserIfRefresh = () => {
  const dispatch = useAppDispatch();

  const { access_token, secondName, phoneNumber, userId, firstName } = useAppSelector((state) => state.user);


  useEffect(() => {
    if (access_token && (!phoneNumber || !secondName || !userId || !firstName)) {
      getUserUsingToken(access_token).then((res) => {
        dispatch(setUserData(res.data));
      })
          .catch(e=>{
            if (e.response.status === HttpStatusCode.Unauthorized) {
              dispatch(cleanUserData());
            }
          });
    }
  }, [access_token]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {};
};
