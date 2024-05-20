import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, logout } from 'shared/api/authApi';
import { deleteCookie } from 'shared/utils/cookieUtils';
import { IUserState } from './user.models';

export const getUserData = createAsyncThunk<IUserState['userData'], void, { rejectValue: string }>(
  'user/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response as IUserState['userData'];
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных пользователя');
    }
  },
);

export const logoutAction = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logoutAction',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      deleteCookie('authToken');
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы');
    }
  },
);
