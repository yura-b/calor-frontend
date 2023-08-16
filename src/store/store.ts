import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@/store/reducers/LanguageReducer.ts';
import statusReducer from '@/store/reducers/StatusReducer.ts';
import userReducer from '@/store/reducers/UserReducer.ts';
import registrationReducer from '@/store/reducers/RegistrationReducer.ts';
import dialogReducer from '@/store/reducers/DialogReducer.ts';
import pageManagerReducer from '@/store/admin/PageManagerReducer.ts';
import ProductsReducer from '@/store/reducers/ProductsReducer.ts';
import ShoesReducer from './reducers/ShoesReducer';
import ActiveShoeParts from '@/store/reducers/ActiveShoePartsReducer';
import DaygerModel from '@/store/reducers/DaygerModelReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    status: statusReducer,
    registration: registrationReducer,
    dialog: dialogReducer,
    pageManager: pageManagerReducer,
    products: ProductsReducer,
    shoes: ShoesReducer,
    activeShoeParts: ActiveShoeParts,
    daygerModel: DaygerModel,
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
