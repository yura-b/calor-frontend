import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { IPassword, setExceptionState } from '@/store/reducers/RegistrationReducer.ts';

export enum ValidationResult {
  ERROR,
  OK,
  SUCCESS,
}

interface IProps {
  text: string;
  handler: (password: string, length: number) => ValidationResult;
  property?: keyof IPassword;
  password?: string;
}

const PasswordIdentifier: React.FC<IProps> = ({ text, handler, property, password }) => {
  const dispatch = useAppDispatch();

  const { firstPassword } = useAppSelector((state) => state.registration);
  const passwordValues = password ? password : firstPassword.value;

  if (!handler) return;

  const result = handler(passwordValues, 8);

  let colorForCircle = '';
  let colorForText = '';

  if (result === ValidationResult.ERROR) {
    colorForCircle = 'bg-custom-red';
    colorForText = 'text-custom-red';
    {
      property && dispatch(setExceptionState({ property: property, value: false }));
    }
  }

  if (result === ValidationResult.SUCCESS) {
    {
      property && dispatch(setExceptionState({ property: property, value: true }));
    }
    colorForCircle = 'bg-mint';
    colorForText = 'text-mint';
  }

  if (result === ValidationResult.OK) {
    colorForCircle = 'bg-stone-500';
  }

  return (
    <div className={'flex flex-row w-full items-baseline'}>
      <div className={`h-2 w-2 rounded-full mr-8 ${colorForCircle}`}></div>
      <p className={colorForText}>{text}</p>
    </div>
  );
};

export default PasswordIdentifier;
