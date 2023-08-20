import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDetail: 'part01',
  selectedMaterial: 'leather',
  selectedColor: '',
  selectedModel: '',
};

const selectedShoePartsSlice = createSlice({
  name: 'selectedShoeParts',
  initialState,
  reducers: {
    setSelectedDetail: (state, action) => {
      state.selectedDetail = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
  },
});

export const {
  setSelectedDetail,
  setSelectedMaterial,
  setSelectedColor,
  setSelectedModel
} = selectedShoePartsSlice.actions;

export default selectedShoePartsSlice.reducer;
