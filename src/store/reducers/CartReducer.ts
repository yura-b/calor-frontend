import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {appendToBasket} from '@/store/reducers/BasketSlice.ts';
import { addToCartNonRegisterUser } from './BasketForNonRegisterUser';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

const initialState: CartState = {
  items: [],
  open: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    setCartVisible(state, { payload }: PayloadAction<boolean>) {
      state.open = payload
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(appendToBasket, (state) => {
          state.open = true
    })
        .addCase(addToCartNonRegisterUser, (state)=>{
          state.open = true
        })
  }
});

export const { addToCart, removeFromCart, updateQuantity, setCartVisible } = cartSlice.actions;

export default cartSlice.reducer;

