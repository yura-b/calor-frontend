import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getUser } from '@/api/users';

interface IMeasurement {
  _id: string;
  insoleLength: number;
  insoleWidth: number;
  leftFootLength: number;
  leftFootWidth:number;
  rightFootLength:number;
  rightFootWidth:number;
  }
  interface IShoes {
    category:string;
    description:string;
    details:string[];
    insole:string;
    isAvailable:boolean;
    liningMaterial:string;
    photos:string[];
    price:number;
    rating:number;
    season:string;
    sizes?:number[];
    sole:string;
    stripeID:string;
    subcategory:string;
    title:string;
    upperMaterial:string;
    _id:string;
  }
interface IAccessory {
  category:string;
  description:string;
  isAvailable:boolean;
  photos:string[];
  price:number;
  rating:number;
  size?:[];
  stripeID:string;
  subcategory:string;
  title:string;
  _id:string;
  }


export interface BasketProduct {
  _id: string;
  name: string;
  price: number;
  count: number;
  details: [];
  measurement: IMeasurement;
  photo: string;
  shoes?: IShoes;
  accessory?:IAccessory
}

interface CartState {
  items: BasketProduct[];
}

const initialState: CartState = {
  items: [],
};

export const fetchUserProductsInBasket = createAsyncThunk(`user/`, async ({ access_token, userId }) => {
  const response = await getUser(access_token, userId);
  return response.data;
});

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    appendToBasket(state, action: PayloadAction<BasketProduct>) {
   
      const item = {...action.payload, photo: action.payload.photos[0]};
      state.items.push(item)
    },
    removeFromBasket(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.count += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProductsInBasket.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProductsInBasket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.user.basket;
      })

      .addCase(fetchUserProductsInBasket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { appendToBasket, removeFromBasket, increaseQuantity, decreaseQuantity } = basketSlice.actions;

export default basketSlice.reducer;
