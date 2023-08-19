import { createSlice } from '@reduxjs/toolkit';
import { shoesImages } from '@/components/Constructor/shoesData';

const initialState = { ...shoesImages};

const shoesConstructorSlice = createSlice({
	name: 'shoesConstructor',
	initialState,
	reducers: {
		updateParts: (state, action) => {
			const {selectedDetail, selectedColor, selectedModel} = action.payload;
			const validView1Numbers = Object.keys(shoesImages[selectedModel].view1);
			const validView2Numbers = Object.keys(shoesImages[selectedModel].view2);
			const validView3Numbers = Object.keys(shoesImages[selectedModel].view3);
			const validView4Numbers = Object.keys(shoesImages[selectedModel].view4);

			if (validView1Numbers.includes(selectedDetail)) {
				state[selectedModel].view1[selectedDetail] = `/src/assets/images/constructor/parts/${selectedModel}/view1/view1_${selectedColor}`;
			}

			if (validView2Numbers.includes(selectedDetail)) {
				state[selectedModel].view2[selectedDetail] = `/src/assets/images/constructor/parts/${selectedModel}/view2/view2_${selectedColor}`;
			}

			if (validView3Numbers.includes(selectedDetail)) {
				state[selectedModel].view3[selectedDetail] = `/src/assets/images/constructor/parts/${selectedModel}/view3/view3_${selectedColor}`;
			}

			if (validView4Numbers.includes(selectedDetail)) {
				state[selectedModel].view4[selectedDetail] = `/src/assets/images/constructor/parts/${selectedModel}/view4/view4_${selectedColor}`;
			}
		},
		resetDesign: () => initialState
	},
});

export const { updateParts, resetDesign } = shoesConstructorSlice.actions;

export default shoesConstructorSlice.reducer;