import React, { FC, useState } from 'react';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { useFormik } from 'formik';
import { ShippingInfoDto } from '@/api/dto/orders.dto.ts';
import CountryAutoComplete from '@pages/CheckoutPage/components/CountryAutoComplete.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import { validationSchemaForShippingInfo } from '@/helpers/validation/formValidation.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { shippingDetails } from '@/constants/interfaces/order.ts';
import { countries } from '@/helpers/admin/constants/countries.ts';
import { states } from '@/helpers/admin/constants/states.ts';

interface IProps {
  setData: React.Dispatch<React.SetStateAction<shippingForm | null>>;
  buttonTitle: string;
  shippingData: shippingForm | null;
}

export type shippingForm = Omit<ShippingInfoDto, 'user_id'>;

const USA = 'United States';

const ShippingInformation: FC<IProps> = ({ setData, buttonTitle }) => {
  const [saveAddress, setSaveAddress] = useState(false);
  const [country, setCountry] = useState(USA);

  // if selected country === USA
  const [stateValue, setStateValue] = useState('Texas');

  const { shippingInfo } = useAppSelector((state) => state.user);

  const initialValues = {
    city: '',
    streetAddress: '',
    receiverFirstName: '',
    receiverSecondName: '',
    ZIP: 0,
    ASB: '',
    state: '',
    receiverPhoneNumber: '',
  } as Omit<ShippingInfoDto, 'user_id' | 'save'>;

  if (shippingInfo || typeof shippingInfo === 'object') {
    initialValues.receiverFirstName = (shippingInfo as shippingDetails)?.receiverFirstName;
    initialValues.receiverSecondName = (shippingInfo as shippingDetails)?.receiverSecondName;
    initialValues.city = (shippingInfo as shippingDetails)?.city;
    initialValues.streetAddress = (shippingInfo as shippingDetails)?.streetAddress;
    initialValues.state = (shippingInfo as shippingDetails)?.state;
    initialValues.country = (shippingInfo as shippingDetails)?.country;
    initialValues.ZIP = Number((shippingInfo as shippingDetails)?.ZIP);
    initialValues.ASB = (shippingInfo as shippingDetails)?.ASB;
    initialValues.receiverPhoneNumber = (shippingInfo as shippingDetails)?.receiverPhoneNumber;
  }

  const formik = useFormik({
    validationSchema: validationSchemaForShippingInfo,
    initialValues: initialValues,
    onSubmit: (values) => {
      setData({
        ...values,
        country,
        save: saveAddress,
        state: country === USA ? stateValue : values.city,
      });
    },
  });

  return (
    <div className={'flex flex-col p-5 w-full items-center'}>
      <div className={'flex flex-col flex-start w-full'}>
        <h2 className={'text-xl my-4 font-bold'}>Shipping Information</h2>
        <h2 className={'mb-5'}>This product is custom-made and shipped to you in 7-10 days.</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className={'w-full'}>
        <CustomInput
          id={'receiverFirstName'}
          name={'receiverFirstName'}
          placeholder={'input first name'}
          value={formik.values.receiverFirstName}
          onChange={formik.handleChange}
          error={formik.touched.receiverFirstName && Boolean(formik.errors.receiverFirstName)}
          errorMessage={formik.errors.receiverFirstName}
          border={'1px solid #D9D9D9'}
        >
          First Name
        </CustomInput>
        <CustomInput
          id={'receiverSecondName'}
          name={'receiverSecondName'}
          placeholder={'e.g James'}
          value={formik.values.receiverSecondName}
          onChange={formik.handleChange}
          error={formik.touched.receiverSecondName && Boolean(formik.errors.receiverSecondName)}
          errorMessage={formik.errors.receiverSecondName}
          border={'1px solid #D9D9D9'}
        >
          Last Name
        </CustomInput>

        <div className={'mb-4'}>
          <p className={'font-bold'}>Country/Region</p>
          <CountryAutoComplete id="country" handler={setCountry} value={country} arr={countries} />
        </div>

        <CustomInput
          id={'streetAddress'}
          name={'streetAddress'}
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
          errorMessage={formik.errors.streetAddress}
          border={'1px solid #D9D9D9'}
        >
          Street Address
        </CustomInput>
        <CustomInput
          id={'ASB'}
          name={'ASB'}
          placeholder={'e.g 111'}
          value={formik.values.ASB}
          onChange={formik.handleChange}
          error={formik.touched.ASB && Boolean(formik.errors.ASB)}
          errorMessage={formik.errors.ASB}
          border={'1px solid #D9D9D9'}
        >
          Apt, Suite, Building
        </CustomInput>
        <CustomInput
          id={'city'}
          name={'city'}
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          errorMessage={formik.errors.city}
          border={'1px solid #D9D9D9'}
        >
          City
        </CustomInput>
        {country === USA ? (
          <div className={'mb-4'}>
            <p className={'font-bold'}>State</p>
            <CountryAutoComplete id="state" handler={setStateValue} value={stateValue} arr={states} />
          </div>
        ) : (
          <CustomInput
            id={'state'}
            name={'state'}
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            errorMessage={formik.errors.state}
            border={'1px solid #D9D9D9'}
          >
            State
          </CustomInput>
        )}
        <CustomInput
          id={'ZIP'}
          name={'ZIP'}
          type={InputType.number}
          value={formik.values.ZIP}
          onChange={formik.handleChange}
          error={formik.touched.ZIP && Boolean(formik.errors.ZIP)}
          errorMessage={formik.errors.ZIP}
          border={'1px solid #D9D9D9'}
        >
          ZIP Code
        </CustomInput>

        <CustomInput
          id={'receiverPhoneNumber'}
          name={'receiverPhoneNumber'}
          placeholder={'e.g.   +1 (555) 555-5555'}
          value={formik.values.receiverPhoneNumber}
          onChange={formik.handleChange}
          error={formik.touched.receiverPhoneNumber && Boolean(formik.errors.receiverPhoneNumber)}
          errorMessage={formik.errors.receiverPhoneNumber}
          border={'1px solid #D9D9D9'}
          description={'Your phone number is needed to contact you for shipping-related questions'}
        >
          Phone number
        </CustomInput>

        <div className={'flex flex-row justify-start gap-3 mb-6'}>
          <ToggleButton
            value="check"
            selected={saveAddress}
            onChange={() => setSaveAddress((prevState) => !prevState)}
            style={{
              // background: saveAddress ? '#1EC1AA' : '', // Example background color change based on selection
              height: '25px',
              width: '25px',
            }}
          >
            <CheckIcon />
          </ToggleButton>
          <p className={'text-sm'}>Save the shipping address for future orders</p>
        </div>

        <CustomButton styles={'w-full'} title={buttonTitle} type={'submit'} />
      </form>
    </div>
  );
};

export default ShippingInformation;
