import { useState } from 'react';
import CustomModal from "@components/ui/Modal/CustomModal";
import CustomButton from '@components/ui/Button';
import Rating from '@components/ui/Rating/Rating';
import CustomTextArea from '@/components/ui/TextArea/CustomTextArea';
import CustomInput from '@/components/ui/Input/CustomInput';
import { useFormik, Form } from 'formik';
import { validationSchemaForProductReview } from '@/helpers/validation/formValidation.ts';
import FileUpload from '@/components/ui/FileUpload/FileUpload'

const WriteReviewModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      image: null,
    },
    
    onSubmit: (values) => {
      console.log(values)
    },
  });


  return (
    <>
      <CustomButton color="gray" onClick={handleOpen}>Write the review</CustomButton>
      <CustomModal open={open} handleClose={handleClose}>
        {/* HEAD */}
        <div className="flex flex-row w-full h-[70px] bg-custom-turquoise p-3 justify-center">
          <div className="flex items-center">
            <span>Your Review</span>
          </div>
        </div>
        {/* BODY */}
        <div className="flex flex-col md:flex-row w-full py-6 px-6 md:gap-8 gap-0 h-full">
          <div className="flex flex-col md:w-1/2 flex-1">
            {/* TITLE */}
            <div className="flex flex-row">
              <div className="flex w-1/3">
                <span>Img</span>
              </div>
              <div className="flex w-full">
                <span>Sunrise</span>
              </div>
            </div>
            {/* RATE PRODUCT */}
            <div>
              <h3>Rate this product</h3>
              <span>Please select</span>
              <Rating includeTitle={false} readOnly={false} />
            </div>
            {/* IMPRESSIONS */}
            <div>
              <h3>Share Your Impressions</h3>
              <span>Tell others more about the product, its quality, and the comfort of use.</span>
              <div>
                <CustomTextArea placeholder={"Your Review"} variant={"outlined"} height={3} />
              </div>
            </div>
          </div>
          {/* INFORMATION */}
          <div className="flex flex-col md:w-1/2 flex-1">
            <h3>Your infirmation</h3>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                id="firstName"
                label="First Name"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                errorMessage={formik.errors.firstName}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              />
              <CustomInput
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                errorMessage={formik.errors.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              />
              <CustomInput
                id={'email'}
                label="Email"
                name={'email'}
                placeholder={'Enter email'}
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <div>
                <span>
                  By submitting a review you agree to our Terms and Condotion
                </span>
              </div>
              <div className="flex flex-col gap-3 items-center mt-3">
                <FileUpload
                  data={formik.values.image || {}}
                  errors={formik.errors}
                  setFieldValue={formik.setFieldValue}
                />
                <CustomButton disabled={!formik.isValid || (formik.values.image ? false : true)} onClick={formik.handleSubmit} color="gray">Submit</CustomButton>
              </div>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default WriteReviewModal;