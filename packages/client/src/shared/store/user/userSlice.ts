import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './user.models';
import { getUserData, logoutAction } from './userActions';

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
    setIsLoggedIn(state, action: PayloadAction<IUserState['isLoggedIn']>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending, state => {
        state.isLoadingUserData = true;
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<IUserState['userData']>) => {
        state.userData = action.payload;
        state.isLoggedIn = true;
        state.isLoadingUserData = false;
      })
      .addCase(getUserData.rejected, state => {
        state.userData = null;
        state.isLoggedIn = false;
        state.isLoadingUserData = false;
      })
      .addCase(logoutAction.fulfilled, state => {
        state.userData = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setUserData, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
