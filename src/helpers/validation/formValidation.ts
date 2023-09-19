import * as yup from 'yup';
import { ValidationResult } from '@pages/autorization/signup/otherInfo/components/PasswordIdentifier.tsx';

const phoneNumberRegex = /^\+?\d{0,3}\s?(\(\d{1,4}\))?\s?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;

export const validationSchemaForLogin = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'password should be of minimum 8 characters length').required('password is required'),
});
export const validationSchemaForSignUp = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});
export const validationSchemaForContactInfo = yup.object({
  firstName: yup
    .string()
    .min(3, 'First Name should be of minimum 3 characters length')
    .required('First Name is required'),
  secondName: yup
    .string()
    .min(3, 'Last Name should be of minimum 3 characters length')
    .required('Last Name is required'),
  phoneNumber: yup.string().matches(phoneNumberRegex, 'Phone number is not valid').required('Phone number is required'),
  email: yup.string().email('email is not valid'),
});

export const validationSchemaForCreateReview = yup.object({
  product_id: yup.string().required(),
  user_id: yup.string().required(),
  firstName: yup
    .string()
    .min(3, 'First Name should be of minimum 3 characters length')
    .required('First Name is required'),
  secondName: yup
    .string()
    .min(3, 'Last Name should be of minimum 3 characters length')
    .required('Last Name is required'),
  email: yup.string().email('Email is not valid').required('Email is required'),
});

export const validationSchemaForShippingInfo = yup.object({
  city: yup.string().required('city is required').min(2, 'city should have at least 2 characters'),
  streetAddress: yup.string().required('city is required').min(2, 'street address should have at least 2 characters'),
  ZIP: yup.number().required(),
  ASB: yup.string(),
  state: yup.string().min(2),
  receiverPhoneNumber: yup
    .string()
    .matches(phoneNumberRegex, 'Phone number is not valid')
    .required('Phone number is required'),
});

export const validationSchemaForCheckout = yup.object({
  city: yup.string(),
});

export const oneUpperCaseValidation = (password: string) => {
  if (/[A-Z]/.test(password)) return ValidationResult.SUCCESS;

  return ValidationResult.ERROR;
};

export const minLengthValidation = (password: string, length: number) => {
  // if (!password) return ValidationResult.OK;

  if (password.length >= length) return ValidationResult.SUCCESS;

  return ValidationResult.ERROR;
};
export const oneNumberValidation = (password: string, length: number) => {
  if (/[0-9]/.test(password)) return ValidationResult.SUCCESS;

  if (password.length === length) return ValidationResult.OK;

  return ValidationResult.ERROR;
};

export const oneLowerCaseValidation = (password: string) => {
  if (/[a-z]/.test(password)) return ValidationResult.SUCCESS;

  return ValidationResult.ERROR;
};

export const validationSchemaForPurchase = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

export const validationSchemaForOrderNumber = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  order_id: yup.number().required('Order Number is required'),
});

export const validationSchemaForPromoCode = yup.object({
  promoCode: yup
    .string()
    .min(3, 'Your promo code is not valid. Please enter  again')
    .required('Promo Code is required'),
});

export const validationSchemaForUserAccount = yup.object({
  firstName: yup
    .string()
    .min(3, 'First Name should be of minimum 3 characters length')
    .required('First Name is required'),
  secondName: yup
    .string()
    .min(3, 'Last Name should be of minimum 3 characters length')
    .required('Last Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phoneNumber: yup.string().matches(phoneNumberRegex, 'Phone number is not valid').required('Phone number is required'),
});

export const validationMeasurement = yup.object({
  rightFootLength: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
  rightFootWidth: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
  leftFootLength: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
  leftFootWidth: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
  insoleLength: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
  insoleWidth: yup
    .number()
    .min(1, 'Field must contain a minimum of 1 character')
    .required('This field is required')
    .moreThan(0, 'Size cannot be negative'),
});
