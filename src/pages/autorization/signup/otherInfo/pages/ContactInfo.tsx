import React from 'react';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useFormik } from 'formik';
import { validationSchemaForContactInfo } from '@/helpers/validation/formValidation.ts';
import { setFirstName, setPhoneNumber, setSecondName, setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';
import AlreadyRegistered from '@pages/autorization/signup/otherInfo/components/AlreadyRegistered.tsx';

const ContactInfo = () => {
  const dispatch = useAppDispatch();
  const { firstName, secondName, phoneNumber } = useAppSelector((state) => state.registration);
  const formik = useFormik({
    initialValues: {
      firstName,
      secondName,
      phoneNumber,
    },
    validationSchema: validationSchemaForContactInfo,
    onSubmit: (values) => {
      dispatch(setStep(Steps.THIRD));

      dispatch(setFirstName(values.firstName));

      dispatch(setSecondName(values.secondName));

      dispatch(setPhoneNumber(values.phoneNumber));
    },
  });
  return (
    <div className={'flex flex-col p-5 w-full items-center max-w-2xl'}>
      <form onSubmit={formik.handleSubmit} className={'w-full'}>
        <CustomInput
          id={'firstName'}
          name={'firstName'}
          placeholder={'e.g James'}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          errorMessage={formik.errors.firstName}
          border={'1px solid #D9D9D9'}
        >
          First Name
        </CustomInput>
        <CustomInput
          id={'secondName'}
          name={'secondName'}
          placeholder={'e.g James'}
          value={formik.values.secondName}
          onChange={formik.handleChange}
          error={formik.touched.secondName && Boolean(formik.errors.secondName)}
          errorMessage={formik.errors.secondName}
          border={'1px solid #D9D9D9'}
        >
          Last Name
        </CustomInput>

        <CustomInput
          id={'phoneNumber'}
          name={'phoneNumber'}
          placeholder={'e.g.   +1 (555) 555-5555'}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          errorMessage={formik.errors.phoneNumber}
          border={'1px solid #D9D9D9'}
          description={'Your phone number is needed to contact you for shipping-related questions'}
        >
          Phone number
        </CustomInput>

        <CustomButton styles={'w-full'} title={'Continue'} type={'submit'} />
        <AlreadyRegistered />
      </form>
    </div>
  );
};

export default ContactInfo;
