import { createSlice } from '@reduxjs/toolkit';

const userMeasurementSlice = createSlice({
  name: 'userMeasurement',
  initialState: {},
  reducers: {
    setUserMeasurement: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserMeasurement } = userMeasurementSlice.actions;

export default userMeasurementSlice.reducer;
