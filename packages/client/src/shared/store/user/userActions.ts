import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserData, setIsLoadingUserData, setIsLoggedIn } from './userSlice';
import { getUser, logout } from 'shared/api/authApi';

export const getUserData = createAsyncThunk('user/getUserData', async (_, { dispatch }) => {
  dispatch(setIsLoadingUserData(true));
  try {
    const userData = await getUser();
    dispatch(setUserData(userData as Record<string, unknown>));
    dispatch(setIsLoggedIn(true));
  } catch {
    dispatch(setUserData(null));
    dispatch(setIsLoggedIn(false));
  } finally {
    dispatch(setIsLoadingUserData(false));
  }
});

export const logoutAction = createAsyncThunk('user/logoutAction', async (_, { dispatch }) => {
  try {
    await logout();
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(setIsLoggedIn(false));
  } catch (error) {
    console.error(error);
    throw error;
  }
});
