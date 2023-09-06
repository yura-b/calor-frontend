import React, { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import shoeModel1 from '@assets/cartImages/shoeModel1.svg';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CustomInput from '@/components/input/CustomInput';
import { useFormik } from 'formik';
import { PostReviewDto } from '@/api/dto/review/postReview.dto';
import CustomButton from '@/components/button/CustomButton';
import { createReview, editReview } from '@/api/reviews';
import Link from '@mui/material/Link';
import CustomUploadPhoto from '@/pages/AccountPage/components/Reviews/CustomUploadPhoto';
import ReviewHeader from './ReviewHeader';
import { useAppSelector } from '@/store/hooks/hooks';
import { useMutation } from 'react-query';
import { uploadEventPhoto } from '@/api/manager/pages';
import { validationSchemaForCreateReview } from '@/helpers/validation/formValidation';
import { getProductById } from '@/api/products';
import { ProductsDto } from '@/api/dto/products.dto';
import conditions from '../../../public/Terms and Conditions_CALOR.pdf';

interface Props {
  title: string;
  productId?: string | null;
  review?: PostReviewDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const Review: React.FC<Props> = ({ onClose, onSuccess, title, review, productId }): React.ReactElement => {
  const { userId } = useAppSelector((state) => state.user);
  const [product, setProduct] = useState<ProductsDto | null>(null);

  const addUserReview = useMutation((newReview: PostReviewDto) => createReview(newReview), {
    onSuccess: () => {
      onClose();
      onSuccess();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((res) => {
        if (res) {
          setProduct(res.data);
        }
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      product_id: productId || review?.product_id || '',
      user_id: review?.user_id || userId,
      rating: product?.rating || review?.rating || 0,
      experience: review?.experience || '',
      email: review?.email || '',
      photo: '',
      firstName: review?.firstName || '',
      secondName: review?.secondName || '',
    } as Omit<PostReviewDto, 'status' | 'date' | '_id' | 'price' | 'category' | 'productName'>,
    validationSchema: validationSchemaForCreateReview,
    onSubmit: (values) => {
      if (!values.experience.length) {
        formik.setFieldError('experience', 'Experience is required');
      } else if (!values.rating) {
        formik.setFieldError('rating', 'Rating is required');
      } else if (Boolean(review) && review?._id) {
        addUserReview.mutate(values);
      } else {
        addUserReview.mutate(values);
      }
    },
  });

  const handleSelectFile = (selectedFile) => {
    if (selectedFile) {
      uploadEventPhoto(selectedFile).then((res) => {
        formik.setFieldValue('photo', res.data.url);
      });
    }
  };

  return (
    <>
      <div className="font-poppins  h-full flex flex-col">
        <div className="flex-1 overflow-y-auto md:my-0">
          <ReviewHeader title={title} onClose={onClose} />
          <form onSubmit={formik.handleSubmit} className={'w-full '}>
            <div className="p-4">
              <div className="lg:flex lg:justify-between lg:w-full">
                <div className="lg:w-1/2 lg:p-4">
                  <div className="flex">
                    <img
                      src={shoeModel1}
                      className="object-contain object-cover w-[120px] h-auto sm:w-[140px] md:w-[160px] lg:w-[140px] lg:transform "
                    />
                    <h4 className={`${styles.subtitle} text-gray ml-5 mt-2 `}>{product?.title}</h4>
                  </div>
                  <h2 className={'font-bold'}>Rate This Product*</h2>

                  <span className={`${styles.body2} block mb-1 text-xs`}>Please Select</span>
                  <Rating
                    name="half-rating"
                    defaultValue={formik.values.rating}
                    precision={1}
                    size="large"
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('rating', newValue);
                    }}
                  />
                  {formik.touched.rating && Boolean(formik.errors.rating) && (
                    <p className={'text-custom-red'}>{formik.errors.rating}</p>
                  )}
                  <h2 className={'font-bold'}>Share Your Impressions*</h2>
                  <span className={`${styles.body2} block mb-1 text-xs`}>
                    Tell others more about the product, its quality, and the comfort of use.
                  </span>
                  <TextareaAutosize
                    className="w-full"
                    minRows={3}
                    id={'experience'}
                    name={'experience'}
                    placeholder={'Your Review'}
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                  />
                  {Boolean(formik.errors.experience) && <p className={'text-custom-red'}>{formik.errors.experience}</p>}
                </div>
                <div className="lg:w-1/2 lg:p-4">
                  <h2 className={'font-bold mt-2 mb-3'}>Your Information</h2>
                  <CustomInput
                    id={'firstName'}
                    name={'firstName'}
                    placeholder={'James'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    errorMessage={formik.errors.firstName}
                    border={'1px solid #D9D9D9'}
                  >
                    First Name
                  </CustomInput>
                  <CustomInput
                    id={'secondName'}
                    name={'secondName'}
                    placeholder={'e.g James'}
                    value={formik.values.secondName}
                    onChange={formik.handleChange}
                    error={formik.touched.secondName && Boolean(formik.errors.secondName)}
                    errorMessage={formik.errors.secondName}
                    border={'1px solid #D9D9D9'}
                  >
                    Last Name
                  </CustomInput>
                  <CustomInput
                    id={'email'}
                    name={'email'}
                    placeholder={'wilson@gmail.com'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    errorMessage={formik.errors.email}
                    border={'1px solid #D9D9D9'}
                  >
                    Email
                  </CustomInput>
                  <div className="mb-4 text-xs">
                    By submitting a review you agree to our&nbsp;
                    <a href={conditions} target="_blank" className="underline hover:font-bold">
                      Terms and Conditions
                    </a>
                  </div>
                  <div className="mb-4">
                    <CustomUploadPhoto handler={handleSelectFile} />
                  </div>
                  <CustomButton styles={'w-full mt-4'} title={'Submit Review'} type={'submit'} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
