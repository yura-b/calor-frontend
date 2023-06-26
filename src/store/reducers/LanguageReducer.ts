import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  [value: string]: string;
}

export interface ILanguage {
  title: string;
  en: string;
}

export const initialState: IState = {};

export const LanguageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<ILanguage[]>) => {
      action.payload.forEach((language) => {
        state[language.title] = language.en;
      });
    },
  },
});

export const { setLanguages } = LanguageSlice.actions;

export default LanguageSlice.reducer;
