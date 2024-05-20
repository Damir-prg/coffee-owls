import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
