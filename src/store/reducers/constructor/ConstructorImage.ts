import { createSlice } from '@reduxjs/toolkit';

const constructorImageSlice = createSlice({
  name: 'constructorImage',
  initialState: {},
  reducers: {
    setConsctructorImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setConsctructorImage } = constructorImageSlice.actions;

export default constructorImageSlice.reducer;
