import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDetails } from '@/api/warehouse';

export const fetchProductsDetails = createAsyncThunk('products/fetchProductsDetails', async () => {
  const response = await getDetails();
  return response.data;
});

interface IState {
  status: string
  products: unknown,
  error: null | undefined | string
}

const productsDataSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  } as IState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.products = action.payload.map((item) => ({
          detail: {
            id: item.detail._id,
            name: item.detail.title,
            materials: item.detail.materials.map((material) => ({
              id: material._id,
              name: material.title,
              colors: material.colors.map((color) => ({
                id: color._id,
                name: color.color,
                available: color.available,
              })),
            })),
          },
          products: item.products.map((product) => ({
            id: product._id,
            name: product.title,
          })),
        }));
      })

      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsDataSlice.reducer;
