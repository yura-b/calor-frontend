import { FC, useState } from 'react';
import { useFormik } from 'formik';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { validationMeasurement } from '@/helpers/validation/formValidation.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setUserMeasurement } from '@/store/reducers/UserMeasurement';
import { useMutation } from 'react-query';
import { addToBasket } from '@/api/basket';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { useParams, useNavigate } from 'react-router-dom';
interface IProps {
  selectedShoeSize: number;
}

const MeasurementForm: FC<IProps> = ({ selectedShoeSize }) => {
  const { id, model } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { details } = useSelector((state) => state.selectedShoeParts);
  const constructorImage = useSelector((state) => state.constructorImage);

  const [isDisabled, setIsDisabled] = useState(false);

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      setIsDisabled(false);
      navigate('/');
    },
  });

  const selectedDetails = details[model];

  const formik = useFormik({
    initialValues: {
      rightFootLength: '',
      rightFootWidth: '',
      leftFootLength: '',
      leftFootWidth: '',
      insoleLength: '',
      insoleWidth: '',
    },
    validationSchema: validationMeasurement,
    onSubmit: (values) => {
      setIsDisabled(true);
      dispatch(setUserMeasurement({ selectedShoeSize, ...values }));

      let requestData = {};
      if (userId) {
        requestData = {
          product: id,
          count: 1,
          photo: constructorImage,
          measurement: { selectedShoeSize, ...values },
          details: [selectedDetails],
        };
      } else {
        requestData = {
          product: id,
          count: 1,
          photos: [constructorImage],
          measurement: { selectedShoeSize, ...values },
          details: [selectedDetails],
        };
      }

      if (userId) {
        mutation.mutate({ userId, requestData });
      } else {
        dispatch(addToCartNonRegisterUser(requestData));
        setIsDisabled(false);
        navigate('/');
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
        value={formik.values.rightFootLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('rightFootLength', newValue);
        }}
        error={formik.touched.rightFootLength && Boolean(formik.errors.rightFootLength)}
        errorMessage={formik.errors.rightFootLength}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
      >
        Right Foot Length (in)
      </CustomInput>
      <CustomInput
        id={'rightFootWidth'}
        type={InputType.number}
        name={'rightFootWidth'}
        placeholder={'Input Width'}
        value={formik.values.rightFootWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('rightFootWidth', newValue);
        }}
        error={formik.touched.rightFootWidth && Boolean(formik.errors.rightFootWidth)}
        errorMessage={formik.errors.rightFootWidth}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
      >
        Right Foot Width (in)
      </CustomInput>
      <CustomInput
        id={'leftFootLength'}
        type={InputType.number}
        name={'leftFootLength'}
        placeholder={'Input Length'}
        value={formik.values.leftFootLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('leftFootLength', newValue);
        }}
        error={formik.touched.leftFootLength && Boolean(formik.errors.leftFootLength)}
        errorMessage={formik.errors.leftFootLength}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
      >
        Left Foot Length (in)
      </CustomInput>
      <CustomInput
        id={'leftFootWidth'}
        type={InputType.number}
        name={'leftFootWidth'}
        placeholder={'Input Width'}
        value={formik.values.leftFootWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('leftFootWidth', newValue);
        }}
        error={formik.touched.leftFootWidth && Boolean(formik.errors.leftFootWidth)}
        errorMessage={formik.errors.leftFootWidth}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
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
        value={formik.values.insoleLength}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('insoleLength', newValue);
        }}
        error={formik.touched.insoleLength && Boolean(formik.errors.insoleLength)}
        errorMessage={formik.errors.insoleLength}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
      >
        Insole Length (in)
      </CustomInput>
      <CustomInput
        id={'insoleWidth'}
        type={InputType.number}
        name={'insoleWidth'}
        placeholder={'Input Width'}
        value={formik.values.insoleWidth}
        onChange={(e) => {
          const newValue = validatePositiveNumber(e.target.value);
          formik.setFieldValue('insoleWidth', newValue);
        }}
        error={formik.touched.insoleWidth && Boolean(formik.errors.insoleWidth)}
        errorMessage={formik.errors.insoleWidth}
        disableUnderline={true}
        border="1px solid"
        height="45px"
        gap="1"
      >
        Insole Width (in)
      </CustomInput>
      <p className="mb-2">
        If you have any questions, please, contact us by chat or any other available communication option.
      </p>
      <CustomButton styles={'w-full'} title={'Add to cart'} type={'submit'} disabled={isDisabled} />
    </form>
  );
};

export default MeasurementForm;
