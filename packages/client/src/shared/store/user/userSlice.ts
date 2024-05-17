import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './user.models';

const initialState: IUserState = {
  userData: null,
  isLoadingUserData: true,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<Record<string, unknown> | null>) {
      state.userData = action.payload;
    },
    setIsLoadingUserData(state, action: PayloadAction<boolean>) {
      state.isLoadingUserData = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserData, setIsLoadingUserData, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
