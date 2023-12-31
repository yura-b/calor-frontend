import CustomInput from '@components/input/CustomInput.tsx';
import { useFormik } from 'formik';
import NavigationButtons from '@pages/autorization/components/navigationButtons/navigationButtons.tsx';
import ForgotPassword from '@pages/autorization/components/forgotPassword/forgotPassword.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { LoginDto } from '@/api/dto/login.dto.ts';
import { errorCorrupted, loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { login } from '@/api/authorization.ts';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { setUserData } from '@/store/reducers/UserReducer.ts';
import { validationSchemaForLogin } from '@/helpers/validation/formValidation.ts';
import { useState } from 'react';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const logInHandler = (values: LoginDto) => {
    dispatch(loading());
    login(values)
      .then((res) => {
        const response = res.data;
        dispatch(loadingFinished());
        dispatch(setUserData({ ...response, rememberMe }));
      })
      .catch((e) => {
        dispatch(errorCorrupted(e.response.data.message));
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaForLogin,
    onSubmit: (values) => {
      logInHandler(values);
    },
  });

  return (
    <div className={'p-5 bg-custom-turquoise w-full'}>
      <div className={'flex flex-col max-w-2xl relative mx-auto'}>
        <NavigationButtons isLogin={true} />

        <form onSubmit={formik.handleSubmit} className={'mb-4 w-full'}>
          <CustomInput
            id={'email'}
            name={'email'}
            placeholder={'input email'}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            errorMessage={formik.errors.email}
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
            errorMessage={formik.errors.password}
          >
            Password
          </CustomInput>
          <ForgotPassword setRememberMe={setRememberMe} />
          <CustomButton styles={'w-full'} title={'Sign In'} type={'submit'} />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
