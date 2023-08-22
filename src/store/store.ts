import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@/store/reducers/LanguageReducer.ts';
import statusReducer from '@/store/reducers/StatusReducer.ts';
import cartReducer from '@/store/reducers/CartReducer';
import userReducer from '@/store/reducers/UserReducer.ts';
import registrationReducer from '@/store/reducers/RegistrationReducer.ts';
import dialogReducer from '@/store/reducers/DialogReducer.ts';
import pageManagerReducer from '@/store/admin/PageManagerReducer.ts';
import selectedShoePartsReducer from '@/store/reducers/constructor/SelectedShoePartsReducer';
import shoesConstructorReducer from '@/store/reducers/constructor/ShoesConstructorReducer';

const persistedCartState = localStorage.getItem('cartState');
const cartState = persistedCartState !== null ? JSON.parse(persistedCartState) : {};

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    language: languageReducer,
    status: statusReducer,
    registration: registrationReducer,
    dialog: dialogReducer,
    pageManager: pageManagerReducer,
    selectedShoeParts: selectedShoePartsReducer,
    shoesConstructor: shoesConstructorReducer,
  },
  preloadedState: {
    cart: cartState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('cartState', JSON.stringify(cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
