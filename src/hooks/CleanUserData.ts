import { cleanUserData } from '@/store/reducers/UserReducer.ts';
import { HttpStatusCode } from 'axios';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { useNavigate } from 'react-router-dom';

export const useCleanUserDataAndNavigateToLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (error) => {
    if (error && Object.keys(error).includes('response')) {
      const responseError = error as { response: { status: HttpStatusCode } };

      if (responseError.response.status === HttpStatusCode.Unauthorized) {

        dispatch(cleanUserData());
        navigate('/login');
      }
    }
  };
};
