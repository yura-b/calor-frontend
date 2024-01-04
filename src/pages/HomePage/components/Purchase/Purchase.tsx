import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import { validationSchemaForPurchase } from '@/helpers/validation/formValidation.ts';
import { useFormik } from 'formik';
import { useMediaQuery } from '@react-hook/media-query';
import { subscribe } from '@/api/subscribe';
import Spinner from '@components/ui/Spinner';
import { HttpStatusCode } from 'axios';

const Purchase: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallerThan1600px = useMediaQuery('(max-width: 1600px)');
  const [subscribeResponse, setSubscribeResponse] = useState(null);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemaForPurchase,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await subscribe(values.email);
        if (response.status === HttpStatusCode.Ok) {
          setSubscribeResponse(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error?.response?.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className={`${styles.container} w-full  lg:bg-custom-turquoise   mb-6  text-center py-8 lg:flex lg:gap-4 lg:text-left lg:px-8 `}
    >
      <div
        className={`flex items-center justify-center ${
          isSmallerThan1600px ? 'flex-col basis-[60%]' : 'flex-row basis-[70%]'
        }`}
      >
        <h2 className={`${styles.header1} text-mint lg:text-custom-red  basis-[30%]`}>
          Get 5% Off Your First Purchase
        </h2>
        <p className={`${styles.body1} pt-4 lg:pt-0     basis-[70%]`}>
          Join our mailing list to receive a 5% discount on your first purchase and be the first to receive content
          updates.
        </p>
      </div>
      <div
        className={`m-auto pt-3 lg:pt-0 ${isSmallerThan1600px ? ' basis-[40%]' : 'flex-row basis-[30%]'}  ${
          !isLargeScreen ? 'bg-white' : ''
        } `}
      >
        {HttpStatusCode.Ok && subscribeResponse !== null && (
          <h1 className={`${styles.body1}`}>
            {' '}
            <b className="text-mint">You have successfully subscribed</b>{' '}
            <p>
              Please check <b>{formik.values.email}</b>
            </p>
          </h1>
        )}
        {isError && (
          <h1 className={`${styles.body1} `}>
            {' '}
            <b className="text-mint">{errorMessage}</b> <p>{formik.values.email}</p>
          </h1>
        )}
        {!isError && subscribeResponse == null && (
          <form
            onSubmit={formik.handleSubmit}
            className={`mx-auto max-w-[400px] lg:-mt-3 ${
              isSmallerThan1600px ? ' basis-[40%]' : 'flex-row basis-[30%]'
            }  ${!isLargeScreen ? 'bg-white' : ''} `}
          >
            <CustomInput
              id={'email'}
              name={'email'}
              placeholder={'Enter email'}
              value={formik.values.email}
              onChange={formik.handleChange}
              errorMessage={formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              disabled={isLoading}
            />
            <Button color="gray" type="submit" disabled={isLoading} className="relative">
              Subscribe
              {isLoading && <Spinner className="absolute left-[48%] top-[20%]" />}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Purchase;
