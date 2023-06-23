import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@/store/reducers/LanguageReducer.ts';
import statusReducer from '@/store/reducers/StatusReducer.ts';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    status: statusReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
