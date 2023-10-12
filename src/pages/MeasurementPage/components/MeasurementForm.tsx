import { FC, useState } from 'react';
import { useFormik } from 'formik';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { validationMeasurement } from '@/helpers/validation/formValidation.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setUserMeasurement } from '@/store/reducers/UserMeasurement';
import { useMutation, useQuery } from 'react-query';
import { addToBasket } from '@/api/basket';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { useParams, useNavigate } from 'react-router-dom';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { getProductById } from '@/api/products';
import { v4 as uuidv4 } from 'uuid';
import CustomTextArea from '@/components/ui/TextArea/CustomTextArea';
import { addToCartGTMEvent } from '@/helpers/functions/gtm';
interface IProps {
  selectedShoeSize: number;
}

const MeasurementForm: FC<IProps> = ({ selectedShoeSize }) => {
  const { id, model } = useParams();

  const { data: product } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { details } = useSelector((state) => state.selectedShoeParts);
  const constructorImage = useSelector((state) => state.constructorImage);
  const measurement = useSelector((state) => state.userMeasurement);

  const [isDisabled, setIsDisabled] = useState(false);

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      setIsDisabled(false);
      dispatch(showMessage('The product has been successfully added'));
      navigate('complete_your_look');
    },
  });

  const selectedDetails = details[model];

  const formik = useFormik({
    initialValues: {
      rightFootLength: measurement.rightFootLength || '',
      rightFootWidth: measurement.rightFootWidth || '',
      leftFootLength: measurement.leftFootLength || '',
      leftFootWidth: measurement.leftFootWidth || '',
      insoleLength: measurement.insoleLength || '',
      insoleWidth: measurement.insoleWidth || '',
      comment: measurement.comment || '',
    },
    validationSchema: validationMeasurement,
    onSubmit: (values) => {
      setIsDisabled(true);
      dispatch(setUserMeasurement({ selectedShoeSize, ...values }));
      addToCartGTMEvent('add_to_cart', { id, title: product?.data?.title });

      let requestData = {};

      if (userId) {
        requestData = {
          product: id,
          count: 1,
          photo: constructorImage,
          measurement: { size: selectedShoeSize, ...values },
          details: selectedDetails,
          basketItemId: uuidv4(),
        };
      } else {
        requestData = {
          _id: id,
          title: product?.data?.title,
          price: product?.data?.price,
          category: product?.data?.category,
          count: 1,
          photos: [constructorImage],
          measurement: { size: selectedShoeSize, ...values },
          details: selectedDetails,
        };
      }
      if (userId) {
        mutation.mutate({ userId, requestData });
      } else {
        dispatch(addToCartNonRegisterUser(requestData));
        dispatch(showMessage('The product has been successfully added'));
        setIsDisabled(false);
        navigate('complete_your_look');
      }
    },
  });

  const validatePositiveNumber = (value) => {
    return value < 0 ? 0 : value;
  };

  return (
    <form onSubmit={formik.handleSubmit} className={'mb-4 w-full'}>
      <CustomInput
        id={'rightFootLength'}
        type={InputType.number}
        name={'rightFootLength'}
        placeholder={'Input Length'}
        value={formik.values.rightFootLength || measurement.rightFootLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('rightFootLength', newValue);
        }}
        error={formik.touched.rightFootLength && Boolean(formik.errors.rightFootLength)}
        errorMessage={formik.errors.rightFootLength}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Right Foot Length (in)
      </CustomInput>
      <CustomInput
        id={'rightFootWidth'}
        type={InputType.number}
        name={'rightFootWidth'}
        placeholder={'Input Width'}
        value={formik.values.rightFootWidth || measurement.rightFootWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('rightFootWidth', newValue);
        }}
        error={formik.touched.rightFootWidth && Boolean(formik.errors.rightFootWidth)}
        errorMessage={formik.errors.rightFootWidth}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Right Foot Width (in)
      </CustomInput>
      <CustomInput
        id={'leftFootLength'}
        type={InputType.number}
        name={'leftFootLength'}
        placeholder={'Input Length'}
        value={formik.values.leftFootLength || measurement.leftFootLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('leftFootLength', newValue);
        }}
        error={formik.touched.leftFootLength && Boolean(formik.errors.leftFootLength)}
        errorMessage={formik.errors.leftFootLength}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Left Foot Length (in)
      </CustomInput>
      <CustomInput
        id={'leftFootWidth'}
        type={InputType.number}
        name={'leftFootWidth'}
        placeholder={'Input Width'}
        value={formik.values.leftFootWidth || measurement.leftFootWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('leftFootWidth', newValue);
        }}
        error={formik.touched.leftFootWidth && Boolean(formik.errors.leftFootWidth)}
        errorMessage={formik.errors.leftFootWidth}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Left Foot Width (in)
      </CustomInput>
      <p className="mb-2">
        Please, find your most comfortable shoe similar to the shoe type you created and take out the insole (if it's
        removable), and measure it
      </p>
      <CustomInput
        id={'insoleLength'}
        type={InputType.number}
        name={'insoleLength'}
        placeholder={'Input Width'}
        value={formik.values.insoleLength || measurement.insoleLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('insoleLength', newValue);
        }}
        error={formik.touched.insoleLength && Boolean(formik.errors.insoleLength)}
        errorMessage={formik.errors.insoleLength}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Insole Length (in)
      </CustomInput>
      <CustomInput
        id={'insoleWidth'}
        type={InputType.number}
        name={'insoleWidth'}
        placeholder={'Input Width'}
        value={formik.values.insoleWidth || measurement.insoleWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('insoleWidth', newValue);
        }}
        error={formik.touched.insoleWidth && Boolean(formik.errors.insoleWidth)}
        errorMessage={formik.errors.insoleWidth}
        gap="1"
        border={'1px solid #D9D9D9'}
      >
        Insole Width (in)
      </CustomInput>
      <p className="mb-2">
        If you have any questions, please, leave a comment, contact us by chat or any other available communication
        option.
      </p>
      <CustomTextArea
        className="mt-4 mb-8"
        placeholder="Comment"
        variant="soft"
        height={4}
        id={'comment'}
        name={'comment'}
        defaultValue={formik.values.comment || ''}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('comment', newValue);
        }}
      />
      <CustomButton
        id="gtm-add-to-cart-product"
        styles={'w-full'}
        title={'Add to cart'}
        type={'submit'}
        disabled={isDisabled}
      />
    </form>
  );
};

export default MeasurementForm;
