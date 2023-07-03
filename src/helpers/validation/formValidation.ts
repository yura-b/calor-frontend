import * as yup from 'yup';
import { ValidationResult } from '@pages/autorization/signup/otherInfo/components/PasswordIdentifier.tsx';

const phoneNumberRegex = /^\+?\d{0,3}\s?(\(\d{1,4}\))?\s?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;

export const validationSchemaForLogin = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'ResetPassword should be of minimum 8 characters length')
    .required('ResetPassword is required'),
});
export const validationSchemaForSignUp = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});
export const validationSchemaForContactInfo = yup.object({
  firstName: yup
    .string()
    .min(3, 'First name should be of minimum 8 characters length')
    .required('First name is required'),
  secondName: yup
    .string()
    .min(3, 'First name should be of minimum 8 characters length')
    .required('Second name is required'),
  phoneNumber: yup.string().matches(phoneNumberRegex, 'Phone number is not valid').required('Phone number is required'),
});

export const oneUpperCaseValidation = (password: string) => {
  if (/[A-Z]/.test(password)) return ValidationResult.SUCCESS;

  return ValidationResult.ERROR;
};

export const minLengthValidation = (password: string, length: number) => {
  if (!password) return ValidationResult.OK;

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
