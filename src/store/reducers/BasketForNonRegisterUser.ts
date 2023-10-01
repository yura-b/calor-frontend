import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem('basket', JSON.stringify(cartData));
};

export const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('basket');
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const basketForNonRegisterUser = createSlice({
  name: 'basketForNonRegisterUser',
  initialState: initialState,
  reducers: {
    addToCartNonRegisterUser: (state, action) => {
      const item = { ...action.payload, photo: action.payload.photos[0] };
      state.items.push(item);
      saveCartToLocalStorage(state.items);
    },
    removeFromCartNonRegisterUser: (state, action) => {
      console.log(action.payload);
      state.items = state.items.filter((item) => item._id !== action.payload);
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
  },
});

export const {
  addToCartNonRegisterUser,
  removeFromCartNonRegisterUser,
  increaseQuantityNonRegisterUser,
  decreaseQuantityNonRegisterUser,
} = basketForNonRegisterUser.actions;
export default basketForNonRegisterUser.reducer;
