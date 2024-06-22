import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETHEME } from 'shared/enums/theme';

const initialState = {
  theme: ETHEME.Light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ETHEME.Light | ETHEME.Dark>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    loadTheme(state) {
      const savedTheme = localStorage.getItem('theme') as ETHEME.Light | ETHEME.Dark;
      if (savedTheme) {
        state.theme = savedTheme;
      }
    },
  },
});

export const { setTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
