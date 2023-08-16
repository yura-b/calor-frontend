import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	view1: {
		part01: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part01_leather_11.png',
		part02: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part02_leather_11.png',
		part03: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part03_laces_polyester_12.png',
		part04: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part04_lower_eyelets_metal_12.png',
		part05: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part05_sole_01.png',
		part06: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part06_stitch_11.png',
		part07: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part07_leather_11.png',
		part08: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part08_leather_11.png',
		part10: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part10_leather_11.png',
		part11: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part11_leather_11.png',
		part12: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part12_leather_11.png',
		part13: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part13_leather_11.png',
		part14: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_part14_eyelets_metal_12.png',
		part15: '/src/assets/images/constructor/parts/dayger/view1/dayger_view1_shade.png',
	},
	view2: {
		part01: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part01_leather_11.png',
		part02: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part02_leather_11.png',
		part03: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part03_laces_polyester_12.png',
		part04: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part04_lower_eyelets_metal_12.png',
		part05: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part05_sole_01.png',
		part06: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part06_stitch_11.png',
		part07: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part07_leather_11.png',
		part08: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part08_leather_11.png',
		part10: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part10_leather_11.png',
		part11: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part11_leather_11.png',
		part12: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part12_leather_11.png',
		part13: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part13_leather_11.png',
		part14: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_part14_eyelets_metal_12.png',
		part15: '/src/assets/images/constructor/parts/dayger/view2/dayger_view2_shade.png',
	},
	view3: {
		part01: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part01_leather_11.png',
		part02: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part02_leather_11.png',
		part03: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part03_laces_polyester_12.png',
		part04: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part04_lower_eyelets_metal_12.png',
		part05: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part05_sole_01.png',
		part07: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part07_leather_11.png',
		part08: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part08_leather_11.png',
		part09: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part09_fur_01.png',
		part10: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part10_leather_11.png',
		part11: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part11_leather_11.png',
		part12: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part12_leather_11.png',
		part13: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part13_leather_11.png',
		part14: '/src/assets/images/constructor/parts/dayger/view3/dayger_view3_part14_eyelets_metal_12.png',
	},
	view4: {
		part01: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part01_leather_11.png',
		part02: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part02_leather_11.png',
		part03: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part03_laces_polyester_12.png',
		part04: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part04_lower_eyelets_metal_12.png',
		part05: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part05_sole_01.png',
		part06: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part06_stitch_11.png',
		part07: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part07_leather_11.png',
		part08: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part08_leather_11.png',
		part10: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part10_leather_11.png',
		part11: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part11_leather_11.png',
		part12: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part12_leather_11.png',
		part13: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part13_leather_11.png',
		part14: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_part14_eyelets_metal_12.png',
		part15: '/src/assets/images/constructor/parts/dayger/view4/dayger_view4_shade.png',
	},
};

const daygerModelSlice = createSlice({
	name: 'daygerModel',
	initialState,
	reducers: {
		updateParts: (state, action) => {
			const {selectedDetail, selectedColor} = action.payload;
			if (selectedDetail !== 'part09') {
				state.view1[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view1/dayger_view1_${selectedColor}`;
				state.view2[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view1/dayger_view1_${selectedColor}`;
			}

			if (selectedDetail !== 'part06') {
				state.view3[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view3/dayger_view3_${selectedColor}`;
				state.view3[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view3/dayger_view3_${selectedColor}`;
			}
			state.view2[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view2/dayger_view2_${selectedColor}`;
			state.view4[selectedDetail] = `/src/assets/images/constructor/parts/dayger/view4/dayger_view4_${selectedColor}`;
		},
		resetDesign: (state, action) => {
			state.view1 = { ...initialState.view1 };
			state.view2 = { ...initialState.view2 };
			state.view3 = { ...initialState.view3 };
			state.view4 = { ...initialState.view4 };
		}
	},
});

export const { updateParts, resetDesign } = daygerModelSlice.actions;

export default daygerModelSlice.reducer;