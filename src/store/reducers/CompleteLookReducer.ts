import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export enum Steps {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
}

export interface IState {
  step: Steps;
}

export const initialState: IState = {
  step: Steps.FIRST,
};

export const CompleteLookSlice = createSlice({
  name: 'completeLook',
  initialState,
  reducers: {
    setStep: (state: Draft<IState>, action: PayloadAction<Steps>) => {
      state.step = action.payload;
    },
    destroyStep: (state) => {
      state.step = Steps.FIRST;
    },
  },
});

export const { setStep, destroyStep } = CompleteLookSlice.actions;

export default CompleteLookSlice.reducer;
