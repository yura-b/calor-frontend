import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useFormik } from 'formik';
import { validationSchemaForContactInfo } from '@/helpers/validation/formValidation.ts';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';
import { CheckoutSteps, setCheckoutStep, setContactInfo } from '@/store/reducers/CheckoutReducer.ts';
import { useGetUserIfRefresh } from '@/hooks/getUserIfRefresh.ts';

const ContactInformation = () => {
  const { access_token, firstName, secondName, phoneNumber, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const getUser = useGetUserIfRefresh();
  useEffect(() => {
    getUser();
  }, []);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      secondName: secondName,
      phoneNumber: phoneNumber,
      email: email,
    },
    validationSchema: validationSchemaForContactInfo,
    onSubmit: (values) => {
      dispatch(setContactInfo(values));
      dispatch(setCheckoutStep(CheckoutSteps.SECOND));
    },
  });

  useEffect(() => {
    formik.setValues({
      email: email,
      firstName: firstName,
      secondName: secondName,
      phoneNumber: phoneNumber,
    });
  }, [email, firstName, secondName, phoneNumber]);

  return (
    <div className={'flex flex-col py-5 w-full items-center '}>
      <div className={'flex flex-col flex-start w-full'}>
        <h2 className={'text-xl my-4 font-bold'}>Contact Information</h2>
        {!access_token && (
          <div className="flex flex-row justify-between mb-5">
            Sign In and checkout faster
            <span
              onClick={() => {
                navigate('/login');
              }}
              className={'underline cursor-pointer text-mint'}
            >
              Sign In
            </span>
          </div>
        )}
      </div>
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

        <CustomButton styles={'w-full'} title={'Continue'} type={'submit'} />
      </form>
    </div>
  );
};

export default ContactInformation;
