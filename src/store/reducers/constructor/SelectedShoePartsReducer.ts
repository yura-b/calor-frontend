import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDetail: {
    part: 'part01',
    name: '',
  },
  selectedMaterial: 'leather',
  selectedColor: '',
  selectedModel: '',
  details: {},
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
      selectedShoePartsSlice.caseReducers.setDetails(state, action);
    },
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
    setDetails: (state, action) => {
      const detail = state.selectedDetail;
      const material = state.selectedMaterial;
      const color = state.selectedColor;
      const model = state.selectedModel;
      const parts = {
        [model]: {
          ...state.details[model],
          [detail.part]: {
            name: detail.name,
            material,
            color: color.name,
          },
        },
      };
      state.details = {
        ...state.details,
        ...parts,
      };
    },
  },
});

export const { setSelectedDetail, setSelectedMaterial, setSelectedColor, setSelectedModel, setDetails } =
  selectedShoePartsSlice.actions;

export default selectedShoePartsSlice.reducer;
