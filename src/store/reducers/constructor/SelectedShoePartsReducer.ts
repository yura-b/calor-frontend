import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDetail: {
    part: 'part01',
    name: '',
  },
  selectedMaterial: '',
  selectedColor: '',
  selectedModel: '',
  details: {
    dayger: {
      part01: {
        name: 'Sock',
        material: 'leather',
        color: 'Daisy White',
      },
      part02: {
        name: 'Quarter stripe 1',
        material: 'leather',
        color: 'Daisy White',
      },
      part03: {
        name: 'Laces',
        material: 'polyester',
        color: 'Daisy White',
      },
      part04: {
        name: 'Lower eyelets',
        material: 'metal',
        color: 'White',
      },
      part05: {
        name: 'Sole',
        material: 'sole',
        color: 'White',
      },
      part06: {
        name: 'Thread stitching',
        material: 'stitch',
        color: 'White',
      },
      part07: {
        name: 'Detail 1',
        material: 'leather',
        color: 'Daisy White',
      },
      part08: {
        name: 'Tongue',
        material: 'leather',
        color: 'Daisy White',
      },
      part09: {
        name: 'Lining',
        material: 'wool',
        color: '',
      },
      part10: {
        name: 'Detail 2',
        material: 'leather',
        color: 'Daisy White',
      },
      part11: {
        name: 'Quarter',
        material: 'leather',
        color: 'Daisy White',
      },
      part12: {
        name: 'Quarter stripe 2',
        material: 'leather',
        color: 'Daisy White',
      },
      part13: {
        name: 'Quarter stripe 3',
        material: 'leather',
        color: 'Daisy White',
      },
      part14: {
        name: 'Top eyelets',
        material: 'metal',
        color: 'White',
      },
    },
    sunrise: {
      part01: {
        name: 'Quarter',
        material: 'leather',
        color: 'Daisy White',
      },
      part02: {
        name: 'Tongue + toe',
        material: 'leather',
        color: 'Daisy White',
      },
      part03: {
        name: 'Back strap',
        material: 'leather',
        color: 'Daisy White',
      },
      part04: {
        name: 'Lace guard',
        material: 'leather',
        color: 'Daisy White',
      },
      part05: {
        name: 'Sole',
        material: 'sole',
        color: 'White',
      },
      part06: {
        name: 'Laces',
        material: 'polyester',
        color: 'Daisy White',
      },
      part07: {
        name: 'Eyelets',
        material: 'metal',
        color: 'White',
      },
      part08: {
        name: 'Thread stitching',
        material: 'stitch',
        color: 'White',
      },
      part09: {
        name: 'Lining',
        material: 'leather',
        color: 'Daisy White',
      },
    },
    yolo: {
      part01: {
        name: 'Tongue + toe',
        material: 'cotton',
        color: 'Daisy White',
      },
      part02: {
        name: 'Detail 1',
        material: 'cotton',
        color: 'Daisy White',
      },
      part03: {
        name: 'Detail 2',
        material: 'cotton',
        color: 'Daisy White',
      },
      part04: {
        name: 'Laces',
        material: 'polyester',
        color: 'Daisy White',
      },
      part05: {
        name: 'Eyelets',
        material: 'metal',
        color: 'White',
      },
      part06: {
        name: 'Back strap',
        material: 'leather',
        color: 'Daisy White',
      },
      part07: {
        name: 'Detail 3',
        material: 'leather',
        color: 'Daisy White',
      },
      part08: {
        name: 'Lining',
        material: 'cotton',
        color: 'Daisy White',
      },
      part09: {
        name: 'Detail 4',
        material: 'cotton',
        color: 'Daisy White',
      },
      part10: {
        name: 'Detail 5',
        material: 'cotton',
        color: 'Daisy White',
      },
      part11: {
        name: 'Sole',
        material: 'sole',
        color: 'White',
      },
      part12: {
        name: 'Thread stitching',
        material: 'stitch',
        color: 'White',
      },
    },
  },
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
      const updatedDetails = {
        ...state.details,
        [model]: {
          ...state.details[model],
          [detail.part]: {
            ...state.details[model][detail.part],
            material: material,
            color: color.name,
          },
        },
      };

      state.details = updatedDetails;
    },
    resetDetails: () => {
      return initialState;
    },
  },
});

export const { setSelectedDetail, setSelectedMaterial, setSelectedColor, setSelectedModel, setDetails, resetDetails } =
  selectedShoePartsSlice.actions;

export default selectedShoePartsSlice.reducer;
