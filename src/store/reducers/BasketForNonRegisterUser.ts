import {  createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem('basket', JSON.stringify(cartData));
};

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('basket');
  return cartData ? JSON.parse(cartData) : [];
};

const clearCartOnLocalStorage = () => {
  localStorage.removeItem('basket');
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const basketForNonRegisterUser = createSlice({
  name: 'basketForNonRegisterUser',
  initialState: initialState,
  reducers: {
    addToCartNonRegisterUser: (state, action) => {
      const item = { ...action.payload, photo: action.payload.photos[0], basketItemId: uuidv4() };
      state.items.push(item);
      saveCartToLocalStorage(state.items);
    },
    removeFromCartNonRegisterUser: (state, action) => {
      state.items = state.items.filter((item) => item.basketItemId !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    increaseQuantityNonRegisterUser(state, action) {
      const { basketItemId } = action.payload;
      const item = state.items.find((i) => i.basketItemId === basketItemId);
      if (item) {
        item.count += 1;
      }
      saveCartToLocalStorage(state.items);
    },
    decreaseQuantityNonRegisterUser(state, action) {
      const { basketItemId } = action.payload;
      const item = state.items.find((i) => i.basketItemId === basketItemId);
      if (item && item.count > 1) {
        item.count -= 1;
      }
      saveCartToLocalStorage(state.items);
    },
    clearBasketNonRegisterUser(state) {
      clearCartOnLocalStorage();
      state.items = [];
    },
  },
});

export const {
  addToCartNonRegisterUser,
  removeFromCartNonRegisterUser,
  increaseQuantityNonRegisterUser,
  decreaseQuantityNonRegisterUser,
  clearBasketNonRegisterUser,
} = basketForNonRegisterUser.actions;
export default basketForNonRegisterUser.reducer;
