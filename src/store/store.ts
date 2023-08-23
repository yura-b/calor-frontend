import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@/store/reducers/LanguageReducer.ts';
import statusReducer from '@/store/reducers/StatusReducer.ts';
import userReducer from '@/store/reducers/UserReducer.ts';
import registrationReducer from '@/store/reducers/RegistrationReducer.ts';
import dialogReducer from '@/store/reducers/DialogReducer.ts';
import pageManagerReducer from '@/store/admin/PageManagerReducer.ts';
import checkoutReducer from '@/store/reducers/CheckoutReducer.ts';
import selectedShoePartsReducer from '@/store/reducers/constructor/SelectedShoePartsReducer';
import shoesConstructorReducer from '@/store/reducers/constructor/ShoesConstructorReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    status: statusReducer,
    registration: registrationReducer,
    checkout: checkoutReducer,
    dialog: dialogReducer,
    pageManager: pageManagerReducer,
    selectedShoeParts: selectedShoePartsReducer,
    shoesConstructor: shoesConstructorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
