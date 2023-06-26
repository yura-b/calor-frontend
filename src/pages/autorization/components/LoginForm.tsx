import CustomInput from '@components/input/CustomInput.tsx';
import * as yup from 'yup';
import {useFormik} from 'formik';
import NavigationButtons from '@/pages/autorization/components/navigationButtons/navigationButtons.tsx';
import ForgotPassword from '@/pages/autorization/components/forgotPassword/forgotPassword.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import {useAppDispatch} from '@/store/hooks/hooks.ts';
import {LoginDto} from '@/api/dto/login.dto.ts';
import {errorCorrupted, loading, loadingFinished} from '@/store/reducers/StatusReducer.ts';
import {login} from '@/api/authorization.ts';
import {InputType} from '@/constants/interfaces/inputTypes.ts';
import {setUserData} from '@/store/reducers/UserReducer.ts';

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const logInHandler = (values: LoginDto) => {
        dispatch(loading())
        login(values)
            .then((res) => {
                const response = res.data
                dispatch(loadingFinished())
                dispatch(setUserData(response))
            })
            .catch((e) => {
                dispatch(errorCorrupted(e?.meesage))
            })
    }

    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(2, 'Password should be of minimum 8 characters length').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            logInHandler(values)
        },
    });

    return (
        <div className={'flex flex-col p-5 bg-custom-turquoise'}>
            <NavigationButtons isLogin={true}/>

            <form onSubmit={formik.handleSubmit} className={'mb-4'}>
                <CustomInput
                    id={'email'}
                    name={'email'}
                    placeholder={'input email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                >
                    Email
                </CustomInput>
                <CustomInput
                    id={'password'}
                    name={'password'}
                    type={InputType.password}
                    placeholder={'input password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                >
                    Password
                </CustomInput>
                <ForgotPassword/>
                <CustomButton styles={'w-full'} title={'Sign In'} type={'submit'}/>
            </form>
        </div>
    );
};
export default LoginForm;
