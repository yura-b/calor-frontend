import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export enum Steps {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
  FOURTH = 3,
}
export interface IPassword {
  value: string;
  minLength: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
}
export interface IState {
  email: string;
  step: Steps;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  firstPassword: IPassword;
  secondPassword: string;
}

export interface ExceptionState {
  property: keyof IPassword;
  value: boolean;
}
export const initialState: IState = {
  email: '',
  step: Steps.FIRST,
  firstName: '',
  secondName: '',
  phoneNumber: '',
  firstPassword: {
    value: '',
    lowerCase: false,
    minLength: false,
    number: false,
    upperCase: false,
  },
  secondPassword: '',
};

export const RegistrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setEmail: (state: Draft<IState>, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setStep: (state:Draft<IState>, action: PayloadAction<Steps>) => {
      state.step = action.payload;
    },
    destroyStep: (state) => {
      state.step = Steps.FIRST;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setSecondName: (state, action: PayloadAction<string>) => {
      state.secondName = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setFirstPassword: (state, action: PayloadAction<string>) => {
      state.firstPassword.value = action.payload;
    },
    setSecondPassword: (state, action: PayloadAction<string>) => {
      state.secondPassword = action.payload;
    },
    setExceptionState: (state, action: PayloadAction<ExceptionState>) => {
      const payload = action.payload;
      if (payload.property === 'value') return;
      state.firstPassword[payload.property] = action.payload.value;
    },
  },
});

export const {
  setEmail,
  setStep,
  destroyStep,
  setPhoneNumber,
  setFirstName,
  setSecondName,
  setSecondPassword,
  setFirstPassword,
  setExceptionState,
} = RegistrationSlice.actions;

export default RegistrationSlice.reducer;
