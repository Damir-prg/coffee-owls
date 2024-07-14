import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCookie } from 'shared/utils/cookieUtils';
import { IUserState } from './user.models';
import { getUser, logout } from 'shared/api/authApi/authApi';

export const getUserDataNew = createAsyncThunk<IUserState['userData'], void, { rejectValue: string }>(
  'user/fetchUserThunk',
  async (_, { rejectWithValue }) => {
    const url = 'http://localhost:3001/api/user';
    try {
      return await fetch(url).then(res => {
        console.log(res.json());
        return res.json();
      });
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных пользователя');
    }
  },
);

export const getUserData = createAsyncThunk<IUserState['userData'], void, { rejectValue: string }>(
  'user/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      console.log(response);
      return response as IUserState['userData'];
    } catch (error) {
      console.log(error);
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
