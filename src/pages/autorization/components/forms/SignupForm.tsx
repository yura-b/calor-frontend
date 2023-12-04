import React from 'react';
import { useFormik } from 'formik';
import { validationSchemaForSignUp } from '@/helpers/validation/formValidation.ts';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setEmail, setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';
import AlreadyRegistered from '@pages/autorization/signup/otherInfo/components/AlreadyRegistered.tsx';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.registration);
  const formik = useFormik({
    initialValues: {
      email: email,
    },
    validationSchema: validationSchemaForSignUp,
    onSubmit: (values) => {
      dispatch(setStep(Steps.SECOND));
      dispatch(setEmail(values.email));
    },
  });

  return (
    <div className={'flex flex-col p-5 md:p-0 w-full items-center max-w-2xl'}>
      <p className={'mb-8'}>or</p>
      <form onSubmit={formik.handleSubmit} className={'w-full'}>
        <CustomInput
          id={'email'}
          name={'email'}
          placeholder={'input email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          errorMessage={formik.errors.email}
          border={'1px solid #D9D9D9'}
        >
          Email
        </CustomInput>

        <CustomButton styles={'w-full'} title={'Continue'} type={'submit'} />
        <AlreadyRegistered />
      </form>
    </div>
  );
};

export default SignupForm;
