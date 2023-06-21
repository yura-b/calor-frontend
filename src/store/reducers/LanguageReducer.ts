import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  [value: string]: string;
}

export const initialState: IState = {};

export const LanguageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<IState>) => {
      state = action.payload;
    },
  },
});

export const { setLanguages } = LanguageSlice.actions;

export default LanguageSlice.reducer;
