import { } from 'react';
import { useFormik } from 'formik';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { validationMeasurement } from '@/helpers/validation/formValidation.ts';

const MeasurementForm = () => {

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

        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={'mb-4 w-full'}>
            <CustomInput
                id={'rightFootLength'}
                type={InputType.number}
                name={'rightFootLength'}
                placeholder={'Input Length'}
                value={formik.values.rightFootLength}
                onChange={formik.handleChange}
                error={formik.touched.rightFootLength && Boolean(formik.errors.rightFootLength)}
                errorMessage={formik.errors.rightFootLength}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Right Foot Length
            </CustomInput>
            <CustomInput
                id={'rightFootWidth'}
                type={InputType.number}
                name={'rightFootWidth'}
                placeholder={'Input Width'}
                value={formik.values.rightFootWidth}
                onChange={formik.handleChange}
                error={formik.touched.rightFootWidth && Boolean(formik.errors.rightFootWidth)}
                errorMessage={formik.errors.rightFootWidth}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Right Foot Width
            </CustomInput>
            <CustomInput
                id={'leftFootLength'}
                type={InputType.number}
                name={'leftFootLength'}
                placeholder={'Input Length'}
                value={formik.values.leftFootLength}
                onChange={formik.handleChange}
                error={formik.touched.leftFootLength && Boolean(formik.errors.leftFootLength)}
                errorMessage={formik.errors.leftFootLength}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Left Foot Length
            </CustomInput>
            <CustomInput
                id={'leftFootWidth'}
                type={InputType.number}
                name={'leftFootWidth'}
                placeholder={'Input Width'}
                value={formik.values.leftFootWidth}
                onChange={formik.handleChange}
                error={formik.touched.leftFootWidth && Boolean(formik.errors.leftFootWidth)}
                errorMessage={formik.errors.leftFootWidth}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Left Foot Width
            </CustomInput>
            <p className="mb-2">
                Please, find your most comfortable shoe similar to the shoe type you created and take out the insole (if it's removable), and measure it
            </p>
            <CustomInput
                id={'insoleLength'}
                type={InputType.number}
                name={'insoleLength'}
                placeholder={'Input Width'}
                value={formik.values.insoleLength}
                onChange={formik.handleChange}
                error={formik.touched.insoleLength && Boolean(formik.errors.insoleLength)}
                errorMessage={formik.errors.insoleLength}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Insole Length
            </CustomInput>
            <CustomInput
                id={'insoleWidth'}
                type={InputType.number}
                name={'insoleWidth'}
                placeholder={'Input Width'}
                value={formik.values.insoleWidth}
                onChange={formik.handleChange}
                error={formik.touched.insoleWidth && Boolean(formik.errors.insoleWidth)}
                errorMessage={formik.errors.insoleWidth}
                disableUnderline={true}
                border="1px solid"
                height="45px"
            >
                Insole Width
            </CustomInput>
            <p className="mb-2">
                If you have any questions, please, contact us by chat or any other available communication option.
            </p>
            <CustomButton styles={'w-full'} title={'Add to cart'} type={'submit'} />
        </form>
    )
}

export default MeasurementForm;
