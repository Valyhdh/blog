import { configureStore } from '@reduxjs/toolkit';

import articleSlice from './articleSlice';

const store = configureStore({
  reducer: {
    article: articleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
