import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayger: [],
  sunrise: [],
  yolo: [],
};

const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    setDaygerDetails(state, action) {
      const details = action.payload.filter((item) => {
        const hasDaygerProduct = item.products.some((product) => product.name === 'Dayger');
        return hasDaygerProduct ? item : null;
      });
      state.dayger = details;
    },
    setSunriseDetails(state, action) {
      const details = action.payload.filter((item) => {
        const hasSunriseProduct = item.products.some((product) => product.name === 'Sunrise');
        return hasSunriseProduct ? item : null;
      });
      state.sunrise = details;
    },
    setYoloDetails(state, action) {
      const details = action.payload.filter((item) => {
        const hasYoloProduct = item.products.some((product) => product.name === 'Yolo');
        return hasYoloProduct ? item : null;
      });
      state.yolo = details;
    },
  },
});

export const { setDaygerDetails, setSunriseDetails, setYoloDetails } = shoesSlice.actions;
export default shoesSlice.reducer;