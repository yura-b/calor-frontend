import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EStatus {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  OK = 'OK',
}

export interface IState {
  status: EStatus;
  message: string | null;
}

export const initialState: IState = {
  status: EStatus.OK,
  message: null,
};

export const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    loading: (state) => {
      state.status = EStatus.LOADING;
      state.message = null;
    },
    errorCorrupted: (state, action: PayloadAction<string>) => {
      state.status = EStatus.ERROR;
      state.message = action.payload;
    },
    loadingFinished: (state) => {
      state.status = EStatus.OK;
      state.message = null;
    },
    showMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
  },
});

export const { loading, loadingFinished, errorCorrupted, showMessage } = StatusSlice.actions;

export default StatusSlice.reducer;
