import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForPurchase } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';
import { useMediaQuery } from '@react-hook/media-query';

const Purchase: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
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
      className={`${styles.container} w-full  bg-custom-turquoise  mb-4  text-center pb-0 lg:flex lg:gap-12 lg:text-left lg:px-10 lg:pb-2`}
    >
      <h2 className={`${styles.header1} text-custom-red  lg:basis-[30%]`}>Get 5% Off Your First Purchase</h2>
      <p className={`${styles.body1} p-4  mt-4 lg:mt-0`}>
        Join the mailing list. Be the first to get content updates. And you’ll get 5% off your first purchase
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className={`mb-4 lg:basis-[40%] lg:-mt-4 ${!isLargeScreen ? 'bg-white' : ''} `}
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
