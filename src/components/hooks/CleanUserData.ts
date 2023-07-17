import {useDispatch} from 'react-redux';
import {cleanUserData} from '@/store/reducers/UserReducer.ts';
import {HttpStatusCode} from 'axios';

export const useCleanUserDataAndNavigateToLogin = () => {

    // const navigate = useNavigate();
    const dispatch = useDispatch();

    return (error) => {
        if (error && Object.keys(error).includes('response')) {
            const responseError = error as { response: { status: HttpStatusCode } };
            if (responseError.response.status === HttpStatusCode.Unauthorized) {


                dispatch(cleanUserData());
                // navigate('/login');
            }
        }
    };
};
