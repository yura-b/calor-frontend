import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDetail: 'part01',
  selectedMaterial: 'leather',
  selectedColor: '',
};

const activeShoePartsSlice = createSlice({
  name: 'activeShoeParts',
  initialState,
  reducers: {
    setSelectedDetail: (state, action) => {
      state.selectedDetail = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
    setSelectedColor: (state, action) => {
      console.log(action.payload)
      state.selectedColor = action.payload;
    },
  },
});

export const {
  setSelectedDetail,
  setSelectedMaterial,
  setSelectedColor,
} = activeShoePartsSlice.actions;

export default activeShoePartsSlice.reducer;