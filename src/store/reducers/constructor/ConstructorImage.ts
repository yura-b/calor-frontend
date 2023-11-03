import { createSlice } from '@reduxjs/toolkit';

const constructorImageSlice = createSlice({
  name: 'constructorImage',
  initialState: {},
  reducers: {
    setConsctructorImage: (state, action) => {
      localStorage.setItem('constructorImage', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setConsctructorImage } = constructorImageSlice.actions;

export default constructorImageSlice.reducer;
