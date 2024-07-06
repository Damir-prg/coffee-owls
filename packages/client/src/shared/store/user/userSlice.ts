import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './user.models';
import { getUserData, logoutAction } from './userActions';
import { TRootState } from '../store';

const initialState: IUserState = {
  userData: null,
  isLoadingUserData: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUserState['userData']>) {
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending.type, state => {
        state.isLoadingUserData = true;
      })
      .addCase(getUserData.fulfilled.type, (state, action: PayloadAction<IUserState['userData']>) => {
        state.userData = action.payload;
        state.isLoadingUserData = false;
      })
      .addCase(getUserData.rejected.type, state => {
        state.userData = null;
        state.isLoadingUserData = false;
      })
      .addCase(logoutAction.fulfilled.type, state => {
        state.userData = null;
      });
  },
});

export const { setUserData } = userSlice.actions;
export const selectUser = (state: TRootState) => state.user.userData;
export default userSlice.reducer;
