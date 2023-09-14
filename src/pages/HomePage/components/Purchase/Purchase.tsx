import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForPurchase } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';
import { useMediaQuery } from '@react-hook/media-query';

const Purchase: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallerThan1600px = useMediaQuery('(max-width: 1600px)');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemaForPurchase,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div
      className={`${styles.container} w-full  lg:bg-custom-turquoise  mb-4  text-center pb-0 lg:flex lg:gap-12 lg:text-left lg:px-10 lg:pb-2`}
    >
      <div className={`flex ${isSmallerThan1600px ? 'flex-col basis-[60%]' : 'flex-row basis-[70%]'}`}>
        <h2 className={`${styles.header1} text-mint lg:text-custom-red  basis-[30%]`}>
          Get 5% Off Your First Purchase
        </h2>
        <p className={`${styles.body1} p-4 pl-0   lg:mt-0 basis-[70%]`}>
          Join our mailing list to receive a 5% discount on your first purchase and be the first to receive content
          updates.
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={`mb-4  lg:-mt-4 ${isSmallerThan1600px ? ' basis-[40%]' : 'flex-row basis-[30%]'}  ${
          !isLargeScreen ? 'bg-white' : ''
        } `}
      >
        <CustomInput
          id={'email'}
          name={'email'}
          placeholder={'Enter email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          errorMessage={formik.errors.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Button color="gray" type="submit">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default Purchase;
