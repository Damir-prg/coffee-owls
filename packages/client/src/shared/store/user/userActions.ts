import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCookie } from 'shared/utils/cookieUtils';
import { IUserState } from './user.models';
import { logout } from 'shared/api/authApi/authApi';

export const getUserData = createAsyncThunk<IUserState['userData'], void, { rejectValue: string }>(
  'user/fetchUserThunk',
  async (_, { rejectWithValue }) => {
    const url = '/user';
    try {
      return await fetch(url).then(res => res.json());
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
