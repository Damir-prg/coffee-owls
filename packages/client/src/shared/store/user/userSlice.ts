import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './user.models';

const initialState: IUserState = {
  userData: null,
  isLoadingUserData: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUserState['userData']>) {
      state.userData = action.payload;
    },
    setIsLoadingUserData(state, action: PayloadAction<IUserState['isLoadingUserData']>) {
      state.isLoadingUserData = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<IUserState['isLoggedIn']>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserData, setIsLoadingUserData, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
