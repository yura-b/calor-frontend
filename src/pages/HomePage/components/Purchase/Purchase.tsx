import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForPurchase } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';

const Purchase: React.FC = (): React.ReactElement => {
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
    <div className="w-full bg-white px-6 py-4">
      <h2 className={`${styles.header1} text-mint text-center`}>Get 5% Off Your First Purchase</h2>
      <p className={`${styles.body1} text-center mt-4`}>
        Join the mailing list. Be the first to get content updates. And you’ll get 5% off your first purchase
      </p>
      <form onSubmit={formik.handleSubmit} className={'mb-4'}>
        <CustomInput
          id={'email'}
          name={'email'}
          placeholder={'Enter email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          errormessage={formik.errors.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Button color="gray" className="w-full my-6" type="submit">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default Purchase;
