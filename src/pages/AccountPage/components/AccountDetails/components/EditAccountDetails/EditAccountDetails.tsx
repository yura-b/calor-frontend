import React, { useState, useCallback } from 'react';
import MainFrame from '@/components/mainFrame';
import CustomInput from '@components/input/CustomInput.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { useFormik } from 'formik';
import { validationSchemaForUserAccount } from '@/helpers/validation/formValidation.ts';
import { Modal } from '@mui/material';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import X from '@assets/images/SignUpHeaderImg/X.png';
import { updateUserAccount } from '@/api/users';

const EditAccountDetails: React.FC = (): React.ReactElement => {
  const { access_token, secondName, firstName, email, phoneNumber } = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstName,
      secondName,
      email,
      phoneNumber,
    },
    validationSchema: validationSchemaForUserAccount,
    onSubmit: () => {},
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (values) => {
    try {
      const updatedData = {
        firstName: values.firstName,
        secondName: values.secondName,
        phoneNumber: values.phoneNumber,
      };
      if (access_token) {
        await updateUserAccount(access_token, updatedData);
        handleClose();
        window.location.reload();
      } else {
        console.error('Access token is null.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleClick = useCallback(() => {
    if (formik.isValid) {
      handleOpen();
    } else {
      console.log('Form is not valid. Modal will not be opened.');
    }
  }, [formik.isValid]);

  return (
    <MainFrame title={'Edit Account Details'} showCloseBtn={true}>
      <form onSubmit={formik.handleSubmit} className={`${styles.container} w-full`}>
        <div className="lg:flex gap-4 2xl:gap-20">
          <div className="basis-[48%] 2xl:basis-[40%]">
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
              Second Name
            </CustomInput>
          </div>
          <div className="basis-[48%] 2xl:basis-[40%]">
            <CustomInput
              id={'email'}
              name={'email'}
              placeholder={''}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
              border={'1px solid #D9D9D9'}
              disabled={true}
            >
              Email
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
              description="Your phone number is needed to contact you for shipping-related questions"
            >
              Phone number
            </CustomInput>
            <Button onClick={handleClick} color="gray" className="block m-auto">
              Save
            </Button>
          </div>
        </div>
        <Modal className="flex items-center justify-center mx-[12px]" open={open} onClose={handleClose}>
          <div className="bg-custom-turquoise lg:bg-white  shadow-lg w-full md:w-1/2 xl:w-1/3 ">
            <header className="hidden lg:flex bg-mint  flex-row  items-center  px-6  h-[60px] ">
              <h1 className={`${styles.header2} m-auto text-white uppercase`}>Account</h1>
              <img src={X} alt="Close" className="cursor-pointer w-5 h-5  brightness-0 invert" onClick={handleClose} />
            </header>
            <div className="px-8 py-14 text-center">
              <p className={`${styles.body1}`}>Save changes to your account?</p>
              <div className="w-full flex flex-col items-center justify-center mt-8 gap-8 md:flex-row md:gap-4">
                <Button color="gray" onClick={() => handleSubmit(formik.values)}>
                  Yes
                </Button>
                <Button onClick={handleClose} color="mintExtraLight">
                  No
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </MainFrame>
  );
};

export default EditAccountDetails;
