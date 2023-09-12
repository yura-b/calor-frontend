import React from 'react';
import AuthorizationHeader from '@pages/autorization/components/header/AuthorizationHeader.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import AlreadyRegistered from '@pages/autorization/signup/otherInfo/components/AlreadyRegistered.tsx';
import { useFormik } from 'formik';
import { validationSchemaForSignUp } from '@/helpers/validation/formValidation.ts';
import { sendEmailForReset } from '@/api/authorization.ts';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';
import CustomizedSnackbars from '@components/admin/CustomizedSnackbars.tsx';

const Email = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemaForSignUp,
    onSubmit: ({ email }) => {
      sendEmailForReset(email).then(() => {
        dispatch(showMessage('Letter was sent to your email'));
      });
    },
  });
  return (
    <div>
      <AuthorizationHeader />
      <div className={'flex flex-col p-5 mt-16'}>
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

          <CustomButton styles={'w-full'} title={'Submit'} type={'submit'} />
          <AlreadyRegistered />
        </form>
      </div>
      <CustomizedSnackbars />
    </div>
  );
};

export default Email;
