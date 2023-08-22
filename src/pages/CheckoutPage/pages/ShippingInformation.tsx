import React, {FC, useState} from 'react';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import {useFormik} from 'formik';
import {ShippingInfoDto} from '@/api/dto/orders.dto.ts';
import CountryAutoComplete from '@pages/CheckoutPage/components/CountryAutoComplete.tsx';
import {InputType} from '@/constants/interfaces/inputTypes.ts';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import {validationSchemaForShippingInfo} from '@/helpers/validation/formValidation.ts';

interface IProps {
    setData: React.Dispatch<React.SetStateAction<shippingForm | null>>,
    buttonTitle: string
}

export type shippingForm = Omit<ShippingInfoDto, 'user_id'>

const ShippingInformation: FC<IProps> = ({setData, buttonTitle}) => {

    const [saveAddress, setSaveAddress] = useState(false)
    const [country, setCountry] = useState('United States')

    const formik = useFormik({
        validationSchema: validationSchemaForShippingInfo,
        initialValues: {
            city: '',
            streetAddress: '',
            receiverFirstName: '',
            receiverSecondName: '',
            ZIP: 0,
            ASB: '',
            state: '',
            receiverPhoneNumber: ''
        } as Omit<ShippingInfoDto, 'country' | 'user_id' | 'save'>,
        onSubmit: (values) => {
            // console.log(values)
            setData({
                ...values,
                country,
                save: saveAddress
            })

        },
    });


    return (
        <div className={'flex flex-col p-5 w-full items-center'}>
            <div className={'flex flex-col flex-start w-full'}>
                <h2 className={'text-xl my-4 font-bold'}>Shipping Information</h2>
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
                    Second Name
                </CustomInput>

                <div className={'mb-4'}>
                    <p className={'font-bold'}>Country/Region</p>
                    <CountryAutoComplete
                        id="country"
                        handler={setCountry}
                        value={country}
                    />
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
                        onChange={() => setSaveAddress(prevState => !prevState)}
                        style={{
                            // background: saveAddress ? '#1EC1AA' : '', // Example background color change based on selection
                            height: '25px',
                            width: '25px',
                        }}
                    >
                        <CheckIcon/>
                    </ToggleButton>
                    <p className={'text-sm'}>Save the shipping address for future orders</p>
                </div>

                <CustomButton styles={'w-full'} title={buttonTitle} type={'submit'}/>
            </form>
        </div>
    );
};

export default ShippingInformation;
