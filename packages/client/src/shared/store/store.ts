import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

const storeReducer = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: storeReducer,
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
